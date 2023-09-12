const express = require("express");
const route = express.Router();
const controller = require("../controller/activityWisePip.controller");
route.get("/activitywisepip", controller.get);
route.post("/activitywisepip", controller.post);
route.delete("/activitywisepip/:id", controller.delete);
route.put("/activitywisepip/:id", controller.put);

module.exports = route;
