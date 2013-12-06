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
                'type'    => 'Zend\Mvc\Router\Http\Literal',
                'options' => array(
                    'route'    => '/produkter',
                    'defaults' => array(
                        'controller'    => 'Products\Controller\Index',
                        'action'        => 'index',
                    ),
                ),
                'may_terminate' => true,
                'child_routes' => array(
                    'product' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/[:id[_:name][/:action]]',
                            'constraints' => array(
                                'id'        => '[0-9]*',
                                'name'      => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'      => '[a-zA-Z][a-zA-Z0-9_-]*',
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Products\Controller',
                                'controller'    => 'Product',
                                'action'        => 'index',
                            ),
                        ),
                    ),
                    'seo' => array(
                        'type'    => 'Segment',
                        'options' => array(
                            'route'    => '/[:seo[/:action[/:variant]]]',
                            'constraints' => array(
                                'seo'      => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'action'      => '[a-zA-Z][a-zA-Z0-9_-]*',
                                'variant'      => '[0-9]*',
                            ),
                            'defaults' => array(
                                '__NAMESPACE__' => 'Products\Controller',
                                'controller'    => 'Seo',
                                'action'        => 'index',
                            ),
                        ),
                    ),
                ),
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
            'Products\Controller\Index'   => 'Products\Controller\IndexController',
            'Products\Controller\Product' => 'Products\Controller\ProductController',
            'Products\Controller\Seo'     => 'Products\Controller\SeoController',
        ),
    ),
    'view_manager' => array(
        'display_not_found_reason' => true,
        'display_exceptions'       => true,
        'doctype'                  => 'HTML5',
        'not_found_template'       => 'products/error/404',
        'template_map' => array(
            'products/index/index' => __DIR__ . '/../view/products/index/index.phtml',
            'products/product/index' => __DIR__ . '/../view/products/product/product.phtml',
            'products/seo/index' => __DIR__ . '/../view/products/seo/seo.phtml'
        ),
        'template_path_stack' => array(
            __DIR__ . '/../view',
        ),
        'strategies' => array(
            'ViewJsonStrategy',
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
                    __NAMESPACE__ . '\Entity' => __NAMESPACE__ . '_driver'
                    // 'Products\Entity' => 'products_entities'
                )
            )
        )
    )
);
