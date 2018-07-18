<?php

class Helpers {
    #--------------------- escape output ----------------------------------
    public static function escape($string) {
        return htmlentities($string, ENT_QUOTES, 'UTF-8');
    }
    #------------- prepares a clean string to be included in an URL -------
    public static function cleanUrl ( $string ) {
        # remove all characters that aren't a-z, 0-9, dash, underscore or space
        $not_acceptable_characters_regex = '#[^-a-zA-Z0-9_ ]#';
        $string = preg_replace($not_acceptable_characters_regex, '', $string);

        # remove all leading and trailing spaces
        $string = trim($string);

        # change all dashes, underscores and spaces to dashes
        $string = preg_replace('#[-_ ]+#', '-', $string);

        # return the modified string
        return strtolower($string);
    }
    #--------------------- download file ----------------------------------
    public static function downloadFile ($path, $file) {
        // send the appropriate headers
        header('Content-Type: application/octet-stream');
        header('Content-Length: '. filesize($path));
        header('Content-Disposition: attachment; filename=' . $file);
        header('Content-Transfer-Encoding: binary');
        // output the file content
        readfile($path);
    }
    # number formatter
    public static function convert_number($number) { 
        if (($number < 0) || ($number > 999999999)) {
            throw new Exception("Number is out of range");
        } 
    
        $Gn = floor($number / 1000000);  /* Millions (giga) */ 
        $number -= $Gn * 1000000; 
        $kn = floor($number / 1000);     /* Thousands (kilo) */
        $number -= $kn * 1000; 
        $Hn = floor($number / 100);      /* Hundreds (hecto) */ 
        $number -= $Hn * 100; 
        $Dn = floor($number / 10);       /* Tens (deca) */ 
        $n = $number % 10;               /* Ones */ 
    
        $res = ""; 
    
        if ($Gn) { 
            $res .= convert_number($Gn) . " Million"; 
        } 
    
        if ($kn) { 
            $res .= (empty($res) ? "" : " ") . 
                convert_number($kn) . " Thousand"; 
        } 
    
        if ($Hn) { 
            $res .= (empty($res) ? "" : " ") . 
            convert_number($Hn) . " Hundred"; 
        }
        
        $ones = array("", "One", "Two", "Three", "Four", "Five", "Six", 
            "Seven", "Eight", "Nine", "Ten", "Eleven", "Twelve", "Thirteen", 
            "Fourteen", "Fifteen", "Sixteen", "Seventeen", "Eighteen", 
            "Nineteen"); 
        $tens = array("", "", "Twenty", "Thirty", "Fourty", "Fifty", "Sixty", 
            "Seventy", "Eigthy", "Ninety"); 
    
        if ($Dn || $n) { 
            if (!empty($res)) { 
                $res .= " and "; 
            } 
    
            if ($Dn < 2) { 
                $res .= $ones[$Dn * 10 + $n]; 
            } else { 
                $res .= $tens[$Dn]; 
    
                if ($n) { 
                    $res .= "-" . $ones[$n]; 
                } 
            } 
        } 
    
        if (empty($res)) { 
            $res = "zero"; 
        } 
    
        return $res;
    }
}
