<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class Crop extends Model
{
    use HasFactory;

    protected $fillable = [
        'name',
        'scientific_name',
        'crop_family',
        'water_requirement',
        'heat_tolerance',
        'drought_tolerance',
        'soil_benefit',
        'nutrient_demand',
        'growing_duration',
        'suitable_soils',
        'seasons',
    ];

    protected function casts(): array
    {
        return [
            'suitable_soils' => 'array',
            'seasons' => 'array',
        ];
    }
}
