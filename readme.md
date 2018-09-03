> CREATE QUIZ

Username : admin
password : 123

>  USING URL MODE REWRITE CONDITION

1.   RewriteBase "codemax" In .htaccess
2.   VIRTUAL_LOCATION = "codemax"
     BASE_URL ="http://localhost/codemax/" In Core/config.php File



---------------------------------------------------------------------------------

<!-- index.html -->
<!DOCTYPE html>
<html>
<head>

	<!-- CSS (load bootstrap) -->
	<link rel="stylesheet" href="assets/css/bootstrap.min.css">
	<link rel="stylesheet" href="assets/css/ui-grid/ui-grid.css">

	<style>
	.navbar { border-radius:0; }
	.myGrid {width: 800px; height: 500px; } 
</style>

<!-- JS (load angular, ui-router, and our custom js file) -->
<script src="assets/js/angular-1.2.13.js"></script>
<script src="assets/js/angular-ui-router.min.js"></script>
<script src="assets/js/ui-grid/ui-grid.min.js"></script>

<!-- myapp script -->
<script type="text/javascript">
	var app =  angular.module('myapp',['ui.grid','ui.router']);

	// app.config(function($stateProvider) {
	// 	var helloState = {
	// 		name: 'hello',
	// 		url: '/hello',
	// 		template: '<h3>hello world!</h3>'
	// 	}

	// 	var aboutState = {
	// 		name: 'about',	
	// 		url: '/about',
	// 		template: '<h3>Its the UI-Router hello world app!</h3>'
	// 	}

	// 	$stateProvider.state(helloState);
	// 	$stateProvider.state(aboutState);
	// });
	
	app.controller('workflow-filter', ['$scope', function($scope) {
		$scope.filter_type_list = ['customer Name', 'CIN', 'PAN CARD', 'COMPany Name'];
		$scope.filter_type_value = [];
		$scope.filterData= {};
		$scope.filterData.data = [];

		$scope.getFilterValue = function getFilterValue(){
			if($scope.filter_type === 'customer Name'){
				$scope.filter_type_value = getCustomerName();
			}else if($scope.filter_type === 'COMPany Name'){
				$scope.filter_type_value = getCompanyNames();
			}else{
				$scope.filter_type_value = [];
			}
		};

		$scope.getFilterData = function getFilterData(){
			//  get row data and bind to angular grid 
			
			$scope.filterData.data = [{"applicationId":"87851480-1c47-4d69-aa9c-18328fc32c17","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1529047075000,"id":19008,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"3cf40883-05dc-4287-81d3-669677657596","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1529048203000,"id":19011,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"e2e1dae4-afa7-443a-8852-a7d564aaf00d","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1529050717000,"id":19012,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"16f24e15-1d0b-4de2-b628-3432abd06b48","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1529047653000,"id":19009,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"8ca0ef53-35f9-4a90-9b28-ef1775d2e51d","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1528888256000,"id":18986,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"82269f4c-3f87-45ac-a09b-ab3e824534a8","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":" AAFCP5883J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1532588663000,"id":19157,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"09e294aa-cd48-4b47-b859-cabc18d4b198","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":" AAFCP5883J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1534510289000,"id":19182,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"6bd2bb6b-432f-4e2e-b60f-e456393de1f6","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1529047858000,"id":19010,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"a5b90924-9bc8-4b6f-b588-9460315cb7f7","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1528897329000,"id":18990,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"1c273637-27bd-42e5-a2bb-20655a94de5f","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1528714342000,"id":18971,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"23099156-c1a6-4e0e-9e7a-bb0713f6d4e3","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":" AAFCP5883J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1530614688000,"id":19068,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"1c273637-27bd-42e5-a2bb-20655a94de5f","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1528714143000,"id":18970,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"1c273637-27bd-42e5-a2bb-20655a94de5f","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1528706423000,"id":18969,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"1c273637-27bd-42e5-a2bb-20655a94de5f","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":"AALCS1707J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1528706207000,"id":18968,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null},{"applicationId":"82269f4c-3f87-45ac-a09b-ab3e824534a8","companyName":"PRAGMATIX SERVICES PRIVATE LIMITED","companyPan":" AAFCP5883J","finalScore":"3.93","overrideScore":null,"finalRating":null,"applicationTimeStamp":1532073839000,"id":19112,"modelName":"Pragmatix","modelId":99,"productType":"Long Term Loan","executionGroups":null}];

			

			var gridBaseObj = {
				paginationPageSizes: [5, 10, 25, 50],
				paginationPageSize: 25,
				useExternalPagination: false,
				enableFiltering: false,
				useExternalSorting: false,
				multiSelect: false,
				enableRowHeaderSelection: false,
				// enableHorizontalScrollbar: uiGridConstants.scrollbars.NEVER,
				// enableVerticalScrollbar: uiGridConstants.scrollbars.NEVER,
				enableSorting: true
			};

			$scope.filterData = angular.copy(gridBaseObj);


			$scope.showDetailsButton = function () {
				return '<div class="grid-action-cell"><span ng-click="grid.appScope.getApplicationData(row.entity)" style="cursor:pointer;">' +
				'<img src="./assets/images/icons/view_details.png" alt="View Details" style="height:75%;" ></span></div>';
			}


			$scope.filterData.columnDefs =  [
			{ field: 'applicationTimeStamp', displayName: 'Date' },
			{ field: 'productType', displayName: 'Product Type' },
			{ field: 'modelName', displayName: 'Model Name'},
			{ field: 'workflowStatus', displayName: 'Status'},
			{ field: 'executionGroups', displayName: 'Execution Groups'},
			{
				field: 'id', enableSorting: false, enableFiltering: false, width: '20%', enableCellEdit: false, displayName: 'More Details', cellClass: 'text-center',
				cellTemplate: $scope.showDetailsButton()
			}
			];

		};





		$scope.getApplicationData = function (entity) {
			// get data and bind it to view 
			// get data 



		};
		
		function getCustomerName(){
			return ['jhamaman','bablu','anil'];
		}

		function getCompanyNames(){
			return ['RKENT','JK ENT','ANIL ENT'];
		}


	}]);

</script>

</head>

<!-- apply our angular app to our site -->
<body ng-app="myapp">

	<!-- NAVIGATION -->
	<nav class="navbar navbar-inverse" role="navigation">
		<div class="navbar-header">
			<a class="navbar-brand" ui-sref="#">AngularUI Router</a>
		</div>
		<ul class="nav navbar-nav">
			<li><a ui-sref="home">Home</a></li>
			<li><a ui-sref="about">About</a></li>
		</ul>
	</nav>

	<!-- MAIN CONTENT -->
	<div class="container">


		<section ng-controller='workflow-filter' class="workflow-filter">

			<!-- ROW 1 -->
			<div class="row ">
				<div class="col-sm-4">
					<select class="form-control form-inline" ng-model="filter_type" ng-options="filter_list for filter_list  in filter_type_list" ng-change="getFilterValue()">
					</select>
				</div>

				<div class="col-sm-4"> 
					<input type='text' class="form-control form-inline" list="workflow-value" ng-model="filter_value" ng-blur="getFilterData()"  placeholder=" filter value">
				</div>

				<datalist id="workflow-value">
					<option ng-repeat="filter_val_list in filter_type_value" value="{{filter_val_list}}" >
						{{filter_val_list}}
					</option>
				</datalist>

			</div><!-- ROW 1 END  -->



			<!-- row 2 -->
			<div class="row">
				<div ui-grid="filterData" class="myGrid"></div>
			</div>

		</section> <!-- workflow-filter end -->




		<!-- THIS IS WHERE WE WILL INJECT OUR CONTENT ============================== -->
		<div ui-view></div>

	</div>

</body>
</html>




