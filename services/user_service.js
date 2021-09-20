const UserModel = require("../models/user_model")
const crypter = require("bcrypt")
const {v4} = require('uuid')
// declare how many times hash process has to be repeated
const saltRounds = 2
const tokenService = require("./token_service")

class UserService {
  async register(email, password) {
    try {
      const userToCheck = await UserModel.findOne({ email })
      if (userToCheck) {
         throw new Error("User with such emai already exist!")
      }
      const hashedPassword = await crypter.hash(password, saltRounds)
      // create user id
      let newUserId = v4()
      // create and save user
      const user = await UserModel.create({ email, password: hashedPassword, id: newUserId})
      const newUserTokens = tokenService.calculateTokens({
        email: user.email,
        id: user.id,
        activated: user.activated
      })
      tokenService.saveTokens(user.id, newUserTokens.refreshToken)

      return {...newUserTokens, user}

    } catch (error) {
      console.error(error)
    }
  }

  async login(email, rawPassword) {
    return null
  }
}

module.exports = new UserService()
