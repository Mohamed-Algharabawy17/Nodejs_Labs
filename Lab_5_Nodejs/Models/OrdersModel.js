
const mongoose = require("mongoose");

const OredersSchema = new mongoose.Schema({
    totalPrice: Number,
    items: Array,
})


module.exports = mongoose.model("orders", OredersSchema);