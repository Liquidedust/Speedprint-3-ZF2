<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Products\Controller;

use Zend\Mvc\Controller\AbstractActionController,
Zend\View\Model\ViewModel,
Doctrine\ORM\EntityManager,
Products\Entity\Product;

class IndexController extends AbstractActionController {
    /**             
    * @var Doctrine\ORM\EntityManager
    */                
    protected $em;
    
    public function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
        }
        return $this->em;
    }

    public function indexAction() {
        $objectManager = $this->getEntityManager();
        
        // $product = new \Products\Entity\Product();
        // $product->setProductName('Marco Pivetta');

        // $objectManager->persist($product);
        // $objectManager->flush();

        // die(var_dump($product->getId())); // yes, I'm lazy
        return new ViewModel();
        
    }
}
