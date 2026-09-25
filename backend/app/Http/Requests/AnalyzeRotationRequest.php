<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class AnalyzeRotationRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'rotation' => ['required', 'array', 'min:1'],
            'rotation.*.year' => ['required', 'integer', 'between:1900,2200'],
            'rotation.*.crop_id' => ['required', 'integer', 'exists:crops,id'],
            'start_date' => ['nullable', 'date_format:Y-m-d', 'before_or_equal:end_date'],
            'end_date' => ['nullable', 'date_format:Y-m-d', 'after_or_equal:start_date'],
        ];
    }
}
