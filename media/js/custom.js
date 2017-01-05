$(function() {
    var isDebug = true;
    if (!isDebug) {
        window.console = function() {};
    }

    $(document).ready(function() {
        this.$document = $(document);
        console.info('Any <3 everyone!');
        // Will do when popover shown.
        var giphyAct = function() {
            $('.search-giphy').focus();
        };
        var actAfterPopoverShown = function(e) {
            var id = $(e.currentTarget).attr('id');
            switch (id) {
                case 'giphy':
                    giphyAct();
                    break;
            }
        };
        this.$document.on("contextmenu", function(e) {
            return false;
        });
        this.$document.on('input', 'textarea.lcb-entry-input', function(e) {
            this.textarea = $(this);
            this.scrollHeight = e.target.scrollHeight;
            this.lcbEntryFrm = $(e.target).closest('.lcb-entry');
            this.lengthVal = $(this).val().length;
            if (this.lcbEntryFrm && this.lcbEntryFrm.length > 0 && this.lengthVal > 0) {
                this.lcbEntryFrm.height(this.scrollHeight);
                this.textarea.height(this.scrollHeight);
            }
            if (this.lengthVal <= 0) {
                this.lcbEntryFrm.height(60);
                this.textarea.height(60);
            }
            // Remove style inline
            this.lcbEntryFrm.css('width', '');
            this.textarea.css('width', '');
        }).trigger('input');
        this.$document.on('click', '.close-list-users-online', function(e) {
            $('.lcb-room-toggle-sidebar').closest('.lcb-room').find('.lcb-room-toggle-sidebar').click();
        });
    });
    Handlebars.registerHelper('trimString', function(passedString, length) {
        var theString = passedString.substring(0, length);
        return new Handlebars.SafeString(theString);
    });
    Handlebars.registerHelper('randomColor', function() {
        return randomColor();
    });
    Handlebars.registerHelper('baseUrl', function() {
        return url.parse(req.originalUrl, true);
    });
    Handlebars.registerHelper('time', function() {
        return new Date(new Date().getTime()).toLocaleString();
    });
    Handlebars.registerHelper('tag', function() {
        return 'lets,chat,xmpp,nodejs,javascript,reactjs,html,css,technology,c';
    });
    Handlebars.registerHelper('facebookAdminID', function() {
        return '100003229800215';
    });

});
