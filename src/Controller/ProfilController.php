<?php

namespace App\Controller;

use App\Repository\UserRepository;
use Doctrine\ORM\EntityManagerInterface;
use Symfony\Bundle\FrameworkBundle\Controller\AbstractController;
use Symfony\Component\HttpFoundation\JsonResponse;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\Routing\Annotation\Route;
use App\Entity\Link;

class ProfilController extends AbstractController
{
    #[Route('/api/update-profil', name: 'app_profil', methods: ['POST'])]
    public function index(Request $request, EntityManagerInterface $manager): Response
    {
        $user = $this->getUser();
        if (!$user) {
           return $this->json([]);
        }

        if (strlen($user->getPicture()) > 0 && file_exists($this -> getParameter('kernel.project_dir') . '/public' . $user->getPicture())) {
           unlink($this -> getParameter('kernel.project_dir') . '/public' . $user->getPicture());
        }
        $firstname = $request->request->get('firstname');
        $lastname = $request->request->get('lastname');
        $image = $request->files->get('image');
        $imageUrl = '';

       if ($image) {
          $uploadDirectory = $this -> getParameter('kernel.project_dir') . '/public/uploads';
          $newFilename = md5(uniqid()) . '.' . $image -> guessExtension();
          $image -> move($uploadDirectory, $newFilename);
          $imageUrl = '/uploads' . DIRECTORY_SEPARATOR . $newFilename;
          $user->setPicture($imageUrl);
       } else {
          $user->setPicture('');
       }

        $user->setFirstname($firstname);
        $user->setLastname($lastname);
        $manager->flush();

        return $this->json(['success' => 'Your changes have been successfully saved!', 'imageUrl' => $imageUrl]);
    }

   #[Route('/api/update-links', name: 'app_links', methods: ['POST'])]
    public function links(Request $request, EntityManagerInterface $manager): JsonResponse
    {
       $user = $this->getUser();
       if (!$user) {
          return $this->json([]);
       }

       $datas = json_decode($request->getContent());
       foreach ($user->getLinks() as $link) {
          $manager->remove($link);
       }

       foreach ($datas as $data) {
          $link = new Link();
          $link->setPlatform($data[0]);
          $link->setLien($data[1]);
          $user->addLink($link);
          $manager->persist($link);
       }

       $manager->persist($user);
       $manager->flush();

       return $this->json($datas);
    }


   #[Route('/api/show/{email}', name: 'api_show', priority: 100)]
   public function api_show(string $email, UserRepository $repository): Response
   {
      $user = $repository->findOneBy(['email' => $email]);

      return $this->json($user, 200, [], ['groups' => 'api:show']);
   }

   #[Route('/show/{email}', name: 'app_show', priority: 100)]
   public function show(string $email): Response
   {
      return $this->render('home/show.html.twig', [
         'email' => $email
      ]);
   }

}
