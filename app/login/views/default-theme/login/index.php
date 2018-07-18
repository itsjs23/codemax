<!DOCTYPE html>
    <html>
        <head>
            <meta charset="utf-8">
            <meta name="viewport" content="width=device-width, initial-scale=1.0">
            <title>Codemax | QUIZ</title>
            <link href="<?=Link::build('assets/css/vendor/bricks.css')?>" rel="stylesheet">
            <link href="<?=Link::build('assets/css/vendor/ionicons/ionicons.min.css')?>" rel="stylesheet">
            <style>
                body {
                    color: #646464;
                }
                header {
                    padding-top: 2rem;
                    padding-bottom: 2rem;
                    background: linear-gradient(to right, rgba(13, 45, 103, 0.9), #f6f1d3);
                    color: #fff;
                }
                .ion {
                    display: inline-block;
                    background: #E91E63;
                    height: 60px;
                    line-height: 60px;
                    width: 60px;
                    color: #fff;
                    font-size: 2rem;
                    border-radius: 50%;
                }
                form {
                    max-width: 400px;
                    margin: 2rem auto;
                    padding-left: 1.5rem;
                    padding-right: 1.5rem;
                }
                form input.field {
                    width: 100%;
                    height: 5rem;
                }
                .form-field {
                    margin-bottom: 3rem;
                }
                .form-field input {
                    border: 1px solid #757575;
                }
                .btn {
                    background-color: rgba(13, 45, 103, 0.9);
                    /*background-color: #3F51B5;*/
                    width: 100%;
                    height: 3rem;
                    color: #fff;
                }
                footer {
                    color: #315b86;
                }
                .err {
                    font-weight: 700;
                    font-size: 1.4rem;
                    color: #cd5c5c;
                    text-align: center;
                    padding-bottom: 1rem;
                }

                @media screen and (max-width: 768px) {
                    form input.field {
                        border: none;
                        border-bottom: 2px solid #ccc;
                    }
                }
            </style>
        </head>
        <body>
            <header class="txt-center">
                <h1>Codemax</h1>
                <h4>Online Quiz</h4>
                <span class="ion ion-person-stalker"></span>
            </header>

            <form method="post" action="<?=Link::build('login')?>">
                <?php if(isset($err)) { ?>
                <div class="err">&times; <?=$err?></div><?php }
                ?>

                <div class="form-field">
                    <input class="field" type="text" name="username" placeholder="Username" required>
                </div>

                <div class="form-field">
                    <input class="field" type="password" name="password" placeholder="Password" required>
                </div>

                <div class="form-field">
                    <input  class="btn btn-red" type="submit" value="Sign In" required>
                    <input type="hidden" name="csrf_token" value="<?=Token::generate()?>">
                </div>
            </form>

            <footer class="txt-center">
                &copy; CodeMax Technology
            </footer>
        </body>
    </html>
