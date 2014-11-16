$('[id^=edit-button]').on('click', function () {
    var btn = $(this),
        id = btn.attr('id'),
        regex = /edit-button-/,
        uuid = id.replace(regex, ''),
        divWithSegment = $('#lecture-text-div-' + uuid),

})