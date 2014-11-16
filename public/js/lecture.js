$(document).ready(function() {

    $('[id^=edit-button]').on('click', function () {
        var btn = $(this),
            id = btn.attr('id'),
            regex = /edit-button-/,
            uuid = id.replace(regex, ''),
            segmentRow = $('#segment-' + uuid);

        segmentRow.addClass('row-edit');
    });

    $('[id^=save-button]').on('click', function () {
        var svBtn = $(this),
            id = svBtn.attr('id'),
            regex = /save-button-/,
            uuid = id.replace(regex, ''),
            segmentRow = $('#segment-' + uuid),
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
            segmentRow.removeClass('row-edit');
        })
        .fail(function (err) {
            console.log('sad face' + JSON.stringify(err));
        });
    });

});
