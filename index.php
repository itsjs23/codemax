<?php

class Index
{
    public static function main()
    {
        # define session name
        define('SESSION_NAME', 'codemax');

        # import session helper class
        require_once 'core/classes/Session.php';

        # start the session
        Session::start();

        # register core library classes auto-loader
        spl_autoload_register(array(__CLASS__, '_registerCoreLibraryAutoloader'));

        # register app class files auto-loader
        spl_autoload_register(array(__CLASS__, '_registerAppClassesAutoloader'));

        # import app configurations
        require_once 'core/config-file.php';

        # set default timezone
        date_default_timezone_set(TIMEZONE);

        # set custom error handler
        set_error_handler(array('SweetError', 'handler'), ERROR_TYPES);

        # dispatch application request
        Router::route();
    }

    private static function _registerCoreLibraryAutoloader($class)
    {
        if (file_exists($filePath = 'core/classes/' . $class . '.php')) {
            require_once $filePath;
        }
    }

    private static function _registerAppClassesAutoloader($class)
    {
        $basePath = Session::get('user_path', 'login');
        $locate = array("app/{$basePath}/controllers", "app/{$basePath}/models");
        foreach ($locate as $path) {
            $class_folder = str_replace('_', '-', $class);
            $filePath = $path . '/' . $class_folder . '/' . $class . '.php';
            if (file_exists($filePath)) {
                require_once $filePath;
                break;
            }
        }
    }
}

// trigger the app
Index::main();
