;(function () {

    var ClassObj = function() {
        this.$form = document.querySelector("[data-id='set-class-form']");
        this.$standard = document.querySelector("[data-id='Standard']");
        this.$section = document.querySelector("[data-id='Section']");
        this.$unit = document.querySelector("[data-id='Unit']");
        this.$subject = document.querySelector("[data-id='Subject']");
        this.$onlineExams = document.querySelector("[data-id='OnlineExams']");
		this.$loadingIndicator = document.getElementById('loading-indicator');
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.medium = '';
        this.standard = '';
        this.section = '';
        this.bind();
    };

    ClassObj.prototype.bind = function() {
        var that = this;
        var targetTypes = ['Medium', 'Standard', 'Section', 'Unit', 'Subject', 'OnlineExams'];
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
    
    ClassObj.prototype.selectMedium = function(elem) {
        var medium = elem.value;
        var requestData = "data=" + JSON.stringify({medium: medium});
        this.medium = medium;
        
        if (medium !== '') {
            this.load('Loading Standards...');
            this.xhr('standard', requestData, 'standards', this.$standard, this.$loadingIndicator);
        }
    };
    
    ClassObj.prototype.selectStandard = function(elem) {
        var standard = elem.value;
        var requestData = "data=" + JSON.stringify({medium: this.medium, standard: standard});
        this.standard = standard;
        
        if (standard !== '') {
            this.load('Loading Sections...');
            this.xhr('medium', requestData, 'sections', this.$section, this.$loadingIndicator);
        }
    };
    
    ClassObj.prototype.selectSection = function(elem) {
        var section = elem.value;
        var requestData = "data=" + JSON.stringify({medium: this.medium, standard: this.standard, section: section});
        var action = this.$section.getAttribute('data-action') || 'section';
        var template = this.$section.getAttribute('data-template');
        var templateHolder = document.getElementById(this.$section.getAttribute('data-template-holder-id'));
        
        if (section !== '') {
            this.load('Please wait...')
            this.xhr(action, requestData, template, templateHolder, this.$loadingIndicator);
        }
    };
    
    ClassObj.prototype.selectUnit = function(elem) {
        var exam_id = elem.value;
        var requestData = "data=" + JSON.stringify({exam_id: exam_id});
        
        if (exam_id !== '') {
            this.load('Loading Subjects...');
            this.xhr('fetch-subjects', requestData, 'subjects', this.$subject, this.$loadingIndicator);
        }
    };
    
    ClassObj.prototype.selectSubject = function(elem) {
        var subject_id = elem.value;
        var requestData = "data=" + JSON.stringify({subject_id: subject_id});
        var action = this.$subject.getAttribute('data-action');
        var template = this.$subject.getAttribute('data-template');
        var templateHolder = document.getElementById(this.$subject.getAttribute('data-template-holder-id'));
        
        //console.log(subject_id + '<br>' + requestData + '<br>' + action + '<br>' + template + '<br>' + templateHolder + '<br>');
        if (subject_id !== '') {
            this.$subject.setAttribute('data-subject-id', subject_id);
            this.load('Loading...');
            this.xhr(action, requestData, template, templateHolder, this.$loadingIndicator);
        }
    };
	
	ClassObj.prototype.selectOnlineExams = function(elem) {
        var exam_id = elem.value;
        var requestData = "data=" + JSON.stringify({exam_id: exam_id});
        var action = this.$onlineExams.getAttribute('data-action');
        var template = this.$onlineExams.getAttribute('data-template');
        var templateHolder = document.getElementById(this.$onlineExams.getAttribute('data-template-holder-id'));

        //console.log(subject_id + '<br>' + requestData + '<br>' + action + '<br>' + template + '<br>' + templateHolder + '<br>');
        if (exam_id !== '') {
            //this.$subject.setAttribute('data-subject-id', subject_id);
            this.load('Loading...');
            this.xhr(action, requestData, template, templateHolder, this.$loadingIndicator);
        }
    };
    
    ClassObj.prototype.xhr = function(action, data, template, templateHolder, hideLoader) {
        var that = this;
        $httpAjax({
            method: 'POST',
            url: 'select-class/' + action,
            data: data,
            async: true,
            successCall: function(xhr) {
                var data = JSON.parse(xhr.responseText);
                var content = new EJS({url:'assets/js/school/templates/' + template + '.ejs?nocahe=101'}).render({data});
                
                // in case of sms, keep appending the list of mobile numbers as content
                if(templateHolder.getAttribute('id') == 'sms-list-body') {
                    if(templateHolder.innerHTML != '') {
                        templateHolder.innerHTML += ',' + content; 
                    } else {
                        templateHolder.innerHTML += content;
                    }
                } else { 
                    templateHolder.innerHTML = content;
                }
				
                hideLoader.setAttribute('class', 'hide');
            }
        });
    };
    
    ClassObj.prototype.load = function(message) {
        this.$loadingIndicator.setAttribute('class', 'show');
        this.$loadingIndicator.innerHTML = this.loadingTemplate.render({message: message});
    };
    
    new ClassObj;
    
})();