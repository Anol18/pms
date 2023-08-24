const express = require("express");
const route = express.Router();
const controller = require("../controller/detailBudget.controller");
route.get("/detailsbudget", controller.get);
route.post("/detailsbudget", controller.post);
route.delete("/detailsbudget/:id", controller.delete);
route.put("/detailsbudget/:id", controller.put);

module.exports = route;
