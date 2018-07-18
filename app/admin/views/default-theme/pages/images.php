<style>
        .wrapper {
                padding-top: 30px;
        }
        .page-head {
                font-variant: small-caps;
                border-bottom: 2px solid;
        }
        .sub-head {
                border-bottom: 1px solid #646464;
                position: relative;
                padding-bottom: 1rem;
                color: #607D8B;
        }
        .sub-head button {
                position: absolute;
                right: 0;
        }
        .sub-head select {
                border-color: #607D8B;
        }
        .sub-head .ion-images {
                color: #cd5c5c;
        }
        .suggestions-bar {
            background: rgba(96, 125, 139, 0.08);
            margin-top: 3rem;
        }
        .suggestions-bar h5.title {
            background: #cd5c5c;
            border-bottom: 2px solid #cd5c5c;
            padding: 1rem;
            color: #fff;
        }
</style>


<div class="row wrapper mob-pad-top-30">

    <?php include_once 'app/school/views/default-theme/pages/dxroom-nav.php'; ?>

    <div class="col l9 mob-pad-top-30">
        <h4 class="sub-head">
            <i class="ion-images orange"></i> Images
        </h4>

        <!-- Image Search Bar -->
        <div class="row">
            <script>
                (function () {
                    var cx = '011971715475861689669:xxgry4948ug';
                    var gcse = document.createElement('script');
                    gcse.type = 'text/javascript';
                    gcse.async = true;
                    gcse.src = 'https://cse.google.com/cse.js?cx=' + cx;
                    var s = document.getElementsByTagName('script')[0];
                    s.parentNode.insertBefore(gcse, s);
                })();
            </script>
            <style>.gsc-tabsArea { display: none }</style>
            <gcse:search enableImageSearch="true" defaultToImageSearch="true"></gcse:search>
        </div>

        <!-- Suggestions Bar -->
        <div class="row suggestions-bar">
            <h5 class="title">You Can Search Images For:</h5>
            <div class="col m6 l3 txt-center">
                <img src="<?=Link::build('assets/img/common/search/1.png')?>"><br>
                <h5>Books</h5>
            </div>
            <div class="col m6 l3 txt-center">
                <img src="<?=Link::build('assets/img/common/search/2.png')?>"><br>
                <h5>Tests</h5>
            </div>
            <div class="col m6 l3 txt-center">
                <img src="<?=Link::build('assets/img/common/search/3.png')?>"><br>
                <h5>Notes</h5>
            </div>
            <div class="col m6 l3 txt-center">
                <img src="<?=Link::build('assets/img/common/search/4.png')?>"><br>
                <h5>Quizzes</h5>
            </div>
        </div>
    </div>
</div>