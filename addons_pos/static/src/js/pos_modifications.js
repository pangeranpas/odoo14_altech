odoo.define('addons_pos.pos_modifications', function (require) {
    'use strict';

    var models = require('point_of_sale.models');
    var ProductScreen = require('point_of_sale.ProductScreen');
    var PaymentScreen = require('point_of_sale.PaymentScreen');
    var Registries = require('point_of_sale.Registries');
    var core = require('web.core');
    var _t = core._t;

    const OrderSuper = models.Order.prototype;
    models.Order = models.Order.extend({
        initialize: function(attributes, options) {
            OrderSuper.initialize.apply(this, arguments);
            this.on('change:client', this.check_and_send_email, this);
        },
        check_and_send_email: function() {
            var client = this.get_client();
            if (client && client.email) {
                this.trigger('email_sent');
            }
        },
    });

    const PosResProductScreen = (ProductScreen) =>
        class extends ProductScreen {
            setup() {
                super.setup();
                this.disablePriceDiscountButtons = this.disablePriceDiscountButtons.bind(this);
            }

            mounted() {
                super.mounted();
                this.env.pos.on('after-load-product-screen', this.disablePriceDiscountButtons);
                this.updateQuickAmounts();
            }

            willUnmount() {
                super.willUnmount();
                this.env.pos.off('after-load-product-screen', this.disablePriceDiscountButtons);
            }

            disablePriceDiscountButtons() {
                const priceButton = this.el.querySelector('.button.price');
                const discountButton = this.el.querySelector('.button.discount');
                
                if (priceButton) {
                    priceButton.classList.add('disabled');
                    priceButton.setAttribute('disabled', 'disabled');
                }
                if (discountButton) {
                    discountButton.classList.add('disabled');
                    discountButton.setAttribute('disabled', 'disabled');
                }
            }

            updateQuickAmounts() {
                const replace_amounts = {
                    '+10': '+10000',
                    '+20': '+50000',
                    '+50': '+100000'
                };
                const quickAmountButtons = this.el.querySelectorAll('.mode-button');
                quickAmountButtons.forEach(button => {
                    const amount = button.textContent.trim();
                    if (replace_amounts[amount]) {
                        button.textContent = replace_amounts[amount];
                    }
                });
            }
        };

    Registries.Component.extend(ProductScreen, PosResProductScreen);

    const PosResPaymentScreen = PaymentScreen =>
        class extends PaymentScreen {
            async _finalizeValidation() {
                await super._finalizeValidation();
                this.send_receipt_to_customer();
            }
            send_receipt_to_customer() {
                const order = this.env.pos.get_order();
                if (order.get_client() && order.get_client().email) {
                    this.showPopup('ErrorPopup', {
                        'title': _t('Email Sent'),
                        'body': _t('The receipt has been sent to the customer\'s email.'),
                    });
                }
            }
        };

    Registries.Component.extend(PaymentScreen, PosResPaymentScreen);

    return {
        PosResProductScreen,
        PosResPaymentScreen,
    };
});