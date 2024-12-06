<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class LoanRequest extends FormRequest
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
            'user' => [
                'required',
                'exists:users,name'
            ],
            'book' => [
                'required',
                'exists:books,title'
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'user' => 'Pengguna',
            'book' => 'Buku',
        ];
    }
}
