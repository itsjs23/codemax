<br><br>
<div class="col m12 table-container">
    <div class="exams-list-heading">
        <?php if($exam_type === 'uploaded') { ?>
        <h5><?=ucfirst($exam_type)?> Question Papers</h5>
        <?php } else { ?>
        <h5><?=ucfirst($exam_type)?> Exam</h5>
        <?php } ?>
        Std: <?=$standard?>,
        Mdm: <?=$medium?>
    </div><br>
    <div class="section-wise-summary">
        <?php foreach($sections as $s): ?>
        <button class="btn btn-blue section-count-filter" data-section="<?=$s['sec']?>">
            <?=$s['sec']?>-<?=$s['total']?>
        </button>
        <?php endforeach; ?>
    </div>
    <table class="full-width">
        <tbody class="exams-list-body">
            <?php foreach($exams as $e): ?>
            <tr id="tr-<?=$e['exam_id']?>" data-section="<?=$e['sec']?>">
                <td>
                    <div>
                        <p>
                            <b>Exam:</b> <?=$e['exam']?>
                            <span class="float-right"><i class="ion-calendar"></i> <?=$e['date']?></span>
                        </p>
                        <p>
                            <b>Sub:</b> <?=$e['sub']?>
                        </p>
                        <p>
                            <b>Sec:</b> <?=$e['sec']?>, <b>Password:</b> <?=$e['pswd']?>
                            
                            <span class="float-right">
                                <?php if(strtotime($e['date']) < date('Y-m-d')): ?>
                                <button class="btn btn-red delete-exam-btn" data-delete-exam-id="<?=$e['exam_id']?>">
                                        <i class="ion-trash-a"></i>
                                </button>
                                <?php endif; ?>
                                <?php if($exam_type === 'Question Paper') { ?>
                                <a class="btn btn-green" target="_blank" href="<?=$e['uploaded_file_url']?>">
                                    <i class="ion-arrow-right-a"></i>
                                </a>
                                <?php } else { ?>
                                <a class="btn btn-green" href="<?=Link::build('create-exam/old-exam/' . $e['exam_id'])?>">
                                    <i class="ion-arrow-right-a"></i>
                                </a>
                                <?php } ?>
                            </span>
                        </p>
                    </div>
                </td>
            </tr>
            <?php endforeach; ?>
        </tbody>
    </table>
</div>
