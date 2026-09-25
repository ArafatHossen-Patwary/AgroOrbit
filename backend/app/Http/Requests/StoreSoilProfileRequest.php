<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreSoilProfileRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'soil_type' => ['nullable', 'string', 'max:100'],
            'ph' => ['nullable', 'numeric', 'between:0,14'],
            'organic_matter' => ['nullable', 'numeric', 'min:0', 'max:100'],
            'nitrogen' => ['nullable', 'numeric', 'min:0'],
            'phosphorus' => ['nullable', 'numeric', 'min:0'],
            'potassium' => ['nullable', 'numeric', 'min:0'],
            'drainage' => ['nullable', 'string', 'in:poor,moderate,good,excellent'],
            'irrigation_available' => ['nullable', 'boolean'],
        ];
    }
}
