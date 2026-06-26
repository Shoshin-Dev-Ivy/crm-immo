<?php

namespace App\Controller;

use App\Service\MetricsRegistry;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;

class MetricsController
{
    #[Route('/metrics', name: 'metrics')]
    public function index(MetricsRegistry $metrics): Response
    {
        return new Response(
            $metrics->render(),
            200,
            ['Content-Type' => 'text/plain']
        );
    }
}