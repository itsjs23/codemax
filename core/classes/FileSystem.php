<?php

class FileSystem {

    /**
     * Returns TRUE if the provided path is a directory and FALSE if not.
     *
     * @param   string   $path  Path to directory
     * @return  boolean
     */
    public static function isDirectory($path) {
        return is_dir($path);
    }

    /**
     *  Creates a directory.
     *
     *  @param   string   $path       Path to directory
     *  @param   int      $mode       The widest possible access mode, ignored in windows.
     *  @param   boolean  $recursive  Recursively create nested directories.
     *  @return  boolean
     */
    public static function createDirectory($path, $mode = 0777, $recursive = false) {
        return mkdir($path, $mode, $recursive);
    }

    /**
     * Returns the file extension.
     *
     * @param   string  $file  Path to file
     * @return  string
     */
    public static function extension($file) {
        return pathinfo($file, PATHINFO_EXTENSION);
    }

    /**
     * Returns TRUE if a file exists and FALSE if not.
     *
     * @param   string   $file  Path to file
     * @return  boolean
     */
    public static function exists($file) {
        return file_exists($file);
    }

    /**
    * Returns the contents of the file.
    *
    * @param   string          $file  File path
    * @return  string|boolean
    */
    public static function getContents($file) {
        return file_get_contents($file);
    }

    /**
     * Writes the contents to a file.
     *
     * @param   string       $file  File path
     * @param   mixed        $data  File data
     * @param   boolean      $lock  Lock the file for data consistency?
     * @return  int|boolean
     */
    public static function putContents($file, $data, $lock = false) {
        return file_put_contents($file, $data, $lock ? LOCK_EX : 0);
    }

    public static function test($source, $destination, $quality) {
        // The Regular Expression filter
        $reg_exUrl = "/(http|https|ftp|ftps)\:\/\/[a-zA-Z0-9\-\.]+\.[a-zA-Z]{2,3}(\/\S*)?/";

        // The Text you want to filter for urls
        $text = "The text you want to filter goes here. http://google.com";

        // Check if there is a url in the text
        if(preg_match($reg_exUrl, $text, $url)) {

               // make the urls hyper links
               echo preg_replace($reg_exUrl, '<a href="'.$url[0].'" rel="nofollow">'.$url[0].'</a>', $text);

        } else {

               // if no urls in the text just return the text
               echo $text;

        }
    }
    
}
