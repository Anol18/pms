const express = require("express");
const route = express.Router();
const controller = require("../controller/activity.controller");
route.get("/activity", controller.get);
route.post("/activity", controller.post);
route.delete("/activity/:id", controller.delete);
route.put("/activity/:id", controller.put);

module.exports = route;
