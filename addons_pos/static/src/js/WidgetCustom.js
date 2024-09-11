odoo.define('addons_pos.WidgetCustom', function (require) {
    "use strict";

    var FieldChar = require('web.basic_fields').FieldChar;

    FieldChar.include({
        events: _.extend({}, FieldChar.prototype.events, {
            'focus': '_onFocusChangeColor',
        }),

        _onFocusChangeColor: function () {
            this.$el.css('background-color', 'yellow');
        },

        _renderEdit: function () {
            this._super();
            // Auto-focus the field when the form is loaded
            this.$el.focus();
        },
    });
});
