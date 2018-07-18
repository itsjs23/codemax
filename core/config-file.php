<?php

# directory constants
define('SITE_ROOT', str_replace('\\', '/', dirname(dirname(__FILE__))));
define('UPLOADS_DIR', SITE_ROOT . '/assets/img/uploads/' . Session::get('user_path'));
define('SITE_THEME', SITE_ROOT . '/app/' . Session::get('user_path', 'login') . '/views/default-theme/');

# environment specific constants
define('BASE_URL', 'http://localhost/codemax/');
define('DEFAULT_PAGE', 'Login'); // default site page
define('HTTP_SERVER_PORT', $_SERVER['SERVER_PORT'] ); # omit this if default server port 80 is used
define('VIRTUAL_LOCATION', '/codemax/'); # virtual project root relative to server root
define('USE_SSL', 'no'); # we enable and enforce SSL when this is set to anything else than 'no'
define('TIMEZONE', 'Asia/Kolkata');
define('TOKEN', 'token');


# database specific constants
define('DB_HOST', 'localhost');
define('DB_NAME', 'codemax');
define('DB_USER', 'root');
define('DB_PASSWORD', '');
define('DB_PERSISTENT', FALSE);


# error reporting settings
define('ERROR_TYPES', E_ALL);
define('DEVELOPMENT_MODE', 1); // set 0 in production
define('IS_WARNING_FATAL', 1); // set 0 in production
define('LOG_ERRORS', 0);
define('ERRORS_LOG_FILE', '/var/tmp/edulist_errors.log'); // chamge path when live

# site maintainence mode
define('MAINTAINENCE_MODE', 0);

# Debug user defined constants
//echo '<pre>', print_r(get_defined_constants(TRUE)['user'],TRUE), '</pre>';
