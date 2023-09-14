const express = require("express");
const route = express.Router();
const controller = require("../controller/activityTotal.controller");
route.get("/activitytotal", controller.get);
route.post("/activitytotal", controller.post);
route.delete("/activitytotal/:id", controller.delete);
route.put("/activitytotal/:id", controller.put);

module.exports = route;
