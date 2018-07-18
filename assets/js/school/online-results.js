var OnlineResults = function() {
	this.$modalDiv = document.getElementById('modal-div');
	this.$modalContent = document.getElementsByClassName('modal-content')[0];
	this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
	this.bindModal();
	this.bindStandardRows();
	this.bindPopUpExamsButtons();
};

OnlineResults.prototype.bindModal = function() {
	var that = this;
	this.$modalDiv.addEventListener('click', function(evt) {
		var btnType = evt.target.getAttribute('data-btn-type');
		if (btnType === 'close') {
			that.$modalDiv.setAttribute('class', 'hide');
		}
	});
};

OnlineResults.prototype.bindStandardRows = function() {
	var rows = document.getElementsByClassName('standard-row');
	for(var i = 0; i < rows.length; i++) {
		rows[i].addEventListener('click', function() {
			var divID = document.getElementById(this.getAttribute('data-block-id'));
			divID.innerHTML = 'Loading Data...';
			divID.classList.toggle('hide');
			this.querySelector('i').classList.toggle('ion-minus-circled');
			this.querySelector('i').classList.toggle('ion-plus-circled');
			this.classList.toggle('dark-blue-bg');
			
			$httpAjax({
				method: 'GET',
				url: 'online-exams/getExamsSummaryByMediumStandard/' + this.getAttribute('data-medium') + '/' + this.getAttribute('data-standard'),
				async: true,
				successCall: function(xhr) {
					var data = JSON.parse(xhr.responseText);
					divID.innerHTML = new EJS({url:'assets/js/school/templates/' + 'standard-rows' + '.ejs'}).render({data});
				}
			});
		});
	}
};

OnlineResults.prototype.bindPopUpExamsButtons = function() {
	var that = this;
	
	document.addEventListener('click', function(evt) {
		if(evt.target.dataset.btnType == 'popupExams') {
			that.$modalDiv.setAttribute('class', 'show');
			that.$modalContent.innerHTML = that.loadingTemplate.render({message: 'Please wait....'});
			
			var details = evt.target.dataset.details.split('|');
			
			$httpAjax({
				method: 'GET',
				url: 'online-exams/getExamsSummaryByMediumStandardSection/' + details[0] + '/' + details[1] + '/' + details[2],
				async: true,
				successCall: function(xhr) {
					var data = JSON.parse(xhr.responseText);
					that.$modalContent.innerHTML = new EJS({url: 'assets/js/school/templates/popup-online-results.ejs'}).render({data});
				}
			});
		}
	});
};

// in action
new OnlineResults();