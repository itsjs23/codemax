;(function () {

    var McqsImage = function() {
        this.$mcqsDiv = document.getElementById('mcqs-div');
        this.fileData = new FormData;
        this.bindImageUpload();
    };
    
    McqsImage.prototype.bindImageUpload = function() {
        var that = this;
        var clickedImageElement = null;
        
        this.$mcqsDiv.addEventListener('click', function(evt) {
            var btnType = evt.target.getAttribute('data-btn')
            var imgBtnName = '';
            if (btnType === 'image-upload') {
                imgBtnName = evt.target.getAttribute('data-name');
                clickedImageElement = document.querySelector('input[name="img[' + imgBtnName + ']"]');
                clickedImageElement.click(); // invoke the image upload form
                that.bindImagePreview(clickedImageElement, evt.target.getAttribute('data-image-holder'));
            }
        });
    };
    
    McqsImage.prototype.bindImagePreview = function(img, imgID) {
        img.addEventListener('change', function(evt) {
            if (img.files && img.files[0]) {
                var streamReader = new FileReader;
                
                streamReader.addEventListener('load', function(evt) {
                    var imageHolder = document.getElementById(imgID);
                    document.querySelector('#' + imgID + ' img').setAttribute('src', evt.target.result);
                    imageHolder.classList.remove('hide');
                });
                
                streamReader.readAsDataURL(img.files[0]);
            }
        });    
    };
    
    new McqsImage;
    
})();