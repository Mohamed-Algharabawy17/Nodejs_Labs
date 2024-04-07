
const mongoose = require("mongoose");

let usersSchema = ({
    userName : String,
    age: Number,
    email: {type: String, pattern: "/^[\w-]+(?:\.[\w-]+)*@(?:[\w-]+\.)+[a-zA-Z]{2,7}$/"},
    address: String,
    password: String
})

module.exports = mongoose.model("users", usersSchema);
