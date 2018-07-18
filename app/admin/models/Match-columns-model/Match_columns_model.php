<?php

class Match_columns_model
{
    public function addNewQuestion()
    {

        $sql = " insert into `sch_cls_exam_question` (`cls_exam_id`, `question`, `question_img`, `ques_mark`, `question_has`,
                `question_type`, `ans_opt_id`, `is_active`, `created_at` )
                 values (:examID,:question, :questionImg , :marks ,:quest_has, :type , '-1','1', :created_at )  ";

        $params = [
            ':examID' => Session::get('examID'),
            ':question' => $_POST['question'],
            ':questionImg' => '',
            ':marks' => $_POST['marks'],
            ':type' => 'match_column',
            ':created_at' => date('Y-m-d H:i:s'),
            ':quest_has' => 'txt'
        ];

        // 1. insert the new question
        DB::executeDML($sql, $params);

        // 2. get Last Quest Id
        $lastQuestionID = DB::lastID();

        //----------------------------------------------------------
        $values = [];

        Dump::p($_POST);

        foreach ($_POST['column'] as $k => $v) {
            $optionText = $v['key'] . '<=>' . $v['val']; // <=> is the separator
            $values[$k] = "('$lastQuestionID', '$optionText','','0' )";
        }

        $values = implode(',', $values);
        $sql = "
                INSERT INTO sch_cls_exam_question_opt( question_id, option_txt , option_img , is_ans) VALUES $values
            ";

        // 3. Insert the option
        DB::executeDML($sql);

        //------------------------------------------------------------

        $sql = "
               UPDATE sch_cls_exam_details AS ED
                SET ED.total_question = ED.total_question + 1,
                ED.total_mark = ED.total_mark + :quest_mark 
                WHERE ED.cls_exam_id=  :exam_id
            ";

        $params = [
            ':quest_mark' => $_POST['marks'],
            ':exam_id' => Session::get('examID')
        ];

        // 4. Update total question count and total marks
        DB::executeDML($sql, $params);
    }
}
