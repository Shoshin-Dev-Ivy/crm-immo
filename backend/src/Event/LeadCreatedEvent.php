<?php

namespace App\Event;

use App\Entity\Lead;

final class LeadCreatedEvent
{
    public function __construct(
        public readonly Lead $lead
    ) {
    }
}