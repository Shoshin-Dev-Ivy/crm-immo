<?php

namespace App\Service;

use App\Entity\Lead;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;
use App\Event\LeadCreatedEvent;

class LeadApplicationService
{
    public function __construct(
        private Security $security,
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function createLead(Lead $lead): Lead
    {
        $user = $this->security->getUser();

        if ($user) {
            $lead->setOwner($user);
        }

        $this->eventDispatcher->dispatch(
        new LeadCreatedEvent($lead),
        LeadCreatedEvent::class
        );

        return $lead;
    }
}