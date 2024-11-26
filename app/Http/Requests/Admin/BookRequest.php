<?php

namespace App\Http\Requests\Admin;

use App\Enums\BookLanguage;
use Illuminate\Validation\Rules\Enum;
use Illuminate\Foundation\Http\FormRequest;

class BookRequest extends FormRequest
{
    /**
     * Determine if the user is authorized to make this request.
     */
    public function authorize(): bool
    {
        return true;
    }

    /**
     * Get the validation rules that apply to the request.
     *
     * @return array<string, \Illuminate\Contracts\Validation\ValidationRule|array<mixed>|string>
     */
    public function rules(): array
    {
        return [
            'title' => [
                'required',
                'min:3',
                'max:255',
                'string',
            ],
            'author' => [
                'required',
                'min:3',
                'max:255',
                'string'
            ],
            'publication_year' => [
                'required',
                'numeric',
                'integer'
            ],
            'isbn' => [
                'required',
                'string',
                'max:255'
            ],
            'language' => [
                'required',
                new Enum(BookLanguage::class),
            ],
            'synopsis' => [
                'nullable',
            ],
            'number_of_pages' => [
                'required',
                'integer',
                'numeric',
            ],
            'cover' => [
                'nullable',
                'mimes:png,jpg,jpeg,webp',
                'max:2048',
            ],
            'price' => [
                'required',
                'numeric',
                'min:0'
            ],
            'category_id' => [
                'required',
                'exists:categories,id'
            ],
            'publisher_id' => [
                'required',
                'exists:publishers,id'
            ]
        ];
    }

    public function attributes(): array
    {
        return [
            'title' => 'Judul',
            'author' => 'Penulis',
            'publication_year' => 'Tahun Terbit',
            'isbn' => 'ISBN',
            'language' => 'Bahasa',
            'synopsis' => 'Sinopsis',
            'number_of_pages' => 'Jumlah Halaman',
            'cover' => 'Cover',
            'category_id' => 'Kategori',
            'publisher_id' => 'Penerbit',
        ];
    }
}