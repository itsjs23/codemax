<?php

class Create_exam_model {

    public function getCreatedExams() {
        $sql = "
        SELECT DISTINCT ED.cls_exam_id , ED.exam_name  , ED.exam_sub_name, ED.exam_hash AS 'pwd_hash' ,
		CE.mdm , CE.std, CE.sec  , ED.exam_type , ED.uploaded_file_url, DATE_FORMAT(ED.exam_date,'%d-%m-%Y') AS 'exam_date' ,
		IF(SM.`gr_num` IS NULL , 1 , 0 ) AS 'can_delete_flag'
        FROM sch_cls_exam_details AS ED 
        INNER JOIN sch_cls_exam AS CE ON CE.cls_exam_id=ED.cls_exam_id
		LEFT JOIN sch_student_cls_exam_mark AS SM ON SM.`exam_id` = ED.cls_exam_id
        WHERE ED.is_active=1
		";

        $user_type = Session::get('user_type');
        $sql .= ( $user_type == 'teacher' ? " AND ED.unique_id = :teacherID " : " " );

        $params = array(':teacherID' => Session::get('user_id'));
        return DB::all($sql, $params);
    }

    public function getExamsCount(array $createdExams) {
        $arr = [
            'objective' => ['passed' => 0, 'total' => 0],
            'subjective' => ['passed' => 0, 'total' => 0],
            'question-paper' => ['passed' => 0, 'total' => 0]
        ];

        foreach ($createdExams as $exam) {
            if ($exam['exam_type'] === 'Objective') {
                if (strtotime(date('d-m-Y')) > strtotime($exam['exam_date'])) {
                    $arr['objective']['passed'] ++;
                }
                $arr['objective']['total'] ++;
            }

            if ($exam['exam_type'] === 'Subjective') {
                if (strtotime(date('d-m-Y')) > strtotime($exam['exam_date'])) {
                    $arr['subjective']['passed'] ++;
                }
                $arr['subjective']['total'] ++;
            }

            if ($exam['exam_type'] === 'Question Paper') {
                if (strtotime(date('d-m-Y')) > strtotime($exam['exam_date'])) {
                    $arr['question-paper']['passed'] ++;
                }
                $arr['question-paper']['total'] ++;
            }
        }

        return $arr;
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
        $sql = " INSERT INTO sch_cls_exam_details ( unique_id, exam_type, uploaded_file_url, exam_name, exam_sub_name, total_question,
        total_mark, exam_date, exam_start_time, exam_time_duration, session_yr, is_result_genreated, is_active, created_at,exam_hash )
        VALUES  (:id, :type, '', :name, :exam_sub_name, 0 ,0, :date, :time, :duration, :year, 0,1, :created_at ,:exam_hash ) ; ";

        $params = array(
            ':id' => Session::get('user_id'),
            ':type' => $_POST['exam-type'],
            ':name' => $_POST['exam-name'],
            ':exam_sub_name' => $_POST['subject-name'],
            ':date' => $_POST['date'],
            ':time' => $_POST['time'],
            ':duration' => $_POST['duration'],
            ':year' => date('Y') . '-' . (date('y') + 1),
            ':created_at' => date('Y-m-d H:i:s'),
            ':exam_hash' => rand(1111, 9999)
        );

        // insert exam details
        DB::executeDML($sql, $params);

        // get last inserted exam id
        $examID = DB::lastID();

        $sql = " INSERT INTO sch_cls_exam (cls_exam_id, mdm, std, sec, created_at)
        VALUES   ( :cls_exam_id , :mdm, :std, :sec, :created_at ) ; ";

        $params = array(
            ':cls_exam_id' => $examID,
            ':mdm' => $_POST['medium'],
            ':std' => $_POST['standard'],
            ':sec' => $_POST['section'],
            ':created_at' => date('Y-m-d H:i:s')
        );

        DB::executeDML($sql, $params);

        // check if exam type is 'Question Paper'
        if ($_POST['exam-type'] === 'Question Paper' && isset($_FILES['upload']['name'])) {
            $this->_uploadFile($examID);
        }

        // finally return the created exam id
        return $examID;
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
