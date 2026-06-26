<?php

// backend/src/State/LeadProcessor.php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use App\Entity\Lead;
use App\Event\LeadCreatedEvent;
use Symfony\Bundle\SecurityBundle\Security;
use Symfony\Contracts\EventDispatcher\EventDispatcherInterface;

final class LeadProcessor implements ProcessorInterface
{
    public function __construct(
        private PersistProcessor $persistProcessor,
        private Security $security,
        private EventDispatcherInterface $eventDispatcher,
    ) {
    }

    public function process(
        mixed $data,
        Operation $operation,
        array $uriVariables = [],
        array $context = [],
    ): mixed {
        if ($data instanceof Lead) {
            $data->setOwner($this->security->getUser());
        }

        $result = $this->persistProcessor->process(
            $data,
            $operation,
            $uriVariables,
            $context
        );

        // Dispatch uniquement sur création (POST)
        if ($data instanceof Lead && $operation instanceof \ApiPlatform\Metadata\Post) {
            $this->eventDispatcher->dispatch(new LeadCreatedEvent($result));
        }

        return $result;
    }
}