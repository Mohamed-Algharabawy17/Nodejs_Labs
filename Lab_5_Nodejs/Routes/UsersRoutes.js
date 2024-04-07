const express = require("express");
const route = express.Router();

const usersController = require("../Controllers/UsersController");

route.get("/", usersController.getAllUsers);
route.put("/:email", usersController.updateUser);
route.delete("/:email", usersController.deleteUser);

route.post("/signup", usersController.Register);
route.post("/login", usersController.Login);


module.exports = route;
