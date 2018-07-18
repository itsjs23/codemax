<?php

//CSRF Protection
class Token {
    //generate session level token
    public static function generate() {
        $token = md5(uniqid(rand(), TRUE));
        $_SESSION['csrf_token'] = $token;
        return $token;
    }
    //check if token exist in the session, things are fine else return false
    public static function isMatched() {
        if(
            isset($_SESSION['csrf_token']) &&
            isset($_POST['csrf_token']) &&
            ($_SESSION['csrf_token'] == $_POST['csrf_token'])    
        ) {
            return TRUE;
        }
        
        return FALSE;
    }
}

//use it in form as hidden field with value = Token::generate()
