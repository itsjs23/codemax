<?php

class Router {
    static public function route() {
        $url = isset($_GET['url']) ? $_GET['url'] : NULL;
        $url = explode('/', filter_var(trim($url, '/'), FILTER_SANITIZE_URL));
        $controller = empty($url[0]) ? DEFAULT_PAGE : ucfirst(str_replace('-', '_', $url[0]));
        $method = empty($url[1]) ? 'index' : str_replace('-', '_', $url[1]);
        $params = array_splice($url, 2);
    
        try {
            if(!class_exists($controller)) {
                throw new Exception('404');
            } else {
                $controller_object = new $controller;    
                if(!method_exists($controller_object, $method)) {
                    throw new Exception('404');
                } else {
                    $call = call_user_func_array(array($controller_object, $method), array($params));
                    if($call === FALSE) {
                        throw new Exception('500');
                    }    
                }
            }
        } catch(Exception $e) {
            if($e->getMessage() === '404')
                Status::set404();
            if($e->getMessage() === '500')
                Status::set500();
        }
    }
    
    static public function isAjax()
    {
        if(isset($_SERVER['HTTP_X_REQUESTED_WITH']) && $_SERVER['HTTP_X_REQUESTED_WITH'] === 'XMLHttpRequest') {
            return true;
        }

        return false;
    }
}