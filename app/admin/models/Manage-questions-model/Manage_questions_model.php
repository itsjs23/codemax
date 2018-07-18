<?php

class Manage_questions_model {
    public function deleteQuestion($questId) {
        //echo 'Deleted question id: ' . $questId;

        // fetch exam id and question marks
        $sql = "
            SELECT ED.`cls_exam_id` , EQ.`ques_mark` from sch_cls_exam_details ED
            INNER JOIN sch_cls_exam_question EQ ON EQ.`cls_exam_id` =  ED.`cls_exam_id`
            WHERE EQ.`question_id`='{$questId}'
        ";

        $data = DB::one($sql);



        // delete exam
        $sql = "
            DELETE FROM sch_cls_exam_question WHERE `question_id`='{$questId}'
        ";

        DB::executeDML($sql);


        // update exam marks
        $sql = "
            UPDATE sch_cls_exam_details ED
            SET ED.`total_mark` = ED.`total_mark` - {$data['ques_mark']},
            ED.`total_question` = ED.`total_question` -1
            WHERE ED.`cls_exam_id`='{$data['cls_exam_id']}'
        ";

        DB::executeDML($sql);
    }
}

