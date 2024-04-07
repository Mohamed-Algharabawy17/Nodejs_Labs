const ajvClass = require('ajv');
const ajv = new ajvClass();

let itemsSchema = {
    type: "object",
    properties: {
        Name: { type: "string", minLength: 3 },
        Price: { type: "integer", minimum: 10 },
        Description: { type: "string", minLength: 10 }
    },
    required: ["name", "price", "desc"],
    additionalProperties: false
};
module.exports = ajv.compile(itemsSchema);