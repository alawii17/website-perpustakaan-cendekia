<?php

namespace App\Http\Controllers;

use App\Http\Resources\ReturnBookFrontResource;
use App\Http\Resources\ReturnBookFrontSingleResource;
use App\Models\Book;
use App\Models\Loan;
use App\Models\ReturnBook;
use Carbon\Carbon;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Routing\Controllers\HasMiddleware;
use Illuminate\Routing\Controllers\Middleware;
use Inertia\Response;

class ReturnBookFrontController extends Controller implements HasMiddleware
{
    public static function middleware(): array
    {
        return [
            new Middleware('password.confirm', except: ['store']),
        ];
    }

    public function index(): Response
    {
        $return_books = ReturnBook::query()
        ->select(['id', 'return_book_code', 'status', 'loan_id', 'user_id', 'book_id', 'return_date', 'created_at'])
        ->where('user_id', auth()->user()->id)
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field', 'direction']))
        ->with(['book', 'fine', 'loan', 'user', 'returnBookCheck'])
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();
    
        return inertia('Front/ReturnBooks/Index', [
            'page_settings' => [
                'title' => 'Pengembalian',
                'subtitle' => 'Menampilkan semua data pengembalian anda yang tersedia pada platform ini. '
            ],
            'return_books' => ReturnBookFrontResource::collection($return_books)->additional([
                'meta' => [
                    'has_pages' => $return_books->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10
            ],
            'page_data' => [
                'returned' => ReturnBook::query()->member(auth()->user()->id)->returned()->count(),
                'fine' => ReturnBook::query()->member(auth()->user()->id)->fine()->count(),
                'checked' => ReturnBook::query()->member(auth()->user()->id)->checked()->count(),
            ]
        ]);
    }

    public function show(ReturnBook $returnBook): Response
    {
        return inertia('Front/ReturnBooks/Show', [
            'page_settings' => [
                'title' => 'Detail Pengembalian Buku',
                'subtitle' => 'Dapat melihat informasi tentang detail buku yang anda kembalikan',
            ],
            'return_book' => new ReturnBookFrontSingleResource(
                $returnBook->load([
                    'book', 
                    'user', 
                    'loan', 
                    'fine', 
                    'returnBookCheck'
                ])
            ),
        ]);
    }

    public function store(Book $book, Loan $loan): RedirectResponse
    {
        $return_book = $loan->returnBook()->create([
            'return_book_code' => str()->lower(str()->random(10)),
            'book_id' => $book->id,
            'user_id' => auth()->user()->id,
            'return_date' => Carbon::today(),
        ]);

        flashMessage('Buku anda sedang dilakukan pengecekan oleh petugas kami');
        return to_route('front.return-books.show', [$return_book->return_book_code]);
    }
}
