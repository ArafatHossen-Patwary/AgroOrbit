<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFieldRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    /**
     * @return array<string, mixed>
     */
    public function rules(): array
    {
        return [
            'name' => ['required', 'string', 'max:255'],
            'latitude' => ['required', 'numeric', 'between:-90,90'],
            'longitude' => ['required', 'numeric', 'between:-180,180'],
            'boundary' => ['nullable', 'array', 'min:3'],
            'boundary.*.lat' => ['required_with:boundary', 'numeric', 'between:-90,90'],
            'boundary.*.lng' => ['required_with:boundary', 'numeric', 'between:-180,180'],
            'area' => ['nullable', 'numeric', 'min:0'],
            'current_crop' => ['nullable', 'string', 'max:100'],
        ];
    }

    /**
     * @return array<string, string>
     */
    public function messages(): array
    {
        return [
            'boundary.min' => 'A field boundary must contain at least 3 points.',
            'boundary.*.lat.required_with' => 'Each boundary point must include lat.',
            'boundary.*.lng.required_with' => 'Each boundary point must include lng.',
        ];
    }
}
