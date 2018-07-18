<?php

class Password {
    
    # $pswd: user supplied password
    public static function hash($pswd) {
        return password_hash($pswd, PASSWORD_DEFAULT);
    }
    
    # $pswd: user supplied password, $hash: hashed password saved in database
    public static function verify($pswd, $hash) {
        return password_verify($pswd, $hash);
    }
    
}