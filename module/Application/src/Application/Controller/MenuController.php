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
Zend\View\Model\JsonModel,
Doctrine\ORM\EntityManager,
Doctrine\ORM\Query\ResultSetMapping,
Application\Entity\Menu,
Application\Statements\Application AS ApplicationStatement,
Exception;

class MenuController extends AbstractActionController {
    
    protected $em;
    
    public function getEntityManager() {
        if (null === $this->em) {
            $this->em = $this->getServiceLocator()->get('Doctrine\ORM\EntityManager');
        }
        return $this->em;
    }
    
    public function indexAction() {
        $em = $this->getEntityManager();
        $repository = $em->getRepository('\Application\Entity\Menu');
            
        $stmt = $em ->getConnection()
                    ->prepare( ApplicationStatement::menuTree() );
        $stmt->execute();
            
        $resultset = array();
            
        while ($row = $stmt->fetch()) {
            $resultset[] = $row;
        }
        
        $new = $this->nestifyFormat( $resultset, 'depth' );
        
        $viewModel = new ViewModel( array( 'resultset' => $new[0]['children'] ) );
        $viewModel->setTemplate('application/menu/index');
        $viewModel->setTerminal(true);
        return $viewModel;
    }
    
    public function byIdAction() {
        $viewModel = new ViewModel();
        $viewModel->setTemplate('application/menu/index');
        $viewModel->setTerminal(true);
        return $viewModel;
    }
    
    public function nestifyFormat( $arrs, $depth_key = 'depth' ) {
        $nested = array();
        $depths = array();

        foreach( $arrs as $key => $arr ) {
            if( $arr[$depth_key] == 0 ) {
                    $nested[$key] = $arr;
                    $depths[$arr[$depth_key] + 1] = $key;
            } else {
                    $parent =& $nested;
                    for( $i = 1; $i <= ( $arr[$depth_key] ); $i++ ) {
                        $parent =& $parent[$depths[$i]]['children'];
                    }
                    $parent[$key] = $arr;
                    $depths[$arr[$depth_key] + 1] = $key;
            }
        }

        return $nested;
    }
}