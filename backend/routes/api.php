<?php

use App\Http\Controllers\Api\CropController;
use App\Http\Controllers\Api\FieldController;
use App\Http\Controllers\Api\HealthController;
use App\Http\Controllers\Api\NASADataController;
use App\Http\Controllers\Api\SoilProfileController;
use Illuminate\Support\Facades\Route;

Route::get('/health', HealthController::class);
Route::apiResource('fields', FieldController::class);
Route::get('/nasa/observations', [NASADataController::class, 'index']);
Route::get('/fields/{field}/soil-profile', [SoilProfileController::class, 'show']);
Route::post('/fields/{field}/soil-profile', [SoilProfileController::class, 'store']);
Route::put('/fields/{field}/soil-profile', [SoilProfileController::class, 'update']);
Route::apiResource('crops', CropController::class)->only(['index', 'show']);
