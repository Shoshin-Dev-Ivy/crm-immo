<?php

namespace App\EventSubscriber;

use App\Event\LeadCreatedEvent;
use App\Service\MetricsRegistry;
use Prometheus\CollectorRegistry;
use Prometheus\Counter;
use Symfony\Component\EventDispatcher\EventSubscriberInterface;
use Symfony\Component\HttpKernel\Event\ResponseEvent;
use Symfony\Component\HttpKernel\KernelEvents;

class MetricsSubscriber implements EventSubscriberInterface
{
    private CollectorRegistry $registry;
    private Counter $leadCounter;

    public function __construct(MetricsRegistry $metricsRegistry)
    {
        $this->registry = $metricsRegistry->getRegistry();

        $this->leadCounter = $this->registry->getOrRegisterCounter(
            'crm',
            'leads_total',
            'Nombre total de leads créés'
        );
    }

    public static function getSubscribedEvents(): array
    {
        return [
            KernelEvents::RESPONSE => 'onKernelResponse',
            LeadCreatedEvent::class => 'onLeadCreated',
        ];
    }

    public function onKernelResponse(ResponseEvent $event): void
    {
        $request = $event->getRequest();
        $response = $event->getResponse();

        // 🔴 exclusion endpoint metrics (évite auto-scrape Prometheus)
        if ($request->getPathInfo() === '/metrics') {
            return;
        }

        // =========================
        // 📊 API GLOBAL METRICS
        // =========================

        $counter = $this->registry->getOrRegisterCounter(
            'crm',
            'api_requests_total',
            'Nombre total de requêtes API',
            ['method', 'route', 'status']
        );

        $counter->inc([
            $request->getMethod(),
            $request->getPathInfo(),
            (string) $response->getStatusCode()
        ]);

        $histogram = $this->registry->getOrRegisterHistogram(
            'crm',
            'api_request_duration_seconds',
            'Durée des requêtes API',
            ['route']
        );

        $duration = microtime(true) - $_SERVER['REQUEST_TIME_FLOAT'];

        $histogram->observe(
            $duration,
            [$request->getPathInfo()]
        );
    }

    public function onLeadCreated(LeadCreatedEvent $event): void
    {
        // Utilise $this->leadCounter instancié dans le constructeur
        $this->leadCounter->inc();
    }
}