<?php

class Match_columns {
    public function add($params) {
        if(Form::isPosted()) {
            (new Match_columns_model)->addNewQuestion();
            //Dump::p($_POST);
        }
        
        if(isset($params[0])) { // this means stay on match-columns page
            Link::sendTo('subjective-exam/type/match-columns');
        } else {
            Link::sendTo('manage-exam/id/' . Session::get('examID'));
        }
    }
}
