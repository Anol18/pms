const express = require("express");
const route = express.Router();
const controller = require("../controller/activityType.controller");
route.get("/activitytype", controller.get);
route.post("/activitytype", controller.post);
route.delete("/activitytype/:id", controller.delete);
route.put("/activitytype/:id", controller.put);

module.exports = route;
