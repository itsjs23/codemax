
<div class="row wrapper" style="max-width: 100%">
    
    <!--<div class="col m12">
        <h4 class="page-head">
            <i class="ion-stats-bars" style="color: #09f"></i> Performance Analytics
        </h4>
    </div>-->
    
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
                <h5 class="txt-center">Welcome to Performance Page!!</h5>
                <p><b>This page represents following reports:</b></p>
                <ul>
                    <li>Performance analysis of the assigned classes.</li>
                    <li>Per subject performance view.</li>
                </ul>
                <!--<p><b>NOTE:</b> For correction of marks, contact Admin.</p>-->
                <div class="txt-center">
                    <button class="btn btn-green" data-helper-state="hide">Close</button>
                </div>
            </div>
        </div>
    </div>                                
    
    <!-- We require this special class only on this page -->
    <style>
        .hide-visibility { visibility: hidden }
		.height750 { height: 750px }
    </style>
    <!-- English Medium Block -->
    <div id="EnglishMediumBlock" class="hide-visibility">
        <h5>
            <i class="ion-stats-bars" style="color: #09f"></i>
            English Medium
            <select class="active-field" id="english-select" data-medium="English">
                <option value="">&#9776; Select Class</option>
                <option value="junior.kg">junior.kg</option>
				<option value="senior.kg">senior.kg</option>
				<option value="first">first</option>
				<option value="second">second</option>
				<option value="third">third</option>
				<option value="fourth">fourth</option>
				<option value="fifth">fifth</option>
				<option value="sixth">sixth</option>
				<option value="seventh">seventh</option>
				<option value="eighth">eighth</option>
				<option value="ninth">ninth</option>
				<option value="tenth">tenth</option>
				<option value="Mr.dextro">Mr.dextro</option>
            </select>
        </h5>
        <div style="border: 2px solid; overflow-x: auto; overflow-y: hidden; margin-bottom: 4rem">
            <h5 id="english-h5" style="background: #607D8B; color: #fff; text-align: center; padding: 0.5rem">
                Performance Analysis (Marks/Attendance)
            </h5>
            <div id="graphForMarksEnglish" class="row height750"></div><br><hr><br>
			<div id="graphForAttendanceEnglish" class="row"></div>    
        </div>
    </div>
    
    <!-- Hindi Medium Block -->
    <div id="HindiMediumBlock" class="hide-visibility">
        <h5>
            <i class="ion-stats-bars" style="color: #09f"></i>
            Hindi Medium
            <select class="active-field" id="english-select" data-medium="Hindi">
                <option value="">&#9776; Select Class</option>
                <option value="first">first</option>
				<option value="second">second</option>
				<option value="third">third</option>
				<option value="fourth">fourth</option>
				<option value="fifth">fifth</option>
				<option value="sixth">sixth</option>
				<option value="seventh">seventh</option>
				<option value="eighth">eighth</option>
				<option value="ninth">ninth</option>
				<option value="tenth">tenth</option>
				<option value="Mr.dextro">Mr.dextro<
            </select>
        </h5>
        <div style="border: 2px solid; overflow-x: auto; overflow-y: hidden; margin-bottom: 4rem">
            <h5 id="english-h5" style="background: #607D8B; color: #fff; text-align: center; padding: 0.5rem">
                Performance Analysis (Marks/Attendance)
            </h5>
            <div id="graphForMarksHindi" class="row height750"></div><br><br>
			<div id="graphForAttendanceHindi" class="row"></div>    
        </div>
    </div>
    
    <!-- Marathi Medium Block -->
    <div id="MarathiMediumBlock" class="hide-visibility">
        <h5>
            <i class="ion-stats-bars" style="color: #09f"></i>
            Marathi Medium
            <select class="active-field" id="english-select" data-medium="Marathi">
                <option value="">&#9776; Select Class</option>
                <option value="Nursery">Nursery</option>
                <option value="First">First</option>
                <option value="Second">Second</option>
            </select>
        </h5>
        <div style="border: 2px solid; overflow-x: auto; overflow-y: hidden; margin-bottom: 4rem">
            <h5 id="english-h5" style="background: #607D8B; color: #fff; text-align: center; padding: 0.5rem">
                Performance Analysis (Marks/Attendance)
            </h5>
            <div id="graphForMarksMarathi" class="row height750"></div><br><br>
			<div id="graphForAttendanceMarathi" class="row"></div>    
        </div>
    </div>
    
    <!--Load google charts library-->
    <script type="text/javascript" src="https://www.gstatic.com/charts/loader.js"></script>
</div>