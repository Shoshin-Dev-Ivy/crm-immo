<?php

namespace App\Entity;

use App\Repository\LeadRepository;
use App\Enum\LeadStatus;
use ApiPlatform\Metadata\ApiResource;
use Symfony\Component\Validator\Constraints as Assert;
use Doctrine\ORM\Mapping as ORM;
use ApiPlatform\Metadata\Get;
use ApiPlatform\Metadata\GetCollection;
use ApiPlatform\Metadata\Post;


#[ApiResource(
    operations: [
        new Get(
            security: "object.getOwner() == user or is_granted('ROLE_ADMIN')"
        ),
        new GetCollection(
            provider: \App\State\LeadCollectionProvider::class),
        new Post()
    ],
    processor: \App\State\LeadProcessor::class,
    security: "is_granted('ROLE_USER')"
)]

#[ORM\Entity(repositoryClass: LeadRepository::class)]
class Lead
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[Assert\NotBlank]
    #[ORM\Column(length: 150)]
    private ?string $name = null;

    #[Assert\NotBlank]
    #[Assert\Email]
    #[ORM\Column(length: 255)]
    private ?string $email = null;

    #[ORM\Column(enumType: LeadStatus::class)]
    private LeadStatus $status;

    #[ORM\Column(length: 255, nullable: true)]
    private ?string $company = null;

    #[ORM\ManyToOne(inversedBy: 'leads')]
    #[ORM\JoinColumn(nullable: false)]
    private ?User $owner = null;

    public function __construct()
    {
        $this->status = LeadStatus::NEW;
    }

    public function getId(): ?int
    {
        return $this->id;
    }

    public function getName(): ?string
    {
        return $this->name;
    }

    public function setName(string $name): static
    {
        $this->name = $name;
        return $this;
    }

    public function getEmail(): ?string
    {
        return $this->email;
    }

    public function setEmail(string $email): static
    {
        $this->email = $email;
        return $this;
    }

    public function getStatus(): LeadStatus
    {
        return $this->status;
    }

    public function setStatus(LeadStatus $status): static
    {
        $this->status = $status;
        return $this;
    }

    public function getCompany(): ?string
    {
        return $this->company;
    }

    public function setCompany(?string $company): static
    {
        $this->company = $company;

        return $this;
    }

    public function getOwner(): ?User
    {
        return $this->owner;
    }

    public function setOwner(?User $owner): static
    {
        $this->owner = $owner;

        return $this;
    }
}