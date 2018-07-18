var ExamCreator = function () {
    // DOM references
    this.$createdExamsDiv = document.getElementById('created-exams-type-summary');
    this.$examsCountDiv = document.getElementById('class-wise-exams-data-holder');
    this.$examsListDiv = document.getElementById('class-wise-exams-list-holder');
    
    // DOM events
    this.bindListOfCreatedExams();
}

ExamCreator.prototype.bindListOfCreatedExams = function () {
    var that = this;
    
    // Bind click event on exam types: Objective, Subjective, Uploaded
    this.$createdExamsDiv.addEventListener('click', function (evt) {
        var closestParent = evt.target.closest('.exam-type-block');

        if (closestParent !== null) {
            var examType = closestParent.dataset.examType;
            that.renderClassWiseExamsCount('English', examType);
            that.$examsListDiv.classList.add('hide');
        }
    });

    // Bind change event on select medium filter
    this.$examsCountDiv.addEventListener('change', function (evt) {
        if(evt.target.classList.contains('medium-filter')) {
            var selectFilter = evt.target;
            that.renderClassWiseExamsCount(selectFilter.value, selectFilter.dataset.examType);
        }
    });
    
    // Bind click event on exams list count button
    this.$examsCountDiv.addEventListener('click', function(evt) {
        if(evt.target.dataset.btnType === 'show-exams-list') {
            that.renderExamsList(evt.target);
        }
    });
    
    // Bind click event on delete exam button
    this.$examsListDiv.addEventListener('click', function(evt) {
        var deleteBtn = evt.target.closest('.delete-exam-btn');
        
        if(deleteBtn) {
            that.deleteExam(deleteBtn);
        }
    })
    
    // Bind click event sections count button for filtering table rows
    document.addEventListener('click', function(evt) {
        var element = evt.target.closest('.section-count-filter');
        
        if(element) {
            that.filterExamTableRowsBySec(element.dataset.section);
        }
    });
};

ExamCreator.prototype.renderClassWiseExamsCount = function(medium, examType) {
    $httpAjax({
        method: 'POST',
        url: 'create-exam/class-wise-exams-count',
        data: 'data=' + JSON.stringify({medium: medium, exam_type: examType}),
        async: true,
        successCall: function (xhr) {
            $div = document.getElementById('class-wise-exams-data-holder');
            $div.innerHTML = xhr.responseText;
            $div.classList.remove('hide');
        }
    });
}

ExamCreator.prototype.renderExamsList = function(element) {
    var that = this;
    
    $httpAjax({
        method: 'POST',
        url: 'create-exam/class-wise-exams-list',
        data: 'data=' + JSON.stringify({exam_type: element.dataset.examType, medium: element.dataset.medium, standard: element.dataset.standard}),
        async: true,
        successCall: function(xhr) {
            that.$examsListDiv.innerHTML = xhr.responseText;
            that.$examsCountDiv.classList.add('hide');
            that.$examsListDiv.classList.remove('hide');
        }
    });
}

ExamCreator.prototype.deleteExam = function(element) {
    var examId = element.dataset.deleteExamId;
    
    if(confirm('Are you sure?')) {
        $httpAjax({
            method: 'GET',
            url: 'create-exam/delete-exam/' + examId,
            async: true,
            successCall: function() {
                document.querySelector('#tr-' + examId).classList.add('hide');
            }
        });
    }
};

ExamCreator.prototype.filterExamTableRowsBySec = function(section) {
    var tableRows = document.querySelectorAll('tbody.exams-list-body tr');
    
    for(var i = 0; i < tableRows.length; i++) {
        if(tableRows[i].dataset.section != undefined) {
            if(tableRows[i].dataset.section != section) {
                tableRows[i].classList.add('hide');
            } else {
                tableRows[i].classList.remove('hide');
            }
        }
    }
}

new ExamCreator();

//----------------------------------------------------------


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