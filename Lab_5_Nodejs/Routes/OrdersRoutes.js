const express = require("express");
const route = express.Router();
const orderController = require("../Controllers/OrdersController")

route.get("/", orderController.getAllorders)
route.get("/:id", orderController.getorderByID)
route.post("/", orderController.createNeworder)
route.put("/:id", orderController.updateorderByID)
route.delete("/:id", orderController.deleteorderByID)


module.exports = route;