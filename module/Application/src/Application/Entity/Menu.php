<?php
namespace Application\Entity;
use Doctrine\ORM\Mapping as ORM;

/** @ORM\Entity */
class Menu {
    /**
    * @ORM\Id
    * @ORM\GeneratedValue(strategy="AUTO")
    * @ORM\Column(type="integer")
    */
    protected $id_categories;

    /** @ORM\Column(type="string") */
    protected $name_categories;

    /** @ORM\Column(type="integer") */
    protected $lft_categories;

    /** @ORM\Column(type="integer") */
    protected $rgt_categories;

    /** @ORM\Column(type="integer") */
    protected $sort_categories;

    /** @ORM\Column(type="text") */
    protected $description_categories;

    /** @ORM\Column(type="string") */
    protected $enabled_categories;

    // getters/setters
}