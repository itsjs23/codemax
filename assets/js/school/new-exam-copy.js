;(function () {

    var NewExam = function() {
        this.$form = document.querySelector("[data-id='new-exam-form']");
        this.$proceedForm = document.querySelector("[data-id='set-class-form']");
        this.$standard = document.querySelector("[data-id='Standard']");
        this.$section = document.querySelector("[data-id='Section']");
        this.$inputFile = document.querySelector('input[type="file"]');
        this.$loadingIndicator = document.getElementById('loading-indicator');
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.medium = '';
        this.bind();
        this.bindExamType();
        this.bindProceedButton();
        this.bindNewExamForm();
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
    
    NewExam.prototype.bindNewExamForm = function()
    {
        document.getElementById('new_exam_form').addEventListener('submit', function() {
            document.getElementById('new_exam_submit_btn').setAttribute('disabled', 'disabled');
        });
    };
    
    NewExam.prototype.bindProceedButton = function() {
        var that = this;
        
        this.$proceedForm.addEventListener('submit', function(evt) {
            var examID = that.$proceedForm.exam.value;
            var selectedOption = document.querySelector('option[value="' + examID + '"]');
            
            if(selectedOption.dataset.type == 'Question Paper') {
                evt.preventDefault();
                window.location = selectedOption.dataset.href;
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
    
    new NewExam;
    
})();