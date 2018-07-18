;(function() {
    
    var AddMarks = function() {
        this.$tbody = document.getElementById('marks-list-body');
        this.$modalDiv = document.getElementById('modal-div');
        this.$modalContent = document.getElementsByClassName('modal-content')[0];
        this.$subject = document.querySelector("[data-id='Subject']");
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.confirmTemplate = new EJS({url: 'assets/js/school/templates/confirm.ejs'});
        this.successTemplate = new EJS({url: 'assets/js/school/templates/success.ejs'});
        this.model = [];
        this.bindModal();
        this.bindTable();
        this.bindMarksInputToMaxValue();
        //this.bindSearchByEnrollNumber();
    };
    
    AddMarks.prototype.bindModal = function() {
        var that = this;
        this.$modalDiv.addEventListener('click', function(evt) {
            var btnConfirm = evt.target.getAttribute('data-confirm');
            if (btnConfirm === 'no') {
                that.$modalDiv.setAttribute('class', 'hide');
            } else if (btnConfirm === 'yes') {
                that.addMarks();
            }
        });
    }
    
    AddMarks.prototype.bindTable = function() {
        var that = this;
        this.$tbody.addEventListener('click', function(evt) {
            var btnType = evt.target.getAttribute('data-btn-type');
            
            if (btnType === 'add-marks-btn') {
                // show confirmation dialog
                that.$modalDiv.setAttribute('class', 'show');
                that.$modalContent.innerHTML = that.confirmTemplate.render();
            }
        });
    };
    
    AddMarks.prototype.bindMarksInputToMaxValue = function() {
        this.$tbody.addEventListener('keyup', function(evt) {
            var element = evt.target;
            
            if(element.nodeName == 'INPUT') {
                if(parseInt(element.value, 10) > parseInt(element.dataset.maxMarks, 10)) {
                    element.value = '';
                }
            }
        });
    };
    
    AddMarks.prototype.setModel = function() {
        var modelObj = null;
        var teacherID = this.$tbody.getAttribute('data-teacher-id');
        var examSubjectID = this.$subject.getAttribute('data-subject-id');
        var dataRows = document.querySelectorAll("tbody#add-marks-table  tr");
        var $inputWritten = '';
        var $inputOral = '';
        
        for(var i = 0, len = dataRows.length - 1; i < len; i++) { // we do not want to loop the last row (because it is just a button)
            modelObj = {
                enroll_no: dataRows[i].getAttribute('data-enroll-no'),
                teacher_id: teacherID,
                exam_sub_id: examSubjectID,
                written_mark: (function() {
                    $inputWritten = dataRows[i].querySelector("input[data-input='written']");
                    return $inputWritten ? $inputWritten.value : '';
                })(),
                oral_mark: (function() {
                    $inputOral = dataRows[i].querySelector("input[data-input='oral']");
                    return $inputOral ? $inputOral.value : '';
                })()
            };
            this.model.push(modelObj);
        }  
    };
    
    AddMarks.prototype.addMarks = function() {
        this.$modalContent.innerHTML = this.loadingTemplate.render({message: 'Processing Marks...'});
        this.setModel();
        this.xhr();
        this.model = []; // destroy model
    };
    
    AddMarks.prototype.xhr = function() {
        var that = this;
        $httpAjax({
            method: 'POST',
            url : 'add-marks/submit',
            data: 'data=' + JSON.stringify(this.model),
            async: true,
            successCall: function(xhr) {
                that.$modalContent.innerHTML = that.successTemplate.render({message: 'Marks added successfully'});
                //console.log(xhr.responseText);
            }
        });    
    };
    
    new AddMarks;
    
})();
