<br><br>
<div class="col m12">
    <div class="exam-type-head">
        <b><?=ucfirst($exam_type)?> Exams</b>
        <select class="medium-filter float-right" data-exam-type="<?= $exam_type ?>">
            <option value="English" <?php if ($medium === 'English') { echo 'selected'; } ?>>
                &#9776; English
            </option>
            <option value="Hindi" <?php if ($medium === 'Hindi') { echo 'selected'; } ?>>
                &#9776; Hindi
            </option>
            <option value="Marathi" <?php if ($medium === 'Marathi') { echo 'selected'; } ?>>
                &#9776; Marathi
            </option>
        </select>
    </div>
</div>
<div class="col m12 exam-data-by-class">
    <table class="full-width">
        <tbody id="class-wise-exam-count-data">
<?php if (!count($classes)): ?>
                <tr>
                    <td colspan="2">No Exams</td>
                </tr>
            <?php endif; ?>    

<?php foreach ($classes as $class => $c): ?>
                <tr>
                    <td><?= $class ?></td>
                    <td class="txt-right">
                        <button class="btn <?= btnColor($c['passed'], $c['total']) ?>" 
                                data-btn-type="show-exams-list"
                                data-exam-type="<?=$exam_type?>"
                                data-medium="<?=$medium?>"
                                data-standard="<?=$class?>">
                            <?= $c['passed'] . '/' . $c['total'] ?>
                        </button>
                    </td>
                </tr>
<?php endforeach; ?>
        </tbody>
    </table>
</div>

<?php

function btnColor($passed, $total) {
    return ($passed < $total) ? 'btn-green' : 'btn-red';
}
?>