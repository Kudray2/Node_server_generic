const Router = require("express").Router
const userController = require("../controllers/user_controller")
const router = new Router()


router.post("/register", userController.register)
router.post("/api/login")
router.post("/api/logout")
// router.get('/api/activate/:link')
router.get("/api/refresh")
router.get("/allusers", userController.allUsers)

module.exports = router
