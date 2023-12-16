<?php

namespace App\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use Symfony\Component\Security\Http\Authentication\AuthenticationUtils;

class LoginController extends AbstractController
{
    #[Route(path: '/check_login', name: 'app_login')]
    public function login(): JsonResponse
    {
         if ($this->getUser()) {
             return $this->redirectToRoute('app_home');
         }

        return $this->json([]);
    }

   #[Route(path: '/api/login', name: 'app_api_login', methods: ['POST'])]
   public function apilogin(): JsonResponse
   {
      return $this->json([]);
   }

    #[Route(path: '/logout', name: 'app_logout')]
    public function logout(): void
    {
    }

   #[Route(path: '/me', name: 'app_me')]
   public function me(): JsonResponse
   {
      if (!$this->getUser()) {
         return $this->json([]);
      }
      return $this->json($this->getUser(), 200, [], ['groups' => 'api:show']);
   }
}
