<?php

namespace App\Http\Controllers;

use App\Http\Resources\BookFrontResource;
use App\Http\Resources\CategoryFrontResource;
use App\Models\Book;
use App\Models\Category;
use Illuminate\Http\Request;
use Inertia\Response;

class CategoryFrontController extends Controller
{
    public function index(): Response
    {
        $categories = Category::query()
            ->select(['id', 'name', 'slug', 'cover', 'created_at'])
            ->latest()
            ->paginate(8);

        return inertia('Front/Categories/Index', [
            'page_settings' => [
                'title' => 'Kategori',
                'subtitle' => 'Menampilkan semua kategori yang tersedia pada plathform ini.',
            ],
            'categories' => CategoryFrontResource::collection($categories)->additional([
                'meta' => [
                    'has_pages' => $categories->hasPages(),
                ],
            ]),
        ]);
    }

    public function show(Category $category): Response
    {
        $books = Book::query()
            ->select(['id', 'title', 'slug', 'status', 'cover', 'synopsis', 'category_id'])
            ->where('category_id', $category->id)
            ->paginate(12);
        
        return inertia('Front/Categories/Show', [
            'page_settings' => [
                'title' => $category->name,
                'subtitle' => "Menampilkan semua buku yang tersedia pada kategori {$category->name} pada platform ini",
            ],
            'books' => BookFrontResource::collection($books)->additional([
                'meta' => [
                    'has_pages' => $books->hasPages(),
                ],
            ]),
        ]);
    }
}
