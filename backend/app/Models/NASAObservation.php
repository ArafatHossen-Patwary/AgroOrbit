<?php

namespace App\Models;

use Illuminate\Database\Eloquent\Factories\HasFactory;
use Illuminate\Database\Eloquent\Model;

class NASAObservation extends Model
{
    use HasFactory;

    protected $fillable = [
        'dataset',
        'variable',
        'latitude',
        'longitude',
        'observation_date',
        'value',
        'unit',
        'source',
        'metadata',
    ];

    protected function casts(): array
    {
        return [
            'latitude' => 'float',
            'longitude' => 'float',
            'observation_date' => 'date:Y-m-d',
            'value' => 'float',
            'metadata' => 'array',
        ];
    }
}
