<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\StoreFieldRequest;
use App\Http\Requests\UpdateFieldRequest;
use App\Http\Resources\FieldResource;
use App\Models\Field;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Resources\Json\AnonymousResourceCollection;
use Illuminate\Http\Response;

class FieldController extends Controller
{
    /**
     * GET /api/fields
     */
    public function index(): AnonymousResourceCollection
    {
        $fields = Field::query()
            ->latest()
            ->get();

        return FieldResource::collection($fields);
    }

    /**
     * POST /api/fields
     */
    public function store(StoreFieldRequest $request): JsonResponse
    {
        $field = Field::query()->create($request->validated());

        return (new FieldResource($field))
            ->response()
            ->setStatusCode(Response::HTTP_CREATED);
    }

    /**
     * GET /api/fields/{id}
     */
    public function show(Field $field): FieldResource
    {
        return new FieldResource($field);
    }

    /**
     * PUT /api/fields/{id}
     */
    public function update(UpdateFieldRequest $request, Field $field): FieldResource
    {
        $field->update($request->validated());

        return new FieldResource($field->fresh());
    }

    /**
     * DELETE /api/fields/{id}
     */
    public function destroy(Field $field): JsonResponse
    {
        $field->delete();

        return response()->json([
            'message' => 'Field deleted successfully.',
        ], Response::HTTP_OK);
    }
}
