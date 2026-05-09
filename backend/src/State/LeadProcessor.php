<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProcessorInterface;
use ApiPlatform\Doctrine\Common\State\PersistProcessor;
use App\Entity\Lead;
use Symfony\Bundle\SecurityBundle\Security;

final class LeadProcessor implements ProcessorInterface
{
    public function __construct(
        private PersistProcessor $persistProcessor,
        private Security $security,
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

        return $this->persistProcessor->process(
            $data,
            $operation,
            $uriVariables,
            $context
        );
    }
}