<?php

class True_false_model {
    public function addNewQuestion() {


        $sql = " insert into `sch_cls_exam_question` (`cls_exam_id`, `question`, `question_img`, `ques_mark`, `question_has`,
                `question_type`, `ans_opt_id`, `is_active`, `created_at` )
                 values (:examID,:question, :questionImg , :marks ,:quest_has, :type , '-1','1', :created_at )  " ;
        
            $params = array(
                ':examID'        => Session::get('examID'),
                ':question'      => $_POST['question'],
                ':questionImg'   => '',
                ':marks'         => $_POST['marks'],
                ':type'          => 'true_false',
                ':created_at'    => date('Y-m-d H:i:s'),
                ':quest_has'     => 'txt'
            );
            
            // 1. insert the new question
            DB::executeDML($sql, $params);
            
            // 2. get Last Quest Id
            $lastQuestionID = DB::lastID();
            
            //----------------------------------------------------------
            
            $sql = "
                INSERT INTO sch_cls_exam_question_opt( question_id, option_txt , option_img , is_ans)
                VALUES (:questionID, :optionTxt ,:optionImg , :is_ans )
            ";
            
            $params = array(
                ':questionID' => $lastQuestionID,
                ':optionTxt'  => $_POST['option'],
                ':optionImg'  => '',
                ':is_ans'     => 0
            );
            
            // 3. Insert the option
            DB::executeDML($sql, $params);
            
            // 4. Get last option ID
            $lastOptionID = DB::lastID();
            
            //------------------------------------------------------------
            
            $sql = "
                UPDATE sch_cls_exam_question AS EQ
                SET EQ.ans_opt_id = :optionID 
                WHERE cls_exam_id = :examID
            ";
            
            $params = array(
                ':optionID' => $lastOptionID,
                ':examID'   => Session::get('examID')
            );
            
            // 5. Update opt_ans_id in question table
            DB::executeDML($sql, $params);
            
            //------------------------------------------------------------
            
            $sql ="
                UPDATE sch_cls_exam_details AS ED 
                SET ED.total_question = ED.total_question + 1,
                ED.total_mark = ED.total_mark + :quest_mark 
                WHERE ED.cls_exam_id=  :exam_id
            ";
            
            $params = array(
                ':quest_mark' => $_POST['marks'],
                ':exam_id'    => Session::get('examID')
            );
            
            // 6. Update total question count and total marks
            DB::executeDML($sql, $params);
    }
}

