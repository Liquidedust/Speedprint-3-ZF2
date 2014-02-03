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
Zend\View\Model\JsonModel,
Doctrine\ORM\EntityManager,
Doctrine\ORM\Query\ResultSetMapping,
Products\Entity\Product,
Products\Statements\Products AS ProductStatement,
Exception;

class ProductController extends AbstractActionController {
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
        $this->product = new \Products\Entity\Products();
        $objectManager->persist($this->product);
        // $objectManager->flush();
        
        $id = $this->params()->fromRoute('id');
        $product = $objectManager->find('\Products\Entity\Products',$id);
        
        if ($product === null) {
            $this->getResponse()->setStatusCode(404);
            return;
        }
        
        // return new ViewModel();
    }
    
    public function priceAction() {
        
        $em = $this->getEntityManager();
        $repository = $em->getRepository('\Products\Entity\Products');
        $product = $repository->findOneBy(array('id_products' => $this->params()->fromRoute('id')));
        
        $request_uri = $this->getRequest()->getUri()->getPath();
        
        if ($product === null) {
            $this->getResponse()->setStatusCode(404);

            $jsonModel = new JsonModel(array(
                'success' => false,
            ));
        } else {
            
        }
        
        return $jsonModel;
    }
}
