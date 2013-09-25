<?php
namespace Products\Entity;
use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Product {
    /**
    * @ORM\Id
    * @ORM\GeneratedValue(strategy="AUTO")
    * @ORM\Column(type="integer")
    */
    protected $id_products;

    /** @ORM\Column(type="string") */
    protected $name_products;

    /** @ORM\Column(type="integer") */
    protected $weight_products;

    /** @ORM\Column(type="integer") */
    protected $length_products;

    /** @ORM\Column(type="integer") */
    protected $height_products;

    /** @ORM\Column(type="text") */
    protected $description_products;

    /** @ORM\Column(type="integer") */
    protected $price_products;

    /** @ORM\Column(type="enum") */
    protected $enabled_products;

    // getters/setters
}