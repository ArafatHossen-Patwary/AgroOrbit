<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFarmerPreferenceRequest;
use App\Http\Resources\FarmerPreferenceResource;
use App\Models\Field;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class FarmerPreferenceController extends Controller
{
    public function show(Field $field): FarmerPreferenceResource|JsonResponse
    {
        $preferences = $field->farmerPreference;

        if (! $preferences) {
            return response()->json([
                'data' => null,
                'message' => 'No farmer priorities have been saved for this field yet.',
            ]);
        }

        return new FarmerPreferenceResource($preferences);
    }

    public function store(StoreFarmerPreferenceRequest $request, Field $field): JsonResponse
    {
        $preferences = $field->farmerPreference()->updateOrCreate(
            ['field_id' => $field->id],
            $request->validated(),
        );

        return (new FarmerPreferenceResource($preferences->fresh()))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }
}
