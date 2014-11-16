$(document).ready(function() {

    $('[id^=edit-button]').on('click', function () {
        var btn = $(this),
            id = btn.attr('id'),
            regex = /edit-button-/,
            uuid = id.replace(regex, ''),
            segmentRow = $('#segment-' + uuid),
            divWithSegment = $('#lecture-text-div-' + uuid),
            text = divWithSegment.text();
        $('#save-button-' + uuid).prop('disabled');

        divWithSegment.parent().after('<div class="row"><div class="col-md-2"></div><div class="col-md-8"><textarea id="lecture-edit-' + uuid + '">' + text + '</textarea></div></div>');
        // segmentRow.after('<div class="row" id="edit-row-' + uuid '"><div class="col-md-8-offset-2"><textarea id="lecture-edit-' + uuid + '">' + text + '</textarea></div></div>');

    });

    $('[id^=save-button]').on('click', function () {
        var svBtn = $(this),
            id = svBtn.attr('id'),
            regex = /save-button-/,
            uuid = id.replace(regex, ''),
            timestamp = $('#lecture-timestamp-' + uuid).text(),
            editBox = $('#lecture-edit-' + uuid),
            newText = editBox.val(),
            textDisplay = $('#lecture-text-div-' + uuid);

        $.ajax({
            type: "POST",
            url: '/scribe/lectures/'+uuid,
            data: {
                timestamp: timestamp,
                newText: newText
            },
        })
        .done(function (sum) {
            textDisplay.text(newText);
            editBox.parent().parent().remove();
        })
        .fail(function (err) {
            console.log('sad face' + JSON.stringify(err));
        });
    });

});
