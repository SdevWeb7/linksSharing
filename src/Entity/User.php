<?php

namespace App\Entity;

use App\Repository\UserRepository;
use Doctrine\Common\Collections\ArrayCollection;
use Doctrine\Common\Collections\Collection;
use Doctrine\ORM\Mapping as ORM;
use Symfony\Bridge\Doctrine\Validator\Constraints\UniqueEntity;
use Symfony\Component\Security\Core\User\PasswordAuthenticatedUserInterface;
use Symfony\Component\Security\Core\User\UserInterface;
use Symfony\Component\Serializer\Annotation\Groups;
use Symfony\Component\Validator\Constraints as Assert;

#[ORM\Entity(repositoryClass: UserRepository::class)]
#[ORM\Table(name: '`user`')]
#[UniqueEntity(fields: ['email'], message: 'There is already an account with this email')]
class User implements UserInterface, PasswordAuthenticatedUserInterface
{
    #[ORM\Id]
    #[ORM\GeneratedValue]
    #[ORM\Column]
    private ?int $id = null;

    #[ORM\Column(length: 180, unique: true)]
    #[Assert\NotBlank]
    #[Assert\Email]
    #[Groups(['api:show'])]
    private ?string $email = null;

    #[ORM\Column]
    private array $roles = [];

    /**
     * @var string The hashed password
     */
    #[ORM\Column]
    #[Assert\NotBlank]
    #[Assert\Length(min: 6)]
    private ?string $password = null;

    #[ORM\Column(length: 180, unique: false, nullable: true)]
    #[Groups(['api:show'])]
    private ?string $firstname = null;

    #[ORM\Column(length: 180, unique: false, nullable: true)]
    #[Groups(['api:show'])]
    private ?string $lastname = null;

    #[ORM\Column(length: 180, unique: false, nullable: true)]
    #[Groups(['api:show'])]
    private ?string $picture = null;

    #[ORM\OneToMany(mappedBy: 'user', targetEntity: Link::class)]
    #[Groups(['api:show'])]
    private Collection $links;


    public function __construct () {
       $this->firstname = '';
       $this->lastname = '';
       $this->picture = '';
       $this->links = new ArrayCollection();
    }

    public function getId(): ?int
    {
        return $this->id;
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

    /**
     * A visual identifier that represents this user.
     *
     * @see UserInterface
     */
    public function getUserIdentifier(): string
    {
        return (string) $this->email;
    }

    /**
     * @see UserInterface
     */
    public function getRoles(): array
    {
        $roles = $this->roles;
        // guarantee every user at least has ROLE_USER
        $roles[] = 'ROLE_USER';

        return array_unique($roles);
    }

    public function setRoles(array $roles): static
    {
        $this->roles = $roles;

        return $this;
    }

    /**
     * @see PasswordAuthenticatedUserInterface
     */
    public function getPassword(): string
    {
        return $this->password;
    }

    public function setPassword(string $password): static
    {
        $this->password = $password;

        return $this;
    }

    /**
     * @see UserInterface
     */
    public function eraseCredentials(): void
    {
        // If you store any temporary, sensitive data on the user, clear it here
        // $this->plainPassword = null;
    }

   /**
    * @return string|null
    */
   public function getFirstname () : ?string {
      return $this -> firstname;
   }

   /**
    * @param string|null $firstname
    */
   public function setFirstname (?string $firstname) : void {
      $this -> firstname = $firstname;
   }

   /**
    * @return string|null
    */
   public function getLastname () : ?string {
      return $this -> lastname;
   }

   /**
    * @param string|null $lastname
    */
   public function setLastname (?string $lastname) : void {
      $this -> lastname = $lastname;
   }

   public function getPicture () : ?string {
      return $this -> picture;
   }

   /**
    * @param string|null $picture
    * @return User
    */
   public function setPicture (?string $picture) : User {
      $this -> picture = $picture;
      return $this;
   }

   /**
    * @return Collection<int, Link>
    */
   public function getLinks(): Collection
   {
       return $this->links;
   }

   public function addLink(Link $link): static
   {
       if (!$this->links->contains($link)) {
           $this->links->add($link);
           $link->setUser($this);
       }

       return $this;
   }
   public function addLinks(ArrayCollection $links): static
   {
      $this->links = $links;

      return $this;
   }
   public function removeLink(Link $link): static
   {
       if ($this->links->removeElement($link)) {
           // set the owning side to null (unless already changed)
           if ($link->getUser() === $this) {
               $link->setUser(null);
           }
       }

       return $this;
   }


}
