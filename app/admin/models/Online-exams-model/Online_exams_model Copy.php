<?php

class Online_exams_model
{
	public function getExamsSummary()
	{
		// Step1: get basic details EXCLUDING appeared students count
		$sql = "
			SELECT ED.cls_exam_id , US.Medium,US.Std,US.Section , ED.exam_name,DATE_FORMAT(ED.exam_date,'%d-%m-%Y') AS 'exam_date' , COUNT(US.Gr_num) AS 'out_of'
			FROM sch_cls_exam AS CE
			INNER JOIN sch_cls_exam_details AS ED ON ED.cls_exam_id=CE.cls_exam_id
			INNER JOIN user_sch AS US ON US.Medium=CE.mdm AND US.Std=CE.std AND US.Section=CE.sec
			WHERE ED.is_active = 1
			GROUP BY ED.cls_exam_id
			ORDER BY FIELD(US.Medium,'English','Hindi','Marathi'),FIELD(US.Std,'nursery', 'jr.kg','junior.kg','sr.kg', 'senior.kg','first','second','third','fourth','fifth','sixth','seventh','eighth','ninth','tenth','Mr.Dextro','Left'),US.Section,ED.exam_date
		";
		
		$data1 = DB::all($sql);
		
		// Step2: get appeared students count data
		$sql = "
			SELECT ED.cls_exam_id, COUNT(US.Gr_num) AS 'appeared'
			FROM sch_cls_exam AS CE
			INNER JOIN sch_cls_exam_details AS ED ON ED.cls_exam_id=CE.cls_exam_id
			INNER JOIN user_sch AS US ON US.Medium=CE.mdm AND US.Std=CE.std AND US.Section=CE.sec
			INNER JOIN sch_student_cls_exam_mark AS SM ON SM.gr_num=US.Gr_num AND SM.exam_id=CE.cls_exam_id
			WHERE ED.is_active = 1
			GROUP BY  ED.cls_exam_id
		";
		
		$data2 = DB::all($sql);
		
		// Step3: prepare an array with {key:class_exam_id} and {value:appeared}
		$tempArr = array();
		
		foreach($data2 as $i) {
			$tempArr[$i['cls_exam_id']] = $i['appeared'];
		}
		
		foreach($data1 as $k => $i) {
			if(isset($tempArr[$i['cls_exam_id']])) {
				$data1[$k]['appeared'] = $tempArr[$i['cls_exam_id']];
			} else {
				$data1[$k]['appeared'] = '---';
			}
		}
		
		// Step4: return an array having basic details and appeared student count by exam id
		return array(
			'details' => $data1,
			//'appeared' => $data
		);
	}
}