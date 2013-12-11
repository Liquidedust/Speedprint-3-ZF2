<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */

namespace Application\Controller;

use Zend\Mvc\Controller\AbstractActionController,
Zend\View\Model\ViewModel,
Zend\View\Model\JsonModel;

class IndexController extends AbstractActionController {
    
    protected $headLink = Array();
    
    protected $headScript = Array();
    
    protected $inlineScript = Array();
    
    public function indexAction() {
        return new ViewModel();
    }
    
    public function ajaxAction() {
        
        
        $viewModel = new ViewModel( array(
            'inlineScript' => $this->inlineScript,
            'headScript' => $this->headScript,
            'headLink' => $this->headLink
        ) );
        
        $viewModel->setTemplate('application/index/index')
                  ->setTerminal(true);

        $htmlOutput = $this->getServiceLocator()
                           ->get('viewrenderer')
                           ->render($viewModel);

        $jsonModel = new JsonModel(array(
            'success' => true,
            'html' => $htmlOutput,
            'title' => '',
            'options' => array(
                'inlineScript' => $this->inlineScript,
                'headScript' => $this->headScript,
                'headLink' => $this->headLink
            )
        ));
        
        return $jsonModel;
    }
}
