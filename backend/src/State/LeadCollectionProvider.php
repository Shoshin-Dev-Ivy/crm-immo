<?php

namespace App\State;

use ApiPlatform\Metadata\Operation;
use ApiPlatform\State\ProviderInterface;
use App\Entity\User;
use App\Repository\LeadRepository;
use Symfony\Bundle\SecurityBundle\Security;

class LeadCollectionProvider implements ProviderInterface
{
    public function __construct(
        private LeadRepository $leadRepository,
        private Security $security,
    ) {
    }

    public function provide(Operation $operation, array $uriVariables = [], array $context = []): array
    {
        $user = $this->security->getUser();

        if (!$user instanceof User) {
            return [];
        }

        if (in_array('ROLE_ADMIN', $user->getRoles(), true)) {
            return $this->leadRepository->findAll();
        }

        return $this->leadRepository->findByOwner($user);
    }
}
