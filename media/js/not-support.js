$(function() {
    $(window).on('resize.DisableOnPhone', function() {
        if ($(window).width() < 768) {
            $('.not-support').show();
        } else {
            $('.not-support').hide();
        }
    });
});
