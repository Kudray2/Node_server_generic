const { Schema, model } = require("mongoose")


const UserSchema = new Schema({
  id: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  
  // now it is "true" by default, later email verification will be used
  activated: { type: Boolean, default: true },
  
  // at this version it stays empty
  activationURL: { type: String },
})

module.exports = model("User", UserSchema)
