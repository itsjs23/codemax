<?php

# class to benchmark
class Gauge {
    public static $scale;

    public static function start() {
        self::$scale = microtime(TRUE);
    }

    public static function end() {
        echo (microtime(TRUE) - self::$scale) . ' ms';
    }

    public static function memory() {
        echo (memory_get_peak_usage()/1000000) . ' MB'; // 1000000bytes = 1mb
    }
}