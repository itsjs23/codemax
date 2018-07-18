<?php

# utilities for working with HTTP headers
class Status {

    public static function set301($proper_url='') {
        header('HTTP/1.1 301 Moved Permanently');
        die(Link::sendTo($proper_url));
    }

    public static function set404() {
        header('HTTP/1.0 404 Not Found');
        die(include_once SITE_ROOT . '/core/404.php');
    }

    public static function set500() {
        header('HTTP/1.0 500 Internal Server Error');
        die(include_once SITE_ROOT . '/core/500.php');
    }
}