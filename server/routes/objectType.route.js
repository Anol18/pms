const express = require("express");
const route = express.Router();
const controller = require("../controller/objectType.controller");
route.get("/objecttype", controller.get);
route.post("/objecttype", controller.post);
route.delete("/objecttype/:id", controller.delete);
route.put("/objecttype/:id", controller.put);

module.exports = route;
