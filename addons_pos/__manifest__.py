{
    'name': 'Addon POS',
    'version': '14.0.1.0.0',
    'summary': 'Module untuk POS',
    'description': 'Addon test teknikal',
    'author': 'Pangeran Christian',
    'website': 'pangeran.ian@gmail.com',
    'depends': ['point_of_sale'],
    'data': [
        'views/NumpadWidget.xml',
        'views/NumberBuffer.xml',
    ],
    'assets': {
        'point_of_sale.assets': [
            'addons_pos/static/src/js/NumpadWidget.js',
            'addons_pos/static/src/js/NumberBuffer.js',
        ],
    },
    'installable': True,
    'application': False,
}