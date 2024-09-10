odoo.define('addons_pos.delete_button', function (require) {

    "use strict";



    var ListController = require('web.ListController');



    ListController.include({

        renderButtons: function () {

            this._super.apply(this, arguments);

            if (this.$buttons) {

                this.$buttons.on('click', '.o_list_button_delete', this._onDeleteRecord.bind(this));

            }

        },

        _onDeleteRecord: function (event) {

            event.preventDefault();

            // Add your custom delete code here

            this._super.apply(this, arguments);

        },

    });

});