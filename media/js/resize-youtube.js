$(function() {
    $(window).on('resize', function() {
        $('iframe[data-type="youtube"]').each(function(index) {
            var width = $('.lcb-messages').width();
            var height = width * (9 / 16);
            $(this).height(height);
            $(this).width(width);
        });
    });
});
