<?php

namespace App\Controller;

use App\Entity\User;
use App\Form\RegistrationFormType;
use App\Security\FormAuthenticator;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\PasswordHasher\Hasher\UserPasswordHasherInterface;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\UserAuthenticatorInterface;
use Symfony\Component\Serializer\SerializerInterface;
use Symfony\Component\Validator\Validator\ValidatorInterface;
use Symfony\Contracts\Translation\TranslatorInterface;

class RegistrationController extends AbstractController
{
    #[Route('/api/register', name: 'app_register', methods: ['POST'])]
    public function register(Request $request, UserPasswordHasherInterface $userPasswordHasher, UserAuthenticatorInterface $userAuthenticator, FormAuthenticator $authenticator, EntityManagerInterface $entityManager, SerializerInterface $serializer, ValidatorInterface $validator): Response
    {
        $user = $serializer->deserialize($request->getContent(), User::class, 'json');
        $errors = [];
        $violations = $validator->validate($user);

        $user->setPassword(
            $userPasswordHasher->hashPassword(
               $user,
               $user->getPassword()
            )
        );


        if (count($violations) > 0) {
           foreach ($violations as $violation) {
              $errors[$violation->getPropertyPath()] = $violation->getMessage();
           }
           return $this->json($errors);
        }

        $entityManager->persist($user);
        $entityManager->flush();

        $userAuthenticator->authenticateUser(
           $user,
           $authenticator,
           $request
        );

        return $this->json([]);
    }
}
