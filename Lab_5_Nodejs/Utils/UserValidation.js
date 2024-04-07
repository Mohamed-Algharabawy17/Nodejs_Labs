const ajvClass = require('ajv');
const ajv = new ajvClass();

const userSchema = {
    type: 'object',
    properties: {
        userName: { type: 'string', minLength: 1 },
        age: { type: 'number', minimum: 0 },
        address: { type: 'string' },
        email: { type: 'string', pattern: '/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/' },
        password: { type: 'string', minLength: 8 },
    },
    required: ['userName', 'email', 'password'],
    additionalProperties: false
};

module.exports = ajv.compile(userSchema);