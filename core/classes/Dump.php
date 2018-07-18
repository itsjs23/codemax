<?php

# dumps data for debugging
class Dump {
    
    public static function v($data) {
        echo '<pre>' . var_dump($data) . '</pre>';
    }

    public static function p($data) {
        echo '<pre>' . print_r($data, TRUE) . '</pre>';
    }
    
    public static function type($var) {
        echo gettype($var);
    }
    
}