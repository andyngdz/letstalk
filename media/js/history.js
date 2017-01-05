$(function() {
    var that = this;
    $(document).on('keypress', '.search-history', function(e) {
        if (e.which === 13) {
            that.roomId = $('.lcb-tabs').find('.selected').data('id'),
                that.query = $(e.currentTarget).val(),
                that.searchResultsEl = $(e.currentTarget).find('.');
            $.get('./messages', {
                room: that.roomId,
                query: that.query,
                expand: 'owner',
                reverse: false,
                take: 5000,
                datatype: 'json'
            }).then(function(messages) {

            });
        }
    });
});
