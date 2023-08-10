const express = require("express");
const controller = require("../controller/projectController");
const route = express.Router();
route.post("/project", controller.post);
route.get("/project", controller.get);
route.put("/projects/:id", controller.put);
route.delete("/projects/:id", controller.delete);

module.exports = route;
