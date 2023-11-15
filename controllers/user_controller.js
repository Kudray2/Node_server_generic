const userService = require("../services/user_service")

class UserController {
  async register(req, res, next) {
    try {
      const { email, password } = req.body
      const userData = await userService.register(email, password)

      res.cookie("refreshToken", userData.refreshToken, {
        maxAge: 8.64e8,
        httpOnly: true,
      })
      return res.json({
        id: userData.id,
        email: userData.email,
        activated: userData.activated,
      })
    } catch (error) {
      res
        .send("Intenal server error! May be you are already here")
        .sendStatus(500)
      console.error(error)
    }
  }

  async activate(req, res, next) {
    try {
      const activationLink = req.params.link
      await userService.activate(activationLink)
    } catch (error) {}
  }

  async login(req, res, next) {
    try {
      const rawPassword = req.body.password
      const email = req.body.email
      const checkedUser = await userService.login(email, rawPassword)
      if (checkedUser) {
        return res.json(checkedUser).sendStatus(200)
      }
    } catch (error) {
      res.send("No user with such email")
    }
  }

  async logout(req, res, next) {
    try {
    } catch (error) {}
  }
  async allUsers(req, res, next) {
    try {
      const collectionToReturn = await userService.allUsers()
      res.json(collectionToReturn)
    } catch (error) {
      res.send("No users in DB").sendStatus(500)
    }
  }
}

module.exports = new UserController()
