<?php

use App\Http\Controllers\Api\FieldController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\NASADataController;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);

Route::apiResource('fields', FieldController::class);

Route::get('/nasa/observations', [NASADataController::class, 'index']);
