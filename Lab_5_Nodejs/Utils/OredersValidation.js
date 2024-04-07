const ajvClass = require('ajv');
const ajv = new ajvClass();


const orderSchema = {
    type: 'object',
    properties: {
        totalPrice: { type: 'number' },
        items: {
            type: 'array',
            items: { type: 'number' }
        }
    },
    required: ['totalPrice', 'items'],
    additionalProperties: false
};

module.exports = ajv.compile(orderSchema);