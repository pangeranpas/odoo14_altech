odoo.define('addons_pos.form_input_focus_background', function(require) {
    const FieldChar = require('web.basic_fields').FieldChar;
    const FormView = require('web.FormView');

    FieldChar.include({
        events: _.extend({}, FieldChar.prototype.events, {
            'focus': '_onFocus',
        }),
        _onFocus: function() {
            this.$el.css('background-color', 'yellow');
        },
    });

    FormView.include({
        load_record: function(record) {
            this._super(record);
            this.$('input[type="text"]').first().focus();  // Automatically focus first text input
        }
    });
});