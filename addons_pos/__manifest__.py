{
    'name': 'POS Custom',
    'version': '1.0',
    'category': 'Point of Sale',
    'summary': 'Customizations for POS',
    'description': 'Disable Price and Discount buttons in POS',
    'depends': ['point_of_sale'],
    'data': [],
    'qweb': [],
    'assets': {
        'point_of_sale.assets': [
            'addons_pos/static/src/js/pos_custom.js',
        ],
    },
    'installable': True,
    'auto_install': False,
}