<!--
    Custom style for this page. Felling too lazy to put it
    in its own css file.
-->
<style>
    .padder{
        padding-top: 3rem;
    }
    #home {
        border-top: 1px solid;
    }
    #home a i {
        display: inline-block;
        height: 50px;
        width: 50px;
        line-height: 50px;
        font-size: 3rem;
        border: 1px solid rgba(158, 158, 158, 0.33);
        border-radius: 0;
        border-bottom-left-radius: 10px;
        border-top-right-radius: 10px;
        margin-bottom: 2rem;
        color: #fff;
    }
    #home a:hover i {
        color: #fff;
    }
    #home a i:hover {
        font-size: 3rem;
    }
    #home a {
        text-decoration: none;
        color: rgb(0, 0, 0);
        font-size: 1.5rem;
        font-variant: normal;
    }
    .bg-col-1 { background-color: #5592f5 }
    .bg-col-2 { background-color: #ea4335 }
    .bg-col-3 { background-color: #34a853 }
    .bg-col-4 { background-color: #fbbc05 }
    .bg-col-5 { background-color: #b01d5e }
    .bg-col-6 { background-color: #495ab9 }
    .bg-col-7 { background-color: #607D8B }
    .bg-col-8 { background-color: #cd5c5c }
    .bg-col-9 { background-color: #4CAF50 }
    .bg-col-10 { background-color: #cd5c5c }
    .bg-col-11 { background-color: #909090 }
    .bg-col-12 { background-color: #2196F3 }
</style>


<div id="home" class="row">
    <div class="padder">&nbsp;</div>

     <div class="col m6 t4 l3">
        <a href="<?= Link::build('create-quiz') ?>">
            <i class="ion-android-create bg-col-8"></i><br>
            Create Quiz
        </a>
    </div>


    
</div>
