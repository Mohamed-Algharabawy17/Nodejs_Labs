const express = require("express");
const route = express.Router();
const itemsController = require("../Controllers/ItemsController")

route.get("/", itemsController.getAllItems)
route.get("/:id", itemsController.getItemByID)
route.post("/", itemsController.createNewItem)
route.put("/:id", itemsController.updateItemByID)
route.delete("/:id", itemsController.deleteItemByID)


module.exports = route;