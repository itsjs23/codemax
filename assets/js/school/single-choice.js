;(function () {

    var Question = function() {
        this.$singleChoiceDiv = document.getElementById('single-choice');
        //this.$uploadImageInput = document.getElementById('image-upload-input');
        this.fileData = new FormData;
        this.bindImageUpload();
    };
    
    Question.prototype.bindImageUpload = function() {
        var that = this;
        
        this.$singleChoiceDiv.addEventListener('click', function(evt) {
            var btnType = evt.target.getAttribute('data-btn')
            var imgBtnName = '';
            if (btnType === 'image-upload') {
                imgBtnName = evt.target.getAttribute('data-name');
                document.querySelector('input[name="img[' + imgBtnName + ']"]').click();
            }
        });
        
        /*this.$uploadImageInput.addEventListener('change', function(evt) {
            var uploadedFile = that.$uploadImageInput.files;
            if (uploadedFile[0].type.match('image.*')) {
                that.fileData.append('image-details', uploadedFile[0]);
                that.xhr();
            }
        });*/
    };
    
    /*Question.prototype.xhr = function() {
        var xhr = new XMLHttpRequest;
        xhr.open('POST', 'create-exam/upload', true);
        xhr.addEventListener('load', function() {
            if (xhr.status === 200) {
                console.log(xhr.responseText);
            } else {
                console.log('An error occured');
            }
        });
        xhr.addEventListener('progress', function(evt) {
            var currentProgress = (evt.loaded / evt.total) * 100;
            console.log(currentProgress + '%');
        });
        xhr.send(this.fileData);    
    };*/
    
    new Question;
    
})();