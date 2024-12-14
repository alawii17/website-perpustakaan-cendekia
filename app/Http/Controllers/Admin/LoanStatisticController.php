<?php

namespace App\Http\Controllers\Admin;

use App\Http\Controllers\Controller;
use App\Http\Resources\Admin\LoanStatisticResource;
use App\Models\Book;
use App\Models\Loan;
use Illuminate\Http\Request;
use Inertia\Response;

class LoanStatisticController extends Controller
{
    public function index(): Response
    {
        return inertia('Admin/LoanStatistics/Index', [
            'page_settings' => [
                'title' => 'Statistik Peminjaman',
                'subtitle' => 'Menampilkan statistik peminjaman yang tersedia pada platform ini.'
            ],
            'page_data' => [
                'least_loan_books' => LoanStatisticResource::collection(Book::leastLoanBooks(5)),
                'most_loan_books' => LoanStatisticResource::collection(Book::mostLoanBooks(5)),
                 'total_loan' => Loan::totalLoanBooks(),
            ],
        ]);
    }
}
