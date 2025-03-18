<?php

namespace App\Traits;

trait ApiResponse
{
    protected function success($data = [], string $message = null, int $code = 200)
    {
        return response()->json([
            'error' => false,
            'message' => $message,
            'data' => $data
        ], $code);
    }

    protected function error(string $message = null, int $code, $data = null)
    {
        return response()->json([
            'error' => true,
            'message' => $message,
            'data' => $data
        ], $code);
    }
}
