<?php
/**
 * Zend Framework (http://framework.zend.com/)
 *
 * @link      http://github.com/zendframework/ZendSkeletonApplication for the canonical source repository
 * @copyright Copyright (c) 2005-2012 Zend Technologies USA Inc. (http://www.zend.com)
 * @license   http://framework.zend.com/license/new-bsd New BSD License
 */
namespace Products;

return array(
    'router' => array(
        'routes' => array(
            'products' => array(
                'type'    => 'Segment',
                'options' => array(
                    'route'    => '/products[/:id[/:name]]',
                    'defaults' => array(
                        '__NAMESPACE__' => 'Products\Controller',
                        'controller'    => 'Index',
                        'action'        => 'index',
                    ),
                ),
                'may_terminate' => true,
                /*'child_routes' => array(
                    'default' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/[:id[/:name]]',
                            'constraints' => array(
                                'id'        => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'name'      => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                            ),
                        ),
                    ),
                ),*/
            ),
        ),
    ),
    'service_manager' => array(
        'factories' => array(
            'translator' => 'Zend\I18n\Translator\TranslatorServiceFactory',
        ),
    ),
    'translator' => array(
        'locale' => 'sv_SE',
        'translation_file_patterns' => array(
            array(
                'type'     => 'gettext',
                'base_dir' => __DIR__ . '/../language',
                'pattern'  => '%s.mo',
            ),
        ),
    ),
    'controllers' => array(
        'invokables' => array(
            'Products\Controller\Index' => 'Products\Controller\IndexController'
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => false,
        'display_exceptions'       => false,
        'doctype'                  => 'HTML5',
        'template_map' => array(
            'products/index/index' => __DIR__ . '/../view/products/index/index.phtml',
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
    ),
    // Doctrine config
    'doctrine' => array(
        'driver' => array(
            __NAMESPACE__ . '_driver' => array(
                'class' => 'Doctrine\ORM\Mapping\Driver\AnnotationDriver',
                'cache' => 'array',
                'paths' => array(__DIR__ . '/../src/' . __NAMESPACE__ . '/Entity')
            ),
            'orm_default' => array(
                'drivers' => array(
                    __NAMESPACE__ . '/Entity' => __NAMESPACE__ . '_driver'
                )
            )
        )
    )
);
