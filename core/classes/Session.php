<?php

class Session {

    public static function start() {
        ini_set('session.use_only_cookies', TRUE); // only allowing to use cookie based sessions
        ini_set('session.use_trans_sid', FALSE); // explicitly instruct PHP to not append the session identifier to the URLs
        session_name(SESSION_NAME); // change the default session cookie name
        session_start();
    }
    
    public static function exists($name) {
        return(isset($_SESSION[$name])) ? TRUE : FALSE;
    }

    public static function put($name, $value) {
        return $_SESSION[$name] = $value;
    }
    
    public static function get($name, $default = null) {
        if(isset($_SESSION[$name])) {
            return $_SESSION[$name];
        }
        
        return $default;
    }

    public static function reload() {
        session_regenerate_id();
    }
    public static function agent() {
        self::put('user_agent', $_SERVER['HTTP_USER_AGENT']);
    }
    public static function userAgent() {
        if(self::get('user_agent') == $_SERVER['HTTP_USER_AGENT']) {
            return TRUE;
        }
        return FALSE;
    }

    public static function delete($name) {
        if(self::exists($name)) {
            unset($_SESSION[$name]);
        }
    }
    
    //flash data that dies on page refresh
    public static function flash($name, $string = '') {
        if(self::exists($name)) {
            $session = self::get($name);
            self::delete($name);
            return $session;
        } else {
            self::put($name, $string);
        }
    }

    public static function end() {
        $_SESSION = array ();
        if ( ini_get ( 'session.use_cookies' ) ) {
            $params = session_get_cookie_params ();
            setcookie( session_name (), '', time () - 42000, $params [ 'path' ], $params [ 'domain' ], $params [ 'secure' ], $params [ 'httponly' ] );
        }
        session_destroy ();    
    }
}