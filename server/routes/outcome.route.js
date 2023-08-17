const express = require("express");
const route = express.Router();
const controller = require("../controller/outcome.controller");
route.get("/outcome", controller.get);
route.post("/outcome", controller.post);
route.delete("/outcome/:id", controller.delete);
route.put("/outcome/:id", controller.put);

module.exports = route;
