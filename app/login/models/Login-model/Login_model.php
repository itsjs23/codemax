<?php

class Login_model {
    public function fetchUser() {
        $sql = "
        SELECT US.* FROM `users` US
        WHERE US.`user_name` = :username  AND US.`password` = :password
        ";

        $pwd = md5($_POST['password']);
        $params = array(
            ':username' => $_POST['username'],
            ':password' =>  $pwd
        );
        return DB::one($sql, $params);
    }
}
