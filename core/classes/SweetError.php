<?php

class SweetError {
    static public function handler($errCode, $errStr, $errFile, $errLine) {
        // human friendly error levels
        $levels = array(
            E_WARNING               => 'Warning',
            E_NOTICE                => 'Notice',
            E_USER_ERROR            => 'Error',
            E_USER_WARNING          => 'Warning',
            E_USER_NOTICE           => 'Notice',
            E_STRICT                => 'Strict Warning',
            E_RECOVERABLE_ERROR     => 'Recoverable Error',
            E_DEPRECATED            => 'Deprecated Feature',
            E_USER_DEPRECATED       => 'Deprecated Feature'
        );

        // prepare the message
        $message = "\n\n";
        $message .= "You gotta '{$levels[$errCode]}' on date: " . date('d/m/Y H:i') . "\n\n";
        $message .=  "[Message]: {$errStr}" . "\n\n";
        $message .= "[File]: {$errFile}" . "\n\n";
        $message .= "[Line]: {$errLine}" . "\n\n";

        if(LOG_ERRORS) {
            clearstatcache();
            if(filesize(ERRORS_LOG_FILE) < 10240) { // if file greater than 10KB
                error_log($message, 3, ERRORS_LOG_FILE);
            }

        }
        
        /*
         * We know that, notices do not abort script execution.
         * But, in development mode, even they should be shown.
         * Also, because most errors tend to fall in E_WARNING
         * category (such as dividing by 0, or trying to read a
         * nonexistent file), we should treat warnings fatal while
         * development.
         *
         * Note that, we use trigger_error() method to report custom
         * errors, but they can only accept four options (E_ERROR,
         * E_WARNING, E_NOTICE, E_USER_DEPRECATED).
         */

        // we are not taking warnings fatal
        if(($errCode == E_WARNING && IS_WARNING_FATAL == 0) || ($errCode == E_NOTICE || $errCode == E_USER_NOTICE)) {

            if(DEVELOPMENT_MODE) // and showing notices or warning only if in development mode
                echo '<pre class="sweet-error">' . $message . '</pre>';

            // and continue processing the script further
        } else { // we are treating warnings fatal, but this also includes rest errors because they all are actually type of warnings
            if(DEVELOPMENT_MODE) // and the mode is development mode
                echo '<pre class="sweet-error">' . $message . '</pre>';
            else // and the mode is production mode
                echo '<pre class="sweet-error">' . 'We are facing some technical issues' . '</pre>';

            /*
             * Because things are fatal, kill the script, this way no more further
             * error handling by PHP, no need to use error_reporting(0)
             */
            exit();
        }

    }
}