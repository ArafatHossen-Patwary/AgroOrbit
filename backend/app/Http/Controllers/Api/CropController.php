<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Resources\CropResource;
use App\Models\Crop;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;

class CropController extends Controller
{
    public function index(): AnonymousResourceCollection
    {
        return CropResource::collection(Crop::query()->orderBy('name')->get());
    }

    public function show(Crop $crop): CropResource
    {
        return new CropResource($crop);
    }
}
