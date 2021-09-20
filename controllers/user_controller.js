const userService = require("../services/user_service")

class UserController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.register(email, password)
     
      res.cookie("refreshToken", userData.refreshToken, {maxAge: 8.64e+8, httpOnly:true})
      return res.json({id: userData.id, email: userData.email, activated: userData.activated})

    } catch (error) {
      res.sendStatus(500)
      console.error(error) 
    }
  }

  async login(req, res, next) {
    try {
    } catch (error) {}
  }

  async logout(req, res, next) {
    try {
    } catch (error) {}
  }
  async allUsers(req, res, next) {
    try {
      res.json([123, 123123123, 234535, "Mike"])
    } catch (error) {}
  }
}

module.exports = new UserController()
