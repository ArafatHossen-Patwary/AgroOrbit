<?php

namespace App\Http\Controllers\Api;

use App\Http\Controllers\Controller;
use App\Http\Requests\AnalyzeRotationRequest;
use App\Models\Field;
use App\Services\RotationAnalysisService;
use Illuminate\Http\JsonResponse;

class RotationAnalysisController extends Controller
{
    public function __construct(private readonly RotationAnalysisService $service)
    {
    }

    /** POST /api/fields/{field}/rotation-analysis */
    public function store(AnalyzeRotationRequest $request, Field $field): JsonResponse
    {
        return response()->json($this->service->analyze(
            $field,
            $request->validated('rotation'),
            $request->validated('start_date'),
            $request->validated('end_date'),
        ));
    }
}
