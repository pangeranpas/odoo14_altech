odoo.define('addons_pos.NumberBuffer', function(require) {
    'use strict';

    const { Component } = owl;
    const { EventBus } = owl.core;
    const { onMounted, onWillUnmount, useExternalListener } = owl.hooks;
    const { useListener } = require('web.custom_hooks');
    const { parse } = require('web.field_utils');
    const { BarcodeEvents } = require('barcodes.BarcodeEvents');
    const { _t } = require('web.core');
    const { Gui } = require('point_of_sale.Gui');

    // Updated INPUT_KEYS with new values for +10,000, +50,000, and +100,000
    const INPUT_KEYS = new Set(
        ['Delete', 'Backspace', '+10000', '+50000', '+100000'].concat('0123456789+-.,'.split(''))
    );
    const CONTROL_KEYS = new Set(['Enter', 'Esc']);
    const ALLOWED_KEYS = new Set([...INPUT_KEYS, ...CONTROL_KEYS]);
    const getDefaultConfig = () => ({
        decimalPoint: false,
        triggerAtEnter: false,
        triggerAtEsc: false,
        triggerAtInput: false,
        nonKeyboardInputEvent: false,
        useWithBarcode: false,
    });

    class NumberBuffer extends EventBus {
        // Class implementation remains the same

        _updateBuffer(input) {
            const isEmpty = val => val === '' || val === null;
            if (input === undefined || input === null) return;
            let isFirstInput = isEmpty(this.state.buffer);

            if (input === ',' || input === '.') {
                if (isFirstInput) {
                    this.state.buffer = '0' + this.decimalPoint;
                } else if (!this.state.buffer.length || this.state.buffer === '-') {
                    this.state.buffer += '0' + this.decimalPoint;
                } else if (this.state.buffer.indexOf(this.decimalPoint) < 0) {
                    this.state.buffer = this.state.buffer + this.decimalPoint;
                }
            } else if (input === 'Delete') {
                if (this.isReset) {
                    this.state.buffer = '';
                    this.isReset = false;
                    return;
                }
                this.state.buffer = isEmpty(this.state.buffer) ? null : '';
            } else if (input === 'Backspace') {
                if (this.isReset) {
                    this.state.buffer = '';
                    this.isReset = false;
                    return;
                }
                const buffer = this.state.buffer;
                if (isEmpty(buffer)) {
                    this.state.buffer = null;
                } else {
                    const nCharToRemove = buffer[buffer.length - 1] === this.decimalPoint ? 2 : 1;
                    this.state.buffer = buffer.substring(0, buffer.length - nCharToRemove);
                }
            } else if (input === '+') {
                if (this.state.buffer[0] === '-') {
                    this.state.buffer = this.state.buffer.substring(1, this.state.buffer.length);
                }
            } else if (input === '-') {
                if (isFirstInput) {
                    this.state.buffer = '-0';
                } else if (this.state.buffer[0] === '-') {
                    this.state.buffer = this.state.buffer.substring(1, this.state.buffer.length);
                } else {
                    this.state.buffer = '-' + this.state.buffer;
                }
            } else if (input[0] === '+' && !isNaN(parseFloat(input))) {
                // Handle new input values like +10000, +50000, +100000
                const inputValue = parseFloat(input.slice(1));
                const currentBufferValue = this.state.buffer ? parseFloat(this.state.buffer) : 0;
                this.state.buffer = this.component.env.pos.formatFixed(
                    inputValue + currentBufferValue
                );
            } else if (!isNaN(parseInt(input, 10))) {
                if (isFirstInput) {
                    this.state.buffer = '' + input;
                } else if (this.state.buffer.length > 12) {
                    Gui.playSound('bell');
                } else {
                    this.state.buffer += input;
                }
            }
            if (this.state.buffer === '-') {
                this.state.buffer = '';
            }
            this.isReset = false;

            this.trigger('buffer-update', this.state.buffer);
        }
    }

    return new NumberBuffer();
});
