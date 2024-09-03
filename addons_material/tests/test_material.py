from odoo.tests.common import TransactionCase
from odoo.exceptions import ValidationError

class TestMaterial(TransactionCase):

    def setUp(self):
        super(TestMaterial, self).setUp()
        self.Material = self.env['material']
        self.Supplier = self.env['res.partner']

    def test_material_creation(self):
        """Test the creation of a material record."""
        supplier = self.Supplier.create({'name': 'Supplier 1'})
        material = self.Material.create({
            'code': 'MAT001',
            'name': 'Test Material',
            'type': 'fabric',
            'buy_price': 150,
            'supplier_id': supplier.id,
        })
        # Verify that the material record was created correctly
        self.assertEqual(material.code, 'MAT001')
        self.assertEqual(material.name, 'Test Material')
        self.assertEqual(material.type, 'fabric')
        self.assertEqual(material.buy_price, 150)
        self.assertEqual(material.supplier_id.id, supplier.id)
        print('Your test was succesfull!')  # Compare IDs, not objects

    def test_invalid_buy_price(self):
        """Test that creating a material with a buy price less than 100 raises a ValidationError."""
        supplier = self.Supplier.create({'name': 'Supplier 1'})
        with self.assertRaises(ValidationError):
            self.Material.create({
                'code': 'MAT002',
                'name': 'Test Material 2',
                'type': 'jeans',
                'buy_price': 90,  # Less than 100, should raise error
                'supplier_id': supplier.id,
            })
        print('Your test was succesfull!')