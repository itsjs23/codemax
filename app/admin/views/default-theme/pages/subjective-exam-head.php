
            <div class="row wrapper max-wrap960" style="max-width: 1200px">
                <div class="col m12">
                    <h4 class="page-head">
                        <i class="ion-android-stopwatch" style="color: #09f"></i>
                        Exam Name: <?=strtoupper($exam_details['exam_name'])?> |
                        <?=$exam_details['exam_sub_name']?>
                    </h4>
                    
                    <!-- Exam Summary -->
                    <div class="row" style="border-bottom: 1px solid; margin-bottom: 1.5rem">
                        <p class="col m12 t6"><b>Type:</b> <?=$exam_details['exam_type']?></p>
                        <p class="col m12 t6"><b>Subject:</b> <?=$exam_details['exam_sub_name']?></p>
                        <p class="col m12 t6"><b>Date:</b> <?=date('d-m-Y', strtotime($exam_details['exam_date']))?></p>
                        <p class="col m12 t6"><b>Duration:</b> <?=$exam_details['exam_time_duration']?> Min</p>
                    </div>
                    <!-- Exam Summary -->
                    
                </div>
                <div id="page-container" class="col m12">