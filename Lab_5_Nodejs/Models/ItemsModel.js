
const mongoose = require("mongoose");

const itemsSchema = new mongoose.Schema({
    Name: { type: String, pattern: "^[a-zA-Z]+$", required: true },
    Price: { type: String, required: true },
    Description: { type: String, default: "No Description" }
})


module.exports = mongoose.model("Items", itemsSchema);