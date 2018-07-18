<!DOCTYPE html>
    <html lang="en">
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">

            <title>Dextro Campus</title>
            <link href="<?=Link::build('assets/css/vendor/bricks.css')?>" rel="stylesheet">
            <link href="<?=Link::build('assets/css/vendor/ionicons/ionicons.min.css')?>" rel="stylesheet">
            <link href="<?=Link::build('assets/css/school/custom.css')?>" rel="stylesheet">
            <?php if(isset($css_files)) foreach($css_files as $cf) { ?>
            <link href="<?=Link::build('assets/css/school/' . $cf. '.css')?>" rel="stylesheet">
            <?php }  ?>
        </head>
        <body>


            <div id="header" class="hide-on-print" style="background-color: #1A5A86 ;color: #fff;padding: 1rem; border-bottom: 2px solid #000">
                <div class="row">
                    <div class="col m3" id="navBar">
                        <a href="javascript:void(0)" class="white" title="Browse features">
                            <i class="ion-navicon-round" style="font-size:1.6rem"></i>
                            <span class="hide-on-mob">MENU</span>
                        </a>
                    </div>
                    <div class="col m6" style="text-align: center" style="font-weight: 700">
                        <a href="<?=Link::build('welcome')?>" class="white" title="Go to home page">CODEMAX</a>
                    </div>
                    <div class="col m3" style="text-align: right">
                        <a href="<?=Link::build('logout')?>" class="white" title="Logout">
                            <i class="ion-power"></i>
                            <span class="hide-on-mob">LOGOUT</span>
                        </a>
                    </div>
                </div>
            </div>


