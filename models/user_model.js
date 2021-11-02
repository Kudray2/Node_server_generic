const { Schema, model } = require("mongoose")

const UserSchema = new Schema({
  id: String,
  email: { type: String, required: true },
  password: { type: String, required: true },
  activated: { type: Boolean, default: fasle },
  activationURL: { type: String },
})

module.exports = model("User", UserSchema)
