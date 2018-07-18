/**
 * @var GoogleGraphLibrary
 */
var GoogleGraphLibrary = {};

GoogleGraphLibrary.drawClassWiseMarksPerformance = function(medium, data)
{
	var dataTable = new google.visualization.DataTable();
	var options = {
		title: 'Marks Performance',
		hAxis: {title: 'Assigned Classes'},
		vAxis: {title: 'Average Marks'},
	};
	var columnChart = new google.visualization.ColumnChart(document.getElementById('graphForMarks' + medium));
	
	dataTable.addColumn('string', 'Class');
	dataTable.addColumn('number', 'Total Marks');
	dataTable.addColumn('number', 'Avg Marks');
	dataTable.addRows(data);
	columnChart.draw(dataTable, options);
};

GoogleGraphLibrary.drawClassWiseAttendencePerformance = function(medium, data)
{
	var dataTable = new google.visualization.DataTable();
	var options = {
		title: 'Attendance Performance',
		hAxis: {title: 'Assigned Classes'},
		vAxis: {title: 'Average Attendance'},
	};
	var columnChart = new google.visualization.ColumnChart(document.getElementById('graphForAttendance' + medium));
	
	//dataTable.addColumn('string', 'Class');
	dataTable.addColumn('string', 'Average Attendance');
	dataTable.addColumn('number', 'Avg. Attendance(%)');
	dataTable.addRows(data);
	columnChart.draw(dataTable, options);
};

GoogleGraphLibrary.drawStandardWiseMarksPerformance = function(medium, sections, data)
{
	var dataTable = new google.visualization.DataTable();
	var options = {
		title: 'Performance Analysis For Assigned Classes',
		hAxis: {title: 'Average Marks'},
		vAxis: {title: 'Subjects'}	
	};
	var barChart = new google.visualization.BarChart(document.getElementById('graphForMarks' + medium));
	
	dataTable.addColumn('string', 'Subject');
	dataTable.addColumn('number', 'Total Marks');
	
	sections.forEach(function(item) {
		dataTable.addColumn('number', 'Sec-' + item); // example; dataTable.addColumn('number', 'Sec-A');
	});
	
	dataTable.addRows(data);
	barChart.draw(dataTable, options);
};


GoogleGraphLibrary.drawStandardWiseAttendancePerformance = function(medium, data)
{
	var dataTable = new google.visualization.DataTable();
	var options = {
		title: 'Attendance Performance',
		hAxis: {title: 'Assigned Classes'},
		vAxis: {title: 'Average Attendance'},
	};
	var columnChart = new google.visualization.ColumnChart(document.getElementById('graphForAttendance' + medium));
	
	//dataTable.addColumn('string', 'Class');
	dataTable.addColumn('string', 'Average Attendance');
	dataTable.addColumn('number', 'Avg. Attendance(%)');
	dataTable.addRows(data);
	columnChart.draw(dataTable, options);
};

/**
 * @var GraphControllerObject
 */
var GraphControllerObject = function()
{
	this.bindSelectionBoxesOnChangeEvent();
};

GraphControllerObject.prototype.bindSelectionBoxesOnChangeEvent = function()
{
	var that = this;
	
	document.addEventListener('change', function(evt)
	{
		if(evt.target.tagName.toLowerCase() === 'select') {
			if(evt.target.value === '') {
				that.renderGraphByMedium(evt.target.dataset.medium);
			} else {
				that.renderGraphByStandard(evt.target.dataset.medium, evt.target.value);
			}
		}
	});
};

GraphControllerObject.prototype.renderLandingPageGraphs = function()
{
	$httpAjax({
		method: 'GET',
		url : 'performance-analytics/get-landing-page-graph-data',
		async: true,
		successCall: function(xhr) {
			var data = JSON.parse(xhr.responseText);
			for(var medium in data.marks_data) {
				if(data.marks_data.hasOwnProperty(medium)) {
					// render class wise marks performance
					GoogleGraphLibrary.drawClassWiseMarksPerformance(medium, data.marks_data[medium]);
					
					// render class wise attendence performance
					GoogleGraphLibrary.drawClassWiseAttendencePerformance(medium, data.attendence_data[medium]);
					
					var graphContainer = document.getElementById(medium + 'MediumBlock');
					
					if(graphContainer) {
						graphContainer.classList.remove('hide-visibility');
					}
				}
			}
		}
	}); 
};

GraphControllerObject.prototype.renderGraphByMedium = function(medium)
{	
	$httpAjax({
		method: 'GET',
		url : 'performance-analytics/get-graph-data-by-medium/' + medium,
		async: true,
		successCall: function(xhr) {
			var data = JSON.parse(xhr.responseText);
			// render class wise marks performance
			GoogleGraphLibrary.drawClassWiseMarksPerformance(medium, data.marks_data[medium]);
			
			// render class wise attendence performance
			GoogleGraphLibrary.drawClassWiseAttendencePerformance(medium, data.attendence_data[medium]);
		}
	}); 
};

GraphControllerObject.prototype.renderGraphByStandard = function(medium, standard)
{
	$httpAjax({
		method: 'GET',
		url : 'performance-analytics/get-graph-data-by-standard/' + medium + '/' + standard,
		async: true,
		successCall: function(xhr) {
			var data = JSON.parse(xhr.responseText);
			GoogleGraphLibrary.drawStandardWiseMarksPerformance(medium, data.marks_data.sections, data.marks_data.marks);
			GoogleGraphLibrary.drawStandardWiseAttendancePerformance(medium, data.attendence_data);
		}
	}); 
};


/**
 * In Action:
 *
 * 1) Instantiate object::GraphController.
 * 2) Load Google JS core chart package for bar or column charts.
 * 3) On page load, trigger GraphControllerObject::renderLandingPageGraphs().
 */

var graphController = new GraphControllerObject();

google.charts.load('current', {packages: ['corechart']});

google.charts.setOnLoadCallback(function()
	{
		graphController.renderLandingPageGraphs();
	}
);