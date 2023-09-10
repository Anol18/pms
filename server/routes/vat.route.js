const express = require("express");
const route = express.Router();
const controller = require("../controller/vat.controller");
route.get("/vat", controller.get);
route.post("/vat", controller.post);
route.delete("/vat/:id", controller.delete);
route.put("/vat/:id", controller.put);

module.exports = route;
