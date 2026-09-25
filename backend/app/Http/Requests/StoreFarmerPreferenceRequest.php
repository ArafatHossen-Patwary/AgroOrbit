<?php

namespace App\Http\Requests;

use Illuminate\Foundation\Http\FormRequest;

class StoreFarmerPreferenceRequest extends FormRequest
{
    public function authorize(): bool
    {
        return true;
    }

    public function rules(): array
    {
        return [
            'water_conservation' => ['required', 'integer', 'min:0', 'max:100'],
            'soil_improvement' => ['required', 'integer', 'min:0', 'max:100'],
            'yield_stability' => ['required', 'integer', 'min:0', 'max:100'],
            'economic_return' => ['required', 'integer', 'min:0', 'max:100'],
            'climate_resilience' => ['required', 'integer', 'min:0', 'max:100'],
            'crop_diversity' => ['required', 'integer', 'min:0', 'max:100'],
        ];
    }
}
