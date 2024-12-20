<?php

namespace App\Http\Controllers\Admin;

use App\Enums\BookLanguage;
use App\Enums\BookStatus;
use App\Enums\MessageType;
use App\Http\Controllers\Controller;
use App\Http\Requests\Admin\BookRequest;
use App\Http\Resources\Admin\BookResource;
use App\Models\Book;
use App\Models\Category;
use App\Models\Publisher;
use App\Traits\Hasfile;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Response;
use Throwable;

class BookController extends Controller
{
    use Hasfile;

    public function index(): Response
    {
        $books = Book::query()
        ->select(['id', 'book_code', 'title', 'slug', 'author', 'publication_year', 'isbn', 'language', 'number_of_pages', 'status', 'price', 'category_id', 'publisher_id', 'created_at'])
        ->filter(request()->only(['search']))
        ->sorting(request()->only(['field', 'direction']))
        ->with(['category','stock','publisher'])
        ->latest('created_at')
        ->paginate(request()->load ?? 10)
        ->withQueryString();
        
        return inertia('Admin/Books/Index', [
            'page_settings' => [
                'title' => 'Buku',
                'subtitle' => 'Menampilkan semua data buku yang tersedia pada platform ini',
            ],
            'books' => BookResource::collection($books)->additional([
                'meta' => [
                    'has_pages' => $books->hasPages(),
                ],
            ]),
            'state' => [
                'page' => request()->page ?? 1,
                'search' => request()->search ?? '',
                'load' => 10,
            ],
        ]);
    }

    public function create(): Response
    {
        return inertia('Admin/Books/Create', [
            'page_settings' => [
                'title' => 'Tambah Buku',
                'subtitle' => 'Tambah buku baru disini. Klik simpan setelah selesai.',
                'method' => 'POST',
                'action' => route('admin.books.store'),
            ],
            'page_data' => [
                'publicationYears' => range(2000, now()->year),
                'languages' => BookLanguage::options(),
                'categories' => Category::query()->select(['id', 'name'])->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
                'publishers' => Publisher::query()->select(['id', 'name'])->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            ]
        ]);
    }

    public function store(BookRequest $request): RedirectResponse
    {
        try {
            $book = Book::create([
                'book_code' => $this->bookCode(
                    $request->publication_year,
                    $request->category_id
                ),
                'title' => $title = $request->title,
                'slug' => str()->lower(str()->slug($title). str()->random(4)),
                'author' => $request->author,
                'publication_year' => $request->publication_year,
                'isbn' => $request->isbn,
                'language' => $request->language,
                'synopsis' => $request->synopsis,
                'number_of_pages' => $request->number_of_pages,
                'status' => $request->total > 0 ? BookStatus::AVAILABLE->value : BookStatus::UNAVAILABLE->value,
                'cover' => $this->upload_file($request, 'cover', 'books'),
                'price' => $request->price,
                'category_id' => $request->category_id,
                'publisher_id' => $request->publisher_id,
            ]);

            flashMessage(MessageType::CREATED->message('Buku'));
            return to_route('admin.books.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message(error: $err->getMessage()), 'error');
            return to_route('admin.books.index');
        }
    }

    public function edit(Book $book): Response
    {
        return inertia('Admin/Books/Edit', [
            'page_settings' => [
                'title' => 'Edit Buku',
                'subtitle' => 'Edit buku baru disini. Klik simpan setelah selesai.',
                'method' => 'PUT',
                'action' => route('admin.books.update', $book),
            ],
            'book' =>$book,

            'page_data' => [
                'publicationYears' => range(2000, now()->year),
                'languages' => BookLanguage::options(),
                'categories' => Category::query()->select(['id', 'name'])->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
                'publishers' => Publisher::query()->select(['id', 'name'])->get()->map(fn($item) => [
                    'value' => $item->id,
                    'label' => $item->name,
                ]),
            ]
        ]);
    }

    public function update(Book $book, BookRequest $request): RedirectResponse
    {
        try {
            $book->update([
                'book_code' => $this->bookCode(
                    $request->publication_year,
                    $request->category_id
                ),
                'title' => $title = $request->title,
                'slug' => $title !== $book->title ?  str()->lower(str()->slug($title). str()->random(4)) : $book->slug,
                'author' => $request->author,
                'publication_year' => $request->publication_year,
                'isbn' => $request->isbn,
                'language' => $request->language,
                'synopsis' => $request->synopsis,
                'number_of_pages' => $request->number_of_pages,
                'status' => $request->total > 0 ? BookStatus::AVAILABLE->value : BookStatus::UNAVAILABLE->value,
                'cover' => $this->update_file($request, $book, 'cover', 'books'),
                'price' => $request->price,
                'category_id' => $request->category_id,
                'publisher_id' => $request->publisher_id,
            ]);

            flashMessage(MessageType::UPDATED->message('Buku'));
            return to_route('admin.books.index');
        } catch(Throwable $err) {
            flashMessage(MessageType::ERROR->message(error: $err->getMessage()), 'error');
            return to_route('admin.books.index');
        }
    }

    public function destroy(Book $book): RedirectResponse
    {
        try {
            $this->delete_file($book, 'cover');
            $book->delete();

            flashMessage(MessageType::DELETED->message('Buku'));
            return to_route('admin.books.index');
        } catch (Throwable $err) {
            flashMessage(MessageType::ERROR->message(error: $err->getMessage()), 'error');
            return to_route('admin.books.index');
        }
    }

    private function bookCode(int $publication_year, int $category_id): string
    {
        $category = Category::find($category_id);
        $book_code_prefix = 'CA'. $publication_year. '.' . str()->slug($category->name). '.';

        $last_book = Book::query()
            ->where('book_code', 'like', $book_code_prefix . '%')
            ->orderByRaw('CAST(SUBSTRING(book_code, -4) AS UNSIGNED) DESC')
            ->first();
        
        $order = 1;

        if ($last_book) {
            $last_order = (int) substr($last_book->book_code, -4);
            $order = $last_order + 1;
        }

        $ordering = str_pad($order, 4, '0', STR_PAD_LEFT);
        return $book_code_prefix . $ordering;
    }
}