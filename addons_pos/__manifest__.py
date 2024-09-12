{
    'name': 'Addon POS',
    'version': '14.0.1.0.0',
    'summary': 'Module untuk POS',
    'description': 'Addon test teknikal',
    'author': 'Pangeran Christian',
    'website': 'pangeran.ian@gmail.com',
    'depends': ['web','point_of_sale','mail'],
    'data': [
        'views/NumpadWidget.xml',
        'data/email_templates.xml',
        'views/pos_templates.xml',
    ],
    'qweb': [
        'static/src/xml/pos_modifications.xml',
        ],
    'assets': {
        'point_of_sale.assets': [
            'addons_pos/static/src/js/NumpadWidget.js',
            'addons_pos/static/src/js/pos_modifications.js',
        ],
    },
    'installable': True,
    'application': False,
}