<?php

namespace App\Security\Voter;

use App\Entity\Lead;
use App\Entity\User;
use Symfony\Component\Security\Core\Authentication\Token\TokenInterface;
use Symfony\Component\Security\Core\Authorization\Voter\Voter;

final class LeadVoter extends Voter
{
    public const VIEW = 'LEAD_VIEW';
    public const EDIT = 'LEAD_EDIT';
    public const DELETE = 'LEAD_DELETE';

    protected function supports(string $attribute, mixed $subject): bool
    {
        return in_array($attribute, [
                self::VIEW,
                self::EDIT,
                self::DELETE,
            ], true)
            && $subject instanceof Lead;
    }

    protected function voteOnAttribute(string $attribute, mixed $subject, TokenInterface $token): bool
    {
        $user = $token->getUser();

        if (!$user instanceof User) {
            return false;
        }

        /** @var Lead $lead */
        $lead = $subject;

        return match ($attribute) {
            self::VIEW => $this->canView($lead, $user),
            self::EDIT => $this->canEdit($lead, $user),
            self::DELETE => $this->canDelete($lead, $user),
            default => false,
        };
    }

    private function isAdmin(User $user): bool
    {
        return in_array('ROLE_ADMIN', $user->getRoles(), true);
    }

    private function canView(Lead $lead, User $user): bool
    {
        return true; // temporaire
    }

    private function canEdit(Lead $lead, User $user): bool
    {
        return $this->isOwner($lead, $user);
    }

    private function canDelete(Lead $lead, User $user): bool
    {
        return $this->isAdmin($user)
        || $this->isOwner($lead, $user);
    }

    private function isOwner(Lead $lead, User $user): bool
    {
        return $lead->getOwner() === $user;
    }
}
