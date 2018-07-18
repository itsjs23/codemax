<?php

class Link {
    #--------------------- builds absolute links --------------------------
    public static function build($link = '', $type = 'http') {
        $base = (( $type == 'http' || USE_SSL == 'no' ) ? 'http://' : 'https://') . getenv('SERVER_NAME');

        # if HTTP_SERVER_PORT is defined and different than default
        if(defined('HTTP_SERVER_PORT') && HTTP_SERVER_PORT != '80' && strpos($base, 'https') === false) {
            # append server port
            $base .= ':' . HTTP_SERVER_PORT;
        }
        $link = $base . VIRTUAL_LOCATION . $link;
        
        # escape html
        return htmlspecialchars($link, ENT_QUOTES, 'UTF-8');
    }

    #---------------- redirect to url or error pages-----------------------
    public static function sendTo($url='', $type='http') {
        die(header('Location: ' . self::build($url, $type)));
    }
}