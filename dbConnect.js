const mongoose = require("mongoose")
const { dbConnectURL } = require("./config/dbConfig")

function dbConnect() {
  mongoose.connect(dbConnectURL, (error) => {
    error
      ? console.error("Mondo DB is offline", error)
      : console.log("Mongo DB is online")
  })
}

module.exports = dbConnect
