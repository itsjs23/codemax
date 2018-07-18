<?php

class Create_exam_model {

    public function getCreatedExams() {
        $sql = " SELECT QZ.* FROM `quiz` QZ  WHERE QZ.`is_active` =1 ";
        return DB::all($sql);
    }

    public function deleteExam($examID) {
        $sql = "
        UPDATE sch_cls_exam_details
        SET is_active = 0
        WHERE cls_exam_id = {$examID} AND 0 < (
        SELECT COUNT(SM.gr_num)
        FROM sch_student_cls_exam_mark AS SM
        WHERE SM.exam_id = {$examID}
        )
        ";
        DB::executeDML($sql);
    }


    public function createNewExam() {
        $sql = " INSERT INTO `quiz` ( `quiz_name`, `total_question`, `total_mark`, `quiz_date`,
        `quiz_start_time`, `quiz_time_duration`, `uploaded_file_url`, `exam_hash`, `is_result_genreated`,
        `is_active`, `created_at` )
        VALUES (:quiz_name, 0, 0 , :quiz_date, :quiz_start_time, :quiz_time_duration, '',
        :exam_hash, 0, 1 , :created_at )";

        $params = array(
            ':quiz_name' => $_POST['quiz-name'],
            ':quiz_date' => $_POST['date'],
            ':quiz_start_time' => $_POST['time'],
            ':quiz_time_duration' => $_POST['duration'],
            ':exam_hash' => rand(1111, 9999),
            ':created_at' => date('Y-m-d H:i:s')
        );

        // insert exam details
        DB::executeDML($sql, $params);
        // get last inserted exam id
        $quizId = DB::lastID();
        return $quizId;
    }

    public function getClassWiseExamsCount($medium, $examType) {
        if($examType === 'uploaded') $examType = 'Question Paper';

        $sql = "
        SELECT  CS.`std` , COUNT(DISTINCT SM.`exam_id` ) AS 'passed' ,  COUNT( DISTINCT CS.`cls_exam_id`) AS 'total'
        FROM sch_cls_exam CS
        INNER JOIN sch_cls_exam_details ED  ON ED.`cls_exam_id` = CS.`cls_exam_id`
        LEFT JOIN sch_student_cls_exam_mark SM ON SM.`exam_id` =  CS.`cls_exam_id`
        WHERE CS.`mdm` = '{$medium}'  AND ED.`exam_type`='{$examType}' AND ED.`is_active`= 1 AND CS.`std` NOT IN ('','Mr.dextro')
        GROUP BY CS.`std`
        ORDER BY FIELD(CS.`std` , 'nursery', 'jr.kg','junior.kg','sr.kg',
        'senior.kg','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','Mr.Dextro','Left')
        ";

        $data = DB::all($sql);
        $temp = [];

        foreach ($data as $d) {
            $temp[$d['std']] = ['passed' => $d['passed'], 'total' => $d['total']];
        }

        return $temp;

    /*return [
    'Nursery' => ['passed' => '13', 'total' => '13'],
    'Junior' => ['passed' => '13', 'total' => '13'],
    'Senior' => ['passed' => '13', 'total' => '13'],
    'First' => ['passed' => '9', 'total' => '9'],
    'Second' => ['passed' => '6', 'total' => '9'],
    'Third' => ['passed' => '4', 'total' => '9'],
    'Fourth' => ['passed' => '9', 'total' => '9'],
    'Fifth' => ['passed' => '10', 'total' => '10'],
    'Sixth' => ['passed' => '6', 'total' => '6'],
];*/
}

public function getClassWiseExamsList($medium, $standard, $examType) {
    if($examType === 'uploaded') $examType = 'Question Paper';

    $sql = "
    SELECT ED.`cls_exam_id` as exam_id , CS.`sec`, ED.exam_name as exam, ED.exam_sub_name as sub, ED.`total_mark` , ED.total_question  ,
    DATE_FORMAT(ED.exam_date,'%d-%m-%Y') AS date , ED.exam_hash as pswd , ED.uploaded_file_url
    FROM sch_cls_exam CS
    INNER JOIN sch_cls_exam_details ED  ON ED.`cls_exam_id` = CS.`cls_exam_id`
    WHERE ED.`is_active`= 1 AND  CS.`mdm` = '{$medium}'  AND ED.`exam_type`='{$examType}'   AND CS.`std` ='{$standard}'
    ORDER BY CS.sec
    ";

    return DB::all($sql);

    /*return [
    [
    'exam_id' => 1,
    'exam' => 'IQ Test',
    'sub' => 'Maths',
    'sec' => 'A',
    'date' => '11-03-2013',
    'pswd' => '1234'
    ],
    [
    'exam_id' => 2,
    'exam' => 'IQ Test',
    'sub' => 'Maths',
    'sec' => 'A',
    'date' => '11-03-2013',
    'pswd' => '1234'
    ]
];*/
}

public function getSectionWiseExamCount($medium, $standard, $examType) {
    if($examType === 'uploaded') $examType = 'Question Paper';
    $sql = "
    SELECT  CS.`sec` ,  COUNT( DISTINCT CS.`cls_exam_id`) AS 'total'
    FROM sch_cls_exam CS
    INNER JOIN sch_cls_exam_details ED  ON ED.`cls_exam_id` = CS.`cls_exam_id`
    LEFT JOIN sch_student_cls_exam_mark SM ON SM.`exam_id` =  CS.`cls_exam_id`
    WHERE ED.`is_active`= 1 AND  CS.`mdm` = '{$medium}' AND ED.`exam_type`='{$examType}' AND CS.`std` ='{$standard}'
    GROUP BY  CS.`sec`
    ORDER BY CS.sec
    ";

    return DB::all($sql);
}

private function _uploadFile($examID) {
        // check if a directory exists by name format: examName-examID
    $dirName = UPLOADS_DIR . '/' . $_POST['exam-name'] . '-' . $examID;

    if (!is_dir($dirName)) {
        mkdir($dirName);
    }

    $explodedName = explode('.', $_FILES['upload']['name']);
    $fileExtension = $explodedName[count($explodedName) - 1];

    $uploadedFile = uniqid() . '.' . $fileExtension;
    $fileName = $dirName . '/' . $uploadedFile;
    $destination = $_FILES['upload']['tmp_name'];
    move_uploaded_file($destination, $fileName);

        // update the uploaded file url
    $this->_updateUploadedFileName($examID, $uploadedFile);
}

private function _updateUploadedFileName($examID, $fileName) {
    $sql = "
    UPDATE sch_cls_exam_details
    SET uploaded_file_url = :url
    WHERE cls_exam_id= :exam_id
    ";

    $params = array(
        ':exam_id' => $examID,
            //':url'      => $_POST['exam-name'] . '-' . $examID . '/' . $fileName
        ':url' => BASE_URL . 'assets/img/uploads/' . Session::get('user_path') . '/' . $_POST['exam-name'] . '-' . $examID . '/' . $fileName
    );

    DB::executeDML($sql, $params);
}

}
