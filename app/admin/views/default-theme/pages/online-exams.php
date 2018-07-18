
<div class="row wrapper max-wrap960">
    <div class="col m12">
        <h4 class="page-head">
            <i class="ion-ios-list-outline" style="color: #09f"></i> Online Results
            <!--<input type="number" id="search_enroll_no_box" name="search_enroll_no" placeholder="Enroll No" style="width:100px">
            <button id="search_enroll_no_btn" class="btn btn-green"><i class="ion-search"></i></button>-->
            <!--<input type="text" placeholder="Search by Enroll No." id="active" style="float:right">-->
        </h4>
    </div>
    
    <!--Helper box-->
    <div class="col m12">
        <div class="helper">
            <div class="head">
                <img src="<?=Link::build('assets/img/common/ani-roll.gif')?>" width="55px" height="55px" style="vertical-align: middle">
                <span class="msg" data-helper-state="show" style="margin-left: -20px; color: #626eab">
                    <b data-helper-state="show">Instructions</b>
                </span>
            </div>
            <!--<div class="head animated bounce">
                <span class="ion-android-apps"></span>
                <span class="msg" data-helper-state="show">Instructions</span>
            </div>-->
            
            <div class="info hide">
                <h5 class="txt-center">Welcome to Online Results Page!!</h5>
                <p><b>On this page, you can perform following actions:</b></p>
                <ul>
                    <li>View Exams Summary (<span class="red-label">label</span> for upcoming exams, <i class="ion-arrow-up-a green"></i> for passed exams)</li>
                    <li>View class wise results summary for online exams.</li>
                </ul>
                <!--<p><b>NOTE:</b> For correction of marks, contact Admin.</p>-->
                <div class="txt-center">
                    <button class="btn btn-green" data-helper-state="hide">Close</button>
                </div>
            </div>
        </div>
    </div>                                

    <form style="margin-bottom: 1rem; padding-top: 1rem;" class="wrapper col m12" data-id="set-class-form">
        <select class="col m6" data-id="Medium">
            <option>&#9776; Medium</option>
            <option>English</option>
            <option>Hindi</option>
            <option>Marathi</option>
        </select>
        <select class="col m6" data-id="Standard">
            <option value="">&#9776;  Standard</option>            
        </select><br><br>
        <select class="col m6" data-id="Section" data-template="online-exams-list" data-action="fetch-online-exams-list" data-template-holder-id="select-online-exam">
            <option>&#9776;  Section</option>
        </select>
        <select class="col m6" id="select-online-exam" data-id="OnlineExams" data-template="online-exams" data-action="fetch-online-exams" data-template-holder-id="table-container">
            <option>&#9776; Exam Names</option>
        </select>
        <br><br>
    </form>
		<div id="table-container" class="col m12">
			<!-- Styles For Landing Page Block -->
			<style>
				h5 { border-bottom: 1px solid #cd5c5c; border-left: 5px solid #cd5c5c; padding-left: 1rem; margin-top: 5rem; }
				.list div { line-height: 2.5 }
				.list:hover { background: #607d8b; cursor: pointer; color: #fff }
				.summary-block { background: #eee; color: #000; border: 1px solid #eee; padding-top: 0.5rem; padding-bottom: 0.5rem; text-align: center; line-height: 2.5; }
				.dark-blue-bg { background: #607d8b; color: #fff }
			</style>
			
			
			
			
			<!-- Default Landing Page Data Block -->
			<div id="default-data-block">
			<?php $counter = 0; foreach($exams_summary as $medium => $data) { ?>
			<?php if(count($data)) { ?>
				<h5><?=$medium?> Medium</h5>
				<?php foreach($data as $row) { $counter++; ?>
				<div class="row standard-row list" data-block-id="block<?=$counter?>" data-medium="<?=$medium?>" data-standard="<?=$row['standard']?>">
					<div class="col m6">
						<?=$row['standard']?>
					</div>
					<div class="col m3">
						<?=$row['percentage']?>
					</div>
					<div class="col m3 txt-right">
						<i class="ion-plus-circled"></i>
					</div>
				</div>
				
				<div id="block<?=$counter?>" class="col m12 summary-block hide">
					<!-- data comes here via ajax call -->
				</div>
				<?php } ?>
			<?php }} ?>
			
			<br><br>
			</div>
		</div>
    </div>


