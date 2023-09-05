const express = require("express");
const route = express.Router();
const controller = require("../controller/particular.controller");
route.get("/particular", controller.get);
route.post("/particular", controller.post);
route.delete("/particular/:id", controller.delete);
route.put("/particular/:id", controller.put);
module.exports = route;
