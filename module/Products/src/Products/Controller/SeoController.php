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
Products\Entity\Product,
Exception;

class SeoController extends AbstractActionController {
    
    private $product;
    
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
        $repository = $objectManager->getRepository('\Products\Entity\Products');
        $product = $repository->findOneBy(array('seo_products' => $this->params()->fromRoute('seo')));
        
        if ($product === null) {
            $this->getResponse()->setStatusCode(404);
            return;
        }
        
        // return new ViewModel();
    }
}
