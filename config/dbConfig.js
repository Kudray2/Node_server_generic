// Main setup
const DB_PORT = process.env.DB_PORT
const DB_NAME = process.env.DB_NAME
const DB_HOST = process.env.DB_HOST

const dbConnectURL = `mongodb://${DB_HOST}:${DB_PORT}/${DB_NAME}`

// specific options! Use it for older mongoose versions
// const options = {
// useNewUrlParser: true, // pretend Deprecation warning message
// useFindAndModify: false, // rescrict deprecated "useFindAndModify"
// useCreateIndex: true, // use "createIndex" instead of deprecated "ensureIndex"
// useUnifiedTopology: true, // makes possible to use new connection manager
// }

module.exports = {
  dbConnectURL,
}
