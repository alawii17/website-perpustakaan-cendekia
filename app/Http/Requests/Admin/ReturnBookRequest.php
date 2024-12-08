<?php

namespace App\Http\Requests\Admin;

use App\Enums\ReturnBookCondition;
use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rules\Enum;

class ReturnBookRequest extends FormRequest
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
            'condition' => [
                'required',
                new Enum(ReturnBookCondition::class),
            ]
        ];
    }

    public function attributes(): array
    {
        return [
            'condition' => 'Kondisi',
        ];
    }
}
