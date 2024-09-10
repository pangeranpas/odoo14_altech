from odoo import api, models

class PosOrder(models.Model):
    _inherit = 'pos.order'

    @api.model
    def create(self, vals):
        order = super(PosOrder, self).create(vals)
        if order.partner_id.email:
            template = self.env.ref('addons_pos.email_template_pos_receipt')
            if template:
                self.env['mail.template'].browse(template.id).send_mail(order.id, force_send=True)
                order.sudo().write({'note': 'Email sudah dikirim / Email sent'})
        
        return order
