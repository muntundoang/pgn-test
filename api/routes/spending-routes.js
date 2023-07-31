const express = require("express");
const { spending } = require("../controller/index");
let routerSpending = express.Router();

// routerUser.use(authentication)
routerSpending.get("/getAll", spending.getAllSpend);
routerSpending.post("/create", spending.createSpend);
routerSpending.post("/update", spending.updateSpend);
routerSpending.post("/delete", spending.delete);

module.exports = routerSpending;
