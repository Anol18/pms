const express = require("express");
const route = express.Router();
const controller = require("../controller/budgetDescription.controller");
route.get("/budgetDescription", controller.get);
route.post("/budgetDescription", controller.post);
route.delete("/budgetDescription/:id", controller.delete);
route.put("/budgetDescription/:id", controller.put);
module.exports = route;
