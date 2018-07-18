;(function() {
    
    var AddRemarks = function() {
        this.$tbody = document.getElementById('remarks-list-body');
        this.$modalDiv = document.getElementById('modal-div');
        this.$modalContent = document.getElementsByClassName('modal-content')[0];
        this.$subject = document.querySelector("[data-id='Subject']");
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.confirmTemplate = new EJS({url: 'assets/js/school/templates/confirm.ejs'});
        this.successTemplate = new EJS({url: 'assets/js/school/templates/success.ejs'});
        this.model = [];
        this.bindModal();
        this.bindTable();
    };
    
    AddRemarks.prototype.bindModal = function() {
        var that = this;
        this.$modalDiv.addEventListener('click', function(evt) {
            var btnConfirm = evt.target.getAttribute('data-confirm');
            if (btnConfirm === 'no') {
                that.$modalDiv.setAttribute('class', 'hide');
            } else if (btnConfirm === 'yes') {
                that.addRemarks();
            }
        });
    }
    
    AddRemarks.prototype.bindTable = function() {
        var that = this;
        this.$tbody.addEventListener('click', function(evt) {
            var btnType = evt.target.getAttribute('data-btn-type');
            
            if (btnType === 'add-remarks-btn') {
                // show confirmation dialog
                that.$modalDiv.setAttribute('class', 'show');
                that.$modalContent.innerHTML = that.confirmTemplate.render();
            }
        });
    };
    
    AddRemarks.prototype.setModel = function() {
        var modelObj = null;
        var examSubjectID = this.$subject.getAttribute('data-subject-id');
        var dataRows = document.querySelectorAll("tbody#add-remarks-table  tr");
        
        for(var i = 0, len = dataRows.length - 1; i < len; i++) { // we do not want to loop the last row (because it is just a button)
            modelObj = {
                enroll_no: dataRows[i].getAttribute('data-enroll-no'),
                exam_id: examSubjectID,
                progress_remark: escape(dataRows[i].querySelector("[placeholder='Progress']").value),
                hobbies_remark: escape(dataRows[i].querySelector("[placeholder='Hobbies']").value),
                improvements_remark: escape(dataRows[i].querySelector("[placeholder='Improvements']").value),
                others_remark: escape(dataRows[i].querySelector("[placeholder='Others']").value),
            };
            this.model.push(modelObj);
        }  
    };
    
    AddRemarks.prototype.addRemarks = function() {
        this.$modalContent.innerHTML = this.loadingTemplate.render({message: 'Processing Marks...'});
        this.setModel();
        this.xhr();
        console.log(this.model);
        this.model = []; // destroy model
    };
    
    AddRemarks.prototype.xhr = function() {
        var that = this;
        $httpAjax({
            method: 'POST',
            url : 'add-remarks/submitRemarks',
            data: 'data=' + JSON.stringify(this.model),
            async: true,
            successCall: function() {
                that.$modalContent.innerHTML = that.successTemplate.render({message: 'Remarks submitted successfully'});
                //console.log(xhr.responseText);
            }
        });    
    };
    
    new AddRemarks;
    
})();
