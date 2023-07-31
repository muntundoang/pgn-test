const express = require("express");
const { user, auth } = require('../controller/index')
let routerUser = express.Router();

// routerUser.use(authentication)
routerUser.get("/", (req, res) => {
  res.send("ini user");
});
routerUser.post('/register', user.add)
routerUser.post('/login', user.login)
routerUser.post('/absen', user.absen)
routerUser.post('/delete', user.delete)
routerUser.post('/update', user.update)
routerUser.get('/userInfo', user.getUser)
routerUser.get('/getall', user.getAllUser)


// routerUser.post('/auth', userController.authentication)

module.exports = routerUser;