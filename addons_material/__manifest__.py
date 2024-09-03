{
    'name': 'Addon Material',
    'version': '14.0.1.0.0',
    'summary': 'Module untuk manage material dan supplier',
    'description': 'Addon test teknikal',
    'author': 'Pangeran Christian',
    'website': 'pangeran.ian@gmail.com',
    'category': 'Inventory',
    'depends': ['base'],
    'data': [
        'security/ir.model.access.csv',
        'views/material_views.xml',
        'views/menu.xml',
        'views/res_partner_views.xml',
    ],
    'test': [
        'tests/test_material.py',
    ],
    'installable': True,
    'application': True,
}