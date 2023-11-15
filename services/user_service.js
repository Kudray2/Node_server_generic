const UserModel = require("../models/user_model")
const crypter = require("bcrypt")
const { v4 } = require("uuid")
// declare how many times hash process has to be repeated
const saltRounds = 2
const tokenService = require("./token_service")
const MailService = require('./mail_service')


class UserService {
  async register(email, password) {
    try {
      const userToCheck = await UserModel.findOne({ email })
      if (userToCheck) {
        throw new InternalError("User with such emai already exist!")
      }
      const hashedPassword = await crypter.hash(password, saltRounds)
      // create user id
      let newUserId = v4()
      const activationURL = v4() 
      await MailService.activationURL(email, activationURL)
      // create and save user  in thr DB
      const user = await UserModel.create({
        email,
        password: hashedPassword,
        id: newUserId,
      })

      const newUserTokens = tokenService.calculateTokens({
        email: user.email,
        id: user.id,
        activated: user.activated,
      })
      tokenService.saveTokens(user.id, newUserTokens.refreshToken)

      return { ...newUserTokens, user }
    } catch (error) {
      console.error(error)
    }
  }
  async activate(acticationLink) {
    const user = await UserModel.findOne({ activationLink })
    if (!user) {
      throw new Error("Activation link problem!")
    }
    user.activated = true
    await user.save()
  }
 
  async login(email, rawPassword) {
    try{
    const userToCheck = await UserModel.findOne({ email })
    console.log(userToCheck)
    const hashedPassword = await crypter.compare(
      rawPassword,
      userToCheck.password
    )
    console.log("pass", hashedPassword)
    if (hashedPassword) {
      return userToCheck
    } else throw new InternalError("PassWord Problem")
    } catch (error) { 
      
    }
  }

  async allUsers() {
    try {
      const collectionToReturn = await UserModel.find({})
      return collectionToReturn
    } catch (error) {
      console.error(error)
    }
  }
}

module.exports = new UserService()
