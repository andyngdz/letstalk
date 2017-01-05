$(function() {
    var Giphy = {
        initialize: function(options) {
            var that = this;
            $(document).on('keypress', '.search-giphy', this.stopReturn).bind(that);
            $(document).on('keyup', '.search-giphy', this.loadGifs).bind(that);
        },
        refresh: function() {
            window.DC.$el.find('.giphy-results ul').empty();
            this.$('.search-giphy').val('').focus();
        },
        stopReturn: function(e) {
            if (e.keyCode === 13) {
                return false;
            }
        },
        loadGifs: _.debounce(function() {
            var that = this;
            window.DC.$el = $('.popover-content').find('#lcb-giphy');
            var search = window.DC.$el.find('.search-giphy').val();

            $.get('https://api.giphy.com/v1/gifs/search', {
                    q: search,
                    rating: window.DC.$el.data('rating'),
                    limit: window.DC.$el.data('limit'),
                    api_key: window.DC.$el.data('apikey')
                })
                .done(function(result) {
                    var images = result.data.filter(function(entry) {
                        return entry.images.fixed_width.url;
                    }).map(function(entry) {
                        return entry.images.fixed_width.url;
                    });

                    window.DC.Giphy.appendGifs(images);
                });
        }, 400),
        appendGifs: function(images) {
            var eles = images.map(function(url) {
                var that = this;
                var $img = $('<img src="' + url +
                    '" alt="gif" data-dismiss="modal"/></li>');

                $img.click(function() {
                    var src = $(this).attr('src');
                    $('.lcb-entry-input:visible').val(src);
                    $('.lcb-entry-button:visible').click();
                    $('#giphy').click()
                });

                return $("<li>").append($img);
            }, this);

            var $div = window.DC.$el.find('.giphy-results ul');

            $div.empty();

            eles.forEach(function($ele) {
                $div.append($ele);
            });
        }
    };

    if(window.DC === undefined) window.DC = {};

    window.DC.Giphy = Giphy;
    window.DC.Giphy.initialize();
});
