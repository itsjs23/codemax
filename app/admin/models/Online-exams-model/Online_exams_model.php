<?php

class Online_exams_model
{
	public function getExamsSummaryByMediums()
	{
		$sql = "
			SELECT  CS.mdm AS medium, CS.std as standard, 
			CONCAT(ROUND(((SUM(IFNULL(SM.stu_mark,0))/ IF(SUM(IFNULL(ED.total_mark,0))= 0 ,1,SUM(IFNULL(ED.total_mark,0)))) * 100),2),'%') AS 'percentage' 
			FROM sch_cls_exam AS CS 
			INNER JOIN sch_cls_exam_details AS ED ON ED.cls_exam_id=CS.cls_exam_id
			INNER JOIN user_sch AS US ON US.Medium=CS.mdm AND US.Std=CS.std AND US.Section=CS.sec
			LEFT JOIN sch_student_cls_exam_mark AS SM ON SM.exam_id=ED.cls_exam_id AND SM.gr_num=US.Gr_num
			WHERE ED.is_active= 1 AND ED.exam_type='Objective'  AND SM.exam_id IN (SELECT  DISTINCT `exam_id` FROM sch_student_cls_exam_mark )
			GROUP BY CS.mdm , CS.std
			ORDER BY FIELD(US.Medium,'English','Hindi','Marathi') , FIELD(US.Std,'nursery', 'LKG','junior.kg','UKG',
			'senior.kg','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','Mr.Dextro','Left')
		";
		$data = DB::all($sql);
		
		return [
			'English'		=> $this->_prepareExamsSummaryByMedium($data, 'English'),
			'Hindi'			=> $this->_prepareExamsSummaryByMedium($data, 'Hindi'),
			'Marathi'		=> $this->_prepareExamsSummaryByMedium($data, 'Marathi')
		];
	}
	
	public function getExamsSummaryByMediumStandard($medium, $standard)
	{
		$date = date('Y-m-d');
		
		$sql = "
			SELECT  DISTINCT CS.mdm , CS.std , CS.sec,
			CONCAT(ROUND(((SUM(IFNULL(SM.stu_mark,0))/ IF(SUM(IFNULL(ED.total_mark,0))= 0 ,1,SUM(IFNULL(ED.total_mark,0)))) * 100),2),'%') AS 'percentage',
			count( DISTINCT ED.cls_exam_id) AS 'total_exam'
			FROM sch_cls_exam AS CS 
			INNER JOIN sch_cls_exam_details AS ED ON ED.cls_exam_id=CS.cls_exam_id
			INNER JOIN user_sch AS US ON US.Medium=CS.mdm AND US.Std=CS.std AND US.Section=CS.sec
			LEFT JOIN sch_student_cls_exam_mark AS SM ON SM.exam_id=ED.cls_exam_id AND SM.gr_num=US.Gr_num
			WHERE ED.is_active= 1 AND SM.exam_id IN (SELECT  DISTINCT `exam_id` FROM sch_student_cls_exam_mark )
                        AND ED.exam_type='Objective' AND US.Medium= '{$medium}' AND US.Std= '{$standard}' 
			GROUP BY CS.mdm , CS.std, CS.sec
			ORDER BY FIELD(US.Medium,'English','Hindi','Marathi') , FIELD(US.Std,'nursery', 'LKG','junior.kg','UKG',
			'senior.kg','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','Mr.Dextro','Left'),
			FIELD(US.Section,'A','B','C','D','E','F','G','H','I','J')
		";
		return DB::all($sql);
	}
	
	public function getExamsSummaryByMediumStandardSection($medium, $standard, $section)
	{	
		$sql = "
			SELECT DISTINCT ED.cls_exam_id, ED.exam_name , CS.mdm , CS.std , CS.sec , DATE_FORMAT(ED.exam_date,'%d-%m-%Y') AS 'exam_date',
			CONCAT(ROUND(((SUM(IFNULL(SM.stu_mark,0))/ IF(SUM(IFNULL(ED.total_mark,0))= 0 ,1,SUM(IFNULL(ED.total_mark,0)))) * 100),2),'%') AS 'Per' 
			,COUNT(ED.cls_exam_id) AS 'student_total' ,  SUM(IF(SM.gr_num IS NULL ,0,1)) AS 'student_appeared'
			FROM sch_cls_exam AS CS 
			INNER JOIN sch_cls_exam_details AS ED ON ED.cls_exam_id=CS.cls_exam_id
			INNER JOIN user_sch AS US ON US.Medium=CS.mdm AND US.Std=CS.std AND US.Section=CS.sec
			LEFT JOIN sch_student_cls_exam_mark AS SM ON SM.exam_id=ED.cls_exam_id AND SM.gr_num=US.Gr_num
			WHERE ED.is_active= 1 AND ED.exam_type='Objective' AND SM.exam_id IN (SELECT  DISTINCT `exam_id` FROM sch_student_cls_exam_mark )
                        AND US.Medium='{$medium}' AND US.Std='{$standard}' AND US.Section='{$section}' 
			GROUP BY CS.mdm , CS.std,CS.sec ,ED.cls_exam_id
			ORDER BY FIELD(US.Medium,'English','Hindi','Marathi') , FIELD(US.Std,'nursery', 'LKG','junior.kg','UKG',
			'senior.kg','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','Mr.Dextro','Left')
			,FIELD(US.Section,'A','B','C','D','E','F','G','H','I','J'), ED.exam_date
		";
		return DB::all($sql);
	}
	
	private function _prepareExamsSummaryByMedium(array $records, $medium)
	{
		$tempArr = [];
		
		foreach($records as $row) {
			if($row['medium'] == $medium) {
				$tempArr[] = ['standard' => $row['standard'], 'percentage' => $row['percentage']];
			}
		}
		
		return  $tempArr;
	}
}