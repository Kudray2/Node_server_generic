const jwt = require("jsonwebtoken")
const TokenModel = require("../models/token_model")

class TokenService {
  // function for init tokens
  calculateTokens(data) {
    const accessToken = jwt.sign(data, process.env.JWT_ACCES_KEY, {
      expiresIn: "40m",
    })
    const refreshToken = jwt.sign(data, process.env.JWT_REFRESH_KEY, {
      expiresIn: "10d",
    })
    return {
      accessToken,
      refreshToken,
    }
  }
  // function for check save tokens to the DB || create new DB document
  async saveTokens(userID, refreshToken) {
    let token = ""
    const tokenPayload = await TokenModel.findOne({ id: userID })
    if (tokenPayload) {
      token = refreshToken
    }

    token = await TokenModel.create({ id: userID, refreshToken })
    return token
  }
}

module.exports = new TokenService()
