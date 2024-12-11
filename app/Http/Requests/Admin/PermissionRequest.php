<?php

namespace App\Http\Requests\Admin;

use Illuminate\Foundation\Http\FormRequest;
use Illuminate\Validation\Rule;

class PermissionRequest extends FormRequest
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
                Rule::unique('permissions')->ignore($this->permission),
            ],
            'guard_name' => [
                'nullable',
                'in:web,api'
            ],
        ];
    }

    public function attributes(): array
    {
        return [
            'name' => 'Nama',
            'guard_name' => 'Guard',
        ];
    }
}
