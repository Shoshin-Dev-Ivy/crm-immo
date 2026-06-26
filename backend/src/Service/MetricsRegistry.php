<?php

namespace App\Service;

use Prometheus\CollectorRegistry;
use Prometheus\RenderTextFormat;
use Prometheus\Storage\APC;

class MetricsRegistry
{
    private CollectorRegistry $registry;

    public function __construct()
    {
        $this->registry = new CollectorRegistry(new APC());
    }

    public function getRegistry(): CollectorRegistry
    {
        return $this->registry;
    }

    public function render(): string
    {
        return (new RenderTextFormat())
            ->render($this->registry->getMetricFamilySamples());
    }
}