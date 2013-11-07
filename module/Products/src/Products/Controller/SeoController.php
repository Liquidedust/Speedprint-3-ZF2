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
Doctrine\ORM\Query\ResultSetMapping,
Products\Entity\Products,
Products\Statements\Products AS ProductStatement,
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
        } else {
            
            $stmt = $this->getEntityManager()
                        ->getConnection()
                        ->prepare( ProductStatement::BySeo() );
            $stmt->bindValue(':seo',$this->params()->fromRoute('seo'));
            $stmt->execute();
            
            $resultset = array();
            
            while ($row = $stmt->fetch()) {
                
                if( !$row['product_variants'] == 0 ){
                    $variants_stmt = $this->getEntityManager()
                                ->getConnection()
                                ->prepare( ProductStatement::VariantsById() );
                    $variants_stmt->bindValue(':id',$row['product_id']);
                    $variants_stmt->execute();
            
                    $variants_resultset = array();
                    
                    while($variants_row = $variants_stmt->fetch()){
                        $variants_resultset[] = $variants_row;
                    }
                    
                    $row['variants'] = $variants_resultset;
                }
                
                $resultset[] = $row;
            }
        
            return new ViewModel( array( 'resultset' => $resultset ) );
        }
    }
}
