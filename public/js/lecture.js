$('[id^=edit-button]').on('click', function () {
    var btn = $(this),
        id = btn.attr('id'),
        regex = /edit-button-/,
        uuid = id.replace(regex, ''),
        divWithSegment = $('#lecture-text-div-' + uuid),
        text = divWithSegment.text();
    $('#save-button-' + uuid).prop('disabled').prop('hidden');

    divWithSegment.after('<textarea id="lecture-edit-' + uuid + '">' + text + "</textarea>");

});

$('[id^=save-button]').on('click', function () {
    var svBtn = $(this),
        id = btn.attr('id'),
        regex = /save-button-/,
        uuid = id.replace(regex, ''),
        timestamp = $('#lecture-timestamp-' + uuid),
        newText = $('#lecture-edit-' + uuid).val();

    $.ajax({
        type: "POST",
        url: '/scribe/lecture/'+uuid,
        data: {
            timestamp: timestamp,
            newText: newText
        },
    })
    .done(function (sum) {
        console.log('success' + JSON.stringify(sum));
    })
    .fail(function (err) {
        console.log('sad face' + JSON.stringify(err));
    });
})