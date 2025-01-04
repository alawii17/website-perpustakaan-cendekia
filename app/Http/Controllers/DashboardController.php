<?php

namespace App\Http\Controllers;

use App\Http\Resources\Admin\TransactionLoanResource;
use App\Http\Resources\Admin\TransactionReturnBookResource;
use App\Models\Book;
use App\Models\Fine;
use App\Models\Loan;
use App\Models\ReturnBook;
use App\Models\User;
use Carbon\Carbon;
use Illuminate\Http\Request;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(): Response
    {
        $loans = Loan::query()
            ->select(['id', 'loan_code', 'book_id', 'user_id', 'created_at'])
            ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function($query){
                return $query;
            }, function($query){
                return $query->where('user_id', auth()->user()->id);
            })
            ->latest('created_at')
            ->limit(5)
            ->with(['user', 'book'])
            ->get();

            $return_books = ReturnBook::query()
                ->select(['id', 'return_book_code', 'book_id', 'user_id', 'created_at'])
                ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function($query){
                    return $query;
                }, function($query){
                    return $query->where('user_id', auth()->user()->id);
                })
                ->latest('created_at')
                ->limit(5)
                ->with('user', 'book')
                ->get();


        return inertia('Dashboard', [
            'page_settings' => [
                'title' => 'Dashboard',
                'subtitle' => 'Menampilkan semua statistik pada platform ini.',
            ],
            'page_data' => [
                'transactionChart' => $this->chart(),
                'loans' => TransactionLoanResource::collection($loans),
                'return_books' => TransactionReturnBookResource::collection($return_books),
                'total_books' => auth()->user()->hasAnyRole(['admin', 'operator']) ? Book::count() : 0,
                'total_users' => auth()->user()->hasAnyRole(['admin', 'operator']) ? User::count() : 0,
                'total_loans' => Loan::query()
                    ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function($query){
                        return $query;
                    }, function($query){
                        return $query->where('user_id', auth()->user()->id);
                    })->count(),
                'total_returns' => ReturnBook::query()
                    ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function($query){
                        return $query;
                    }, function($query){
                        return $query->where('user_id', auth()->user()->id);
                    })->count(),
                'total_fines' => auth()->user()->hasRole('member') ? Fine::query()
                    ->where('user_id', auth()->user()->id)
                    ->sum('total_fee') : 0,
                ],
        ]);
    }

    public function chart(): array
    {
        $end_date = Carbon::now();

        $start_date = $end_date->copy()->subMonth()->startOfMonth();

        $loans = Loan::query()
            ->selectRaw('DATE(loan_date) as date, COUNT(*) as loan')
            ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function($query){
                return $query;
            }, function($query) {
                return $query->where('user_id', auth()->user()->id);
            })
            ->whereBetween('loan_date', [$start_date, $end_date])
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('loan', 'date');

        $return_books = ReturnBook::query()
            ->selectRaw('DATE(return_date) as date, COUNT(*) as returns')
            ->when(auth()->user()->hasAnyRole(['admin', 'operator']), function($query){
                return $query;
            }, function($query) {
                return $query->where('user_id', auth()->user()->id);
            })
            ->whereNotNull('return_date')
            ->whereBetween('return_date', [$start_date, $end_date])
            ->groupBy('date')
            ->orderBy('date')
            ->pluck('returns', 'date');

        $charts = [];
        $period = Carbon::parse($start_date)->daysUntil($end_date);

        foreach($period as $date){
            $date_string = $date->toDateString();
            $charts[] = [
                'date' => $date_string,
                'loan' => $loans->get($date_string, 0),
                'return_book' => $return_books->get($date_string, 0)
            ];
        }
        // dd($charts);

        return $charts;
    }
}