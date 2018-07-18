<?php

class Form {
    public static function isPosted($type="POST") {
        switch($type) {
            case 'POST':
                return (!empty($_POST)) ? TRUE : FALSE;
            break;
            case 'GET':
                return (!empty($_GET)) ? TRUE : FALSE;
            break;
            default:
                return FALSE;
            break;
        }
    }
    public static function get($item) { // get submitted data
        if(isset($_POST[$item])) {
            return Helpers::escape($_POST[$item]);
        } elseif(isset($_GET[$item])) {
            return Helpers::escape($_GET[$item]);
        }
        return ''; //if nothing exists, we still want to return empty string value
    }
}