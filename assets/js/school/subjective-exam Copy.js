;(function() {
    
    var CreateExam = function() {
        this.$totalQuestionsButton = document.getElementById('total-questions-anchor');
        this.$modalDiv = document.getElementById('modal-div');
        this.$modalContent = document.getElementsByClassName('modal-content')[0];
        this.loadingTemplate = new EJS({url: 'assets/js/school/templates/loading.ejs'});
        this.bindModal();
        this.bindPage();    
    };
    
    CreateExam.prototype.bindModal = function() {
        var that = this;
        this.$modalDiv.addEventListener('click', function(evt) {
            var btnType = evt.target.getAttribute('data-btn-type');
            if (btnType === 'close') {
                that.$modalDiv.setAttribute('class', 'hide');
            }
        });
    };
    
    CreateExam.prototype.bindPage = function() {
        var that = this;
        
        this.$totalQuestionsButton.addEventListener('click', function() {
            that.$modalDiv.setAttribute('class', 'show');
            that.$modalContent.innerHTML = that.loadingTemplate.render({message: 'Loading questions preview....'});
            
            $httpAjax({
                method: 'GET',
                url: 'manage-exam/get-questions',
                data: null,
                async: true,
                successCall: function(xhr) {
                    var data = JSON.parse(xhr.responseText);
                    that.$modalContent.innerHTML = new EJS({url: 'assets/js/school/templates/preview-questions.ejs'}).render({data});
                }
            });
        });
    };
    
    new CreateExam;
    
})();

// highlight total questions button for visual clue
;(function() {

    var fadingObject = {
        yellowColor : function(val) {
            var r = '00';
            var g = '80';
            var b = val.toString(16);
            var newval = '#' + r + g + b;
            
            return newval;
        },
        fade : function(id,start,finish) {
            this.count = this.start = start;
            this.finish = finish;
            this.id = id;
            this.countDown = function() {
                this.count -= 30;
                
                if (this.count <= this.finish) {
                    document.getElementById(this.id).style.background = '#008000';
                    this.countDown = null;
                    return;
                }
                
                document.getElementById(this.id).style.backgroundColor =  this.yellowColor(this.count);
                setTimeout(this.countDown.bind(this),150);
            }
        }
    };
                
    // fade the button
    fadingObject.fade('total-questions-anchor', 300, 0);
    fadingObject.countDown();
})();

// delete a question
;(function() {
    document.addEventListener('click', function(evt) {
        var clickedElement = evt.target;
        var parentElement = clickedElement.parentNode;
        var questionID = clickedElement.getAttribute('data-id');
        
        if (clickedElement.classList.contains('confirm-delete-question')) {
            clickedElement.classList.toggle('hide');
            clickedElement.nextElementSibling.classList.toggle('hide');
        } else if (clickedElement.classList.contains('confirm-delete-no')) {
            parentElement.classList.toggle('hide');
            parentElement.previousElementSibling.classList.toggle('hide');
        } else if (clickedElement.classList.contains('confirm-delete-yes')) {
            parentElement.innerHTML = 'Deleting...'; 
            $httpAjax({
                method: 'POST',
                url: 'manage-questions/delete-question',
                data: 'data=' + JSON.stringify({id:questionID}),
                successCall: function(xhr) {
                    parentElement.innerHTML = 'Deleted <i class="ion-checkmark-circled green" style="font-size:1.6rem"></i>';
                    //document.getElementById(clickedElement.getAttribute('data-id')).style.opacity = 0.5;
                }
            });
        }
    });    
})();