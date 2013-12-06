<?php

namespace Application\Statements;

class Application {
    
    protected static $select_menu_tree  =  "";
    
    public static function menuTree() {
        return (string)Products::$select_menu_tree;
    }
}