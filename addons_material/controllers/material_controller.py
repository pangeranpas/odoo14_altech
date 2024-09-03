from odoo import http
from odoo.http import request
import json

class MaterialController(http.Controller):

    @http.route('/materials', type='http', auth='public', methods=['GET'], csrf=False)
    def list_materials(self, **kwargs):
        materials = request.env['material'].search([])
        material_list = [{'code': m.code, 'name': m.name, 'type': m.type, 'buy_price': m.buy_price} for m in materials]
        return request.make_response(json.dumps({'materials': material_list}), headers=[('Content-Type', 'application/json')])
    
    @http.route('/materials/<int:id>', type='http', auth='public', methods=['POST'], csrf=False)
    def update_material(self, id, **kwargs):
        material = request.env['material'].browse(id)
        if material:
            data = json.loads(request.httprequest.data)
            material.write(data)
            response = {'status': 'success', 'message': 'Material updated'}
        else:
            response = {'status': 'error', 'message': 'Material not found'}
        return request.make_response(json.dumps(response), headers=[('Content-Type', 'application/json')])
    
    @http.route('/materials/<int:id>/delete', type='http', auth='public', methods=['POST'], csrf=False)
    def delete_material(self, id, **kwargs):
        material = request.env['material'].browse(id)
        if material:
            material.unlink()
            response = {'status': 'success', 'message': 'Material deleted'}
        else:
            response = {'status': 'error', 'message': 'Material not found'}
        return request.make_response(json.dumps(response), headers=[('Content-Type', 'application/json')])