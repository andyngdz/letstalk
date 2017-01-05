$(function() {
    this.$document = $(document);
    this.$document.on('click', '[data-toggle="popover"]', function(e) {
        var target = $(e.target),
            targetId = target.data('href'),
            title = target.attr('title');
        if ($(target).data("bs.popover") === undefined) {
            $(target).popover({
                html: true,
                placement: 'top',
                content: function() {
                    return $(targetId)[0].outerHTML;
                }
            }).popover('show');
            $(target).on('shown.bs.popover', function(e) {
                actAfterPopoverShown(e);
            });
        }
    });
    this.$document.on('click', function(e) {
        if (!$(e.target).closest('.popover').length &&
            !($(e.target).data('toggle') === "popover")) {
            $('.popover').each(function() {
                $(this).prev().popover('hide');
            });
        }
    });
});
