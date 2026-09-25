<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreSoilProfileRequest;
use App\Http\Resources\SoilProfileResource;
use App\Models\Field;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Response;

class SoilProfileController extends Controller
{
    public function show(Field $field): SoilProfileResource|JsonResponse
    {
        $profile = $field->soilProfile;

        return $profile
            ? new SoilProfileResource($profile)
            : response()->json(['data' => null, 'message' => 'No soil profile has been entered for this field.']);
    }

    public function store(StoreSoilProfileRequest $request, Field $field): JsonResponse
    {
        $profile = $field->soilProfile()->updateOrCreate(
            ['field_id' => $field->id],
            $request->validated(),
        );

        return (new SoilProfileResource($profile->fresh()))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    public function update(StoreSoilProfileRequest $request, Field $field): SoilProfileResource
    {
        $profile = $field->soilProfile()->updateOrCreate(
            ['field_id' => $field->id],
            $request->validated(),
        );

        return new SoilProfileResource($profile->fresh());
    }
}
