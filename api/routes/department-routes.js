const express = require("express");
const { department } = require("../controller/index");
let routerDepartment = express.Router();

// routerUser.use(authentication)
routerDepartment.get("/getAll", department.getAllDept);
routerDepartment.post("/create", department.createDept);
routerDepartment.post("/update", department.updateDept);
routerDepartment.post("/delete", department.delete);

module.exports = routerDepartment;
