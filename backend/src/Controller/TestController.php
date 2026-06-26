<?php

namespace App\Controller;

use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Attribute\Route;

class TestController
{
    #[Route('/api/test-error')]
    public function testError(): Response
    {
        throw new \Exception("Forced 500 for monitoring test");
    }
}