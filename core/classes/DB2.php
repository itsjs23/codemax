<?php

class DB2 {

    # a static database hook to hold pdo connection object
    protected static $hook;

    # prohibit direct object creation
    protected function __construct () {
        # empty body
    }
    
    # lock down object clone methdos : prevents duplication of object
    protected function __clone () {
        trigger_error( 'Cannot clone instance of Singleton pattern ...', E_USER_ERROR );
    }

    # lock down object wakeup methods : prevent duplication of object
    protected function __wakeup () {
        trigger_error( 'Cannot deserialize instance of Singleton pattern ...', E_USER_ERROR );
    }
    
    # protected helper to catch exception message
    protected static function catchException ($query, $e) {
        self :: kill ();
        $err = "<p>Problem running this query: $query </p>";
        $err .= "<p>Exception: $e</p>";
        trigger_error ( $err );
    }

    # this static function ensures only one instance of connection exists
    public static function hook () {
        if ( ! isset ( self :: $hook ) ) {
            try {
                # create a new PDO instance
                $dsn = 'mysql:host=' . DB2_HOST . ';dbname=' . DB2_NAME . ';charset=utf8';
                self :: $hook = new PDO ( $dsn, DB2_USER, DB2_PASSWORD, array ( PDO :: ATTR_PERSISTENT => DB2_PERSISTENT ) );
                # configure PDO to throw exceptions
                self :: $hook -> setAttribute ( PDO::ATTR_ERRMODE, PDO::ERRMODE_EXCEPTION );
            } catch ( Exception $e) {
                # close the database hook and trigger an error
                self :: kill ();
                $exceptionMessage = "<p>Connection Failure.</p>
                                    <p>Exception: $e</p>";
                trigger_error ( $exceptionMessage );
            }
        }
    }

    # function to execute DML statements - add, update, delete
    public static function executeDML ( $sql, $params = NULL ) {
        $ok = FALSE;
        try {
            self::hook();
            $stmt = self::$hook->prepare ( $sql );
            $stmt->execute ( $params );
            $ok = $stmt->rowCount ();
        } catch ( PDOException $e ) {
            self :: catchException ($sql, $e);
        }
        return $ok;
    }

    # function to retrieve all records
    public static function all ( $sql, $params = NULL, $fetchStyle = PDO :: FETCH_ASSOC ) {
        $result = NULL;
        try {
            self::hook();
            $stmt = self::$hook->prepare ( $sql );
            $stmt->execute ( $params );
            $result = $stmt->fetchAll ($fetchStyle);
        } catch ( PDOException $e ) {
            self :: catchException ($sql, $e);
        }
        return $result;
    }

    # function to retrieve a single row of record
    public static function one ( $sql, $params = NULL, $fetchStyle = PDO :: FETCH_ASSOC ) {
        $result = NULL;
        try {
            self::hook();
            $stmt = self::$hook->prepare ( $sql );
            $stmt->execute ( $params );
            $result = $stmt->fetch ($fetchStyle);
        } catch ( PDOException $e ) {
            self :: catchException ($sql, $e);
        }
        return $result;
    }

    # function to count number of records in a table
    public static function count ( $sql ) {
        $result = NULL;
        try {
            self::hook();
            $stmt = self::$hook->prepare ( $sql );
            $stmt->execute ();
            $result = $stmt->fetchColumn ();
        } catch ( PDOException $e ) {
            self :: catchException ($sql, $e);
        }
        return $result;
    }
    
    # function to get last inserted id
    public static function lastID() {
        return self::$hook->lastInsertId();        
    }

    # function to clear PDO instance
    public static function kill() {
        self :: $hook = NULL;
    }

}
