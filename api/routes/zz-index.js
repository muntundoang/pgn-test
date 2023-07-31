const router = require('express').Router()
const routerUser = require('./user-routes')
const routerAuth = require('./auth-routes')
const routerSpending = require('./spending-routes')
const routerDepartment = require('./department-routes')

router.use('/user', routerUser)
router.use('/auth', routerAuth)
router.use('/spending', routerSpending)
router.use('/department', routerDepartment)

router.get("/", (req, res) => {
    res.send('ini home')
})

module.exports = router