;(function () {

    var NewExam = function() {
        this.$form = document.querySelector("[data-id='new-exam-form']");
		this.$questionPaperTable = document.querySelector("[data-id='question-paper-table']");
        this.$proceedForm = document.querySelector("[data-id='set-class-form']");
        this.$standard = document.querySelector("[data-id='Standard']");
        this.$section = document.querySelector("[data-id='Section']");
        this.$inputFile = document.querySelector('input[type="file"]');
        this.$loadingIndicator = document.getElementById('loading-indicator');
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.medium = '';
        this.bind();
        this.bindExamType();
        this.bindNewExamForm();
		this.bindQuestionPaperTable();
		this.bindTableCaptions();
		this.bindDeleteExamButtons();
    };

    NewExam.prototype.bind = function() {
        var that = this;
        var targetTypes = ['Medium', 'Standard'];
        var currentTargetIndex = -1;
        var method = '';
        
        this.$form.addEventListener('change', function(evt) {
            currentTargetIndex = targetTypes.indexOf(evt.target.getAttribute('data-id'));
            
            if (currentTargetIndex !== -1) {
                method = 'select' + targetTypes[currentTargetIndex];
                that[method](evt.target);
            }
        });
    };
    
    NewExam.prototype.bindExamType = function() {
        var that = this;
        var element = document.querySelector('select[name="exam-type"]');
        
        element.addEventListener('change', function(evt) {
            var examType = evt.target.value;
            
            if(examType === 'Question Paper') {
                that.$inputFile.classList.remove('hide');
            } else {
                that.$inputFile.classList.add('hide');
            }
        });
    };
    
    NewExam.prototype.bindNewExamForm = function() {
        document.getElementById('new_exam_form').addEventListener('submit', function() {
            document.getElementById('new_exam_submit_btn').setAttribute('disabled', 'disabled');
        });
    };
	
	NewExam.prototype.bindQuestionPaperTable = function() {
        this.$questionPaperTable.addEventListener('click', function(evt) {
			if(evt.target.dataset.btnType == 'download') {
				window.location = evt.target.dataset.href;
			}
        });
    };
	
	NewExam.prototype.bindDeleteExamButtons = function() {
		document.addEventListener('click', function(evt) {
			if(evt.target.getAttribute('data-delete-exam-id')) {
				if(confirm('Are you sure?')) {
					var examID = evt.target.dataset.deleteExamId;
					$httpAjax({
						method: 'GET',
						url: 'create-exam/delete-exam/' + examID,
						async: false,
						successCall: function() {			
							document.querySelector("[data-exam-row='"+ examID +"']").classList.add('hide');
						}
					});
				}
			}
		});
	};
	
	NewExam.prototype.bindTableCaptions = function() {
		document.addEventListener('click', function(evt) {
			if(evt.target.dataset.caption == 'objective') {
				document.querySelector("[data-id='objective']").classList.toggle('hide');
			}
			
			if(evt.target.dataset.caption == 'subjective') {
				document.querySelector("[data-id='subjective']").classList.toggle('hide');
			}
			
			if(evt.target.dataset.caption == 'question-paper') {
				document.querySelector("[data-id='question-paper']").classList.toggle('hide');
			}
		});
	};
    
    NewExam.prototype.selectMedium = function(elem) {
        var medium = elem.value;
        var requestData = "data=" + JSON.stringify({medium: medium});
        this.medium = medium;
        
        if (medium !== '') {
            this.load('Loading Standards...');
            this.xhr('standard', requestData, 'standards', this.$standard, this.$loadingIndicator);
        }
    };
    
    NewExam.prototype.selectStandard = function(elem) {
        var standard = elem.value;
        var requestData = "data=" + JSON.stringify({medium: this.medium, standard: standard});
        this.standard = standard;
        
        if (standard !== '') {
            this.load('Loading Sections...');
            this.xhr('medium', requestData, 'sections', this.$section, this.$loadingIndicator);
        }
    };
    
    NewExam.prototype.xhr = function(action, data, template, templateHolder, hideLoader) {
        var that = this;
        $httpAjax({
            method: 'POST',
            url: 'select-class/' + action,
            data: data,
            async: true,
            successCall: function(xhr) {
                var data = JSON.parse(xhr.responseText);
                templateHolder.innerHTML = new EJS({url:'assets/js/school/templates/' + template + '.ejs'}).render({data});
                hideLoader.setAttribute('class', 'hide');
            }
        });
    };
    
    NewExam.prototype.load = function(message) {
        this.$loadingIndicator.setAttribute('class', 'show');
        this.$loadingIndicator.innerHTML = this.loadingTemplate.render({message: message});
    };
    
    new NewExam();
    
})();