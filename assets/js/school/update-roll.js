;(function() {
    
    var UpdateRoll = function() {
        this.$tbody = document.getElementById('roll-list-body');
        this.$modalDiv = document.getElementById('modal-div');
        this.$modalContent = document.getElementsByClassName('modal-content')[0];
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.confirmTemplate = new EJS({url: 'assets/js/school/templates/confirm.ejs'});
        this.successTemplate = new EJS({url: 'assets/js/school/templates/success.ejs'});
        this.model = [];
        this.bindModal();
        this.bindTable();
                this.bindSearchByEnrollNumber();

    };
    
    UpdateRoll.prototype.bindModal = function() {
        var that = this;
        this.$modalDiv.addEventListener('click', function(evt) {
            var btnConfirm = evt.target.getAttribute('data-confirm');
            if (btnConfirm === 'no') {
                that.$modalDiv.setAttribute('class', 'hide');
            } else if (btnConfirm === 'yes') {
                that.updateRoll();
            }
        });
    }
    
    UpdateRoll.prototype.bindTable = function() {
        var that = this;
        this.$tbody.addEventListener('click', function(evt) {
            var btnType = evt.target.getAttribute('data-btn-type');
            
            if (btnType === 'update-btn') {
                // show confirmation dialog
                that.$modalDiv.setAttribute('class', 'show');
                that.$modalContent.innerHTML = that.confirmTemplate.render();
            }
        });
    };
    
    UpdateRoll.prototype.bindSearchByEnrollNumber = function()
    {
        document.getElementById('search_enroll_no_btn').addEventListener('click', function(evt) {
            var $enrollNo = document.getElementById('search_enroll_no_box').value;
            
            if($enrollNo) {
                var data = "data=" + JSON.stringify({enroll_no: $enrollNo});
                var templateHolder = document.getElementById('roll-list-body');
                var template = 'update-roll';
                
                templateHolder.innerHTML = 'loading...';
                
                $httpAjax({
                    method: 'POST',
                    url: 'select-class/section',
                    data: data,
                    async: true,
                    successCall: function(xhr) {
                        var data = JSON.parse(xhr.responseText);
                        templateHolder.innerHTML = new EJS({url:'assets/js/school/templates/' + template + '.ejs'}).render({data});
                    }
                });        
            }
        });
    };
    
    UpdateRoll.prototype.setModel = function() {
        var dataRows = document.querySelectorAll("input[data-row='yes']");
        var modelObj = null;
        
        for(var i = 0, len = dataRows.length; i < len; i++) {
            modelObj = {
                'roll_no': dataRows[i].value,
                'enroll_no': dataRows[i].getAttribute('data-enroll')
            };
            this.model.push(modelObj);
        }  
    };
    
    UpdateRoll.prototype.updateRoll = function() {
        this.$modalContent.innerHTML = this.loadingTemplate.render({message: 'Updating Roll...'});
        this.setModel();
        this.xhr();
        this.model = []; // destroy model
    };
    
    UpdateRoll.prototype.xhr = function() {
        var that = this;
        $httpAjax({
            method: 'POST',
            url : 'update-roll/submit',
            data: 'data=' + JSON.stringify(this.model),
            async: true,
            successCall: function(xhr) {
                that.$modalContent.innerHTML = that.successTemplate.render({message: 'Roll numbers updates successfully'});
            }
        });    
    };
    
    new UpdateRoll;
    
})();
