<?php

class Logout {
    public function index() {
        Session::end();
        header('Location: login');
    }
}