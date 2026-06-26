<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\Routing\Annotation\Route;

class HealthController
{
    #[Route('/health', name: 'health')]
    public function index(): JsonResponse
    {
        return new JsonResponse([
            'status' => 'ok'
        ]);
    }
}