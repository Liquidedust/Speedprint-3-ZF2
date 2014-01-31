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
Products\Entity\Products,
Products\Statements\Products AS ProductStatement,
Exception;

class SeoController extends AbstractActionController {
    
    private $product;
    
    protected $headLink = Array(
        '/plugins/fancybox/css/jquery.fancybox.css',
        '/plugins/fancybox/css/jquery.fancybox-buttons.css',
        '/plugins/fancybox/css/jquery.fancybox-thumbs.css',
        '/plugins/ldscarousel/css/jquery.ldscarousel.css',
        '/css/products.css'
    );
    
    protected $headScript = Array(
        '/plugins/validate/js/jquery.validate.js',
        '/plugins/autogrow/js/jquery.input.autogrow.js',
        '/plugins/fancybox/js/jquery.fancybox-thumbs.js',
        '/plugins/fancybox/js/jquery.fancybox.js',
        '/plugins/watermark/js/watermark.jquery.js'
    );
    
    protected $inlineScript = Array(
        '/plugins/ldscarousel/js/jquery.ldscarousel.js',
        '/js/products.js'
    );
    
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
        $em = $this->getEntityManager();
        $repository = $em->getRepository('\Products\Entity\Products');
        $product = $repository->findOneBy(array('seo_products' => $this->params()->fromRoute('seo')));
        
        $request_uri = $this->getRequest()->getUri()->getPath();
        
        if ($product === null) {
            $this->getResponse()->setStatusCode(404);
            return;
        } else {
            $stmt = $em ->getConnection()
                        ->prepare( ProductStatement::BySeo() );
            $stmt->bindValue(':seo',$this->params()->fromRoute('seo'));
            $stmt->execute();
            
            $resultset = array();
            
            while ($row = $stmt->fetch()) {
                
                if( !$row['product_variants'] == 0 ){
                    $variants_stmt = $em->getConnection()
                                        ->prepare( ProductStatement::VariantsById() );
                    $variants_stmt->bindValue(':id',$row['product_id']);
                    $variants_stmt->execute();
            
                    $variants_resultset = array();
                    
                    while($variants_row = $variants_stmt->fetch()){
                        $variants_resultset[] = $variants_row;
                    }
                    
                    $row['variants'] = $variants_resultset;
                }
                
                // Prices and rebate fetching here
                $prices_stmt = $em  ->getConnection()
                                    ->prepare( ProductStatement::PricesById() );
                $prices_stmt->bindValue(':id',$row['product_id']);
                $prices_stmt->execute();
            
                $prices_resultset = array();
                    
                while($prices_row = $prices_stmt->fetch()){
                    $prices_resultset[] = $prices_row;
                }

                $row['prices'] = $prices_resultset;
                // End of prices and rebate fetching
                
                // Media fetching here
                $media_stmt = $em  ->getConnection()
                                    ->prepare( ProductStatement::MediaById() );
                $media_stmt->bindValue(':id',$row['product_id']);
                $media_stmt->execute();
            
                $media_resultset = array();
                    
                while($media_row = $media_stmt->fetch()){
                    $media_resultset[] = $media_row;
                }

                $row['media'] = $media_resultset;
                // End of media fetching
                
                $resultset[] = $row;
            }
        
            return new ViewModel( array(
                'resultset' => $resultset,
                'inlineScript' => $this->inlineScript,
                'headScript' => $this->headScript,
                'headLink' => $this->headLink
            ) );
        }
    }
    
    public function optionsAction() {
        // @TODO Remember to fix this so we get a proper viewmodel return
        
        $variant = ( is_null( $this->params()->fromRoute('variant') ) ? 0 : $this->params()->fromRoute('variant')  );
        
        $result = new JsonModel(array(
	    'v_id' => $variant,
            'success' => true,
        ));
 
        return $result;
    }
    
    public function ajaxAction() {
        $em = $this->getEntityManager();
        $repository = $em->getRepository('\Products\Entity\Products');
        $product = $repository->findOneBy(array('seo_products' => $this->params()->fromRoute('seo')));
        
        $request_uri = $this->getRequest()->getUri()->getPath();
        
        if ($product === null) {
            $this->getResponse()->setStatusCode(404);

            $jsonModel = new JsonModel(array(
                'success' => false,
            ));
        } else {
            
            $stmt = $em ->getConnection()
                        ->prepare( ProductStatement::BySeo() );
            $stmt->bindValue(':seo',$this->params()->fromRoute('seo'));
            $stmt->execute();
            
            $resultset = array();
            
            while ($row = $stmt->fetch()) {
                
                if( !$row['product_variants'] == 0 ){
                    $variants_stmt = $em->getConnection()
                                        ->prepare( ProductStatement::VariantsById() );
                    $variants_stmt->bindValue(':id',$row['product_id']);
                    $variants_stmt->execute();
            
                    $variants_resultset = array();
                    
                    while($variants_row = $variants_stmt->fetch()){
                        $variants_resultset[] = $variants_row;
                    }
                    
                    $row['variants'] = $variants_resultset;
                }
                
                // @TODO Add the prices and rebate fetching here below
                $prices_stmt = $em  ->getConnection()
                                    ->prepare( ProductStatement::PricesById() );
                $prices_stmt->bindValue(':id',$row['product_id']);
                $prices_stmt->execute();
            
                $prices_resultset = array();
                    
                while($prices_row = $prices_stmt->fetch()){
                    $prices_resultset[] = $prices_row;
                }

                $row['prices'] = $prices_resultset;
                // End of prices and rebate fetching
                
                // Media fetching here
                $media_stmt = $em  ->getConnection()
                                    ->prepare( ProductStatement::MediaById() );
                $media_stmt->bindValue(':id',$row['product_id']);
                $media_stmt->execute();
            
                $media_resultset = array();
                    
                while($media_row = $media_stmt->fetch()){
                    $media_resultset[] = $media_row;
                }

                $row['media'] = $media_resultset;
                // End of media fetching
                
                $resultset[] = $row;
            }
            
            $viewModel = new ViewModel( array(
                'resultset' => $resultset,
                'inlineScript' => $this->inlineScript,
                'headScript' => $this->headScript,
                'headLink' => $this->headLink
            ) );
            
            $viewModel->setTemplate('products/seo/seo')
                      ->setTerminal(true);

            $htmlOutput = $this->getServiceLocator()
                               ->get('viewrenderer')
                               ->render($viewModel);

            $jsonModel = new JsonModel(array(
                'success' => true,
                'html' => $htmlOutput,
                'title' => $resultset[0]['product_name'],
                'options' => array(
                    'inlineScript' => $this->inlineScript,
                    'headScript' => $this->headScript,
                    'headLink' => $this->headLink
                )
            ));
            
        }
        
        return $jsonModel;
        
    }
}
