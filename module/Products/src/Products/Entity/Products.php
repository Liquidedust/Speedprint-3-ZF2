<?php
namespace Products\Entity;
use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Products {
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

    /** @ORM\Column(type="string") */
    protected $enabled_products;

    /** @ORM\Column(type="string") */
    protected $seo_products;

    // getters/setters
}

/** @ORM\Entity */
class Product_Variants_Rel {
    /**
    * @ORM\Id
    * @ORM\GeneratedValue(strategy="AUTO")
    * @ORM\Column(type="integer")
    */
    protected $id_pvr;

    /** @ORM\Column(type="integer") */
    protected $id_products;

    /** @ORM\Column(type="integer") */
    protected $id_product_variants;

    // getters/setters
}

/** @ORM\Entity */
class Product_Variants {
    /**
    * @ORM\Id
    * @ORM\GeneratedValue(strategy="AUTO")
    * @ORM\Column(type="integer")
    */
    protected $id_product_variants;

    /** @ORM\Column(type="string") */
    protected $name_product_variants;

    /** @ORM\Column(type="integer") */
    protected $weight_product_variants;

    /** @ORM\Column(type="integer") */
    protected $length_product_variants;

    /** @ORM\Column(type="integer") */
    protected $height_product_variants;

    /** @ORM\Column(type="text") */
    protected $description_product_variants;

    /** @ORM\Column(type="integer") */
    protected $price_product_variants;

    /** @ORM\Column(type="string") */
    protected $enabled_product_variants;

    /** @ORM\Column(type="string") */
    protected $seo_product_variants;

    // getters/setters
}