<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;

class PublisherRequest extends FormRequest
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
            'name' => [
                'required',
                'min:3',
                'max:255',
                'string'
            ],
            'address' => [
                'nullable',
                'string',
                'max:255'
            ],
            'email' => [
                'nullable',
                'email',
                'string',
                'max:255'
            ],
            'phone' => [
                'nullable',
                'string',
                'max:15'
            ],
            'logo' => [
                'nullable',
                'mimes:png,jpg,jpeg,webp',
                'max:2048'
            ],
            
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama',
            'address' => 'Alamat',
            'email' => 'Alamat',
            'phone' => 'Nomor Handphone',
            'logo' => 'Logo',
        ];
    }
}