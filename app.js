const express = require('express')
const app = express()
// plug the ENV variables support
require('dotenv').config()
// plug Mongoose lib
const mongoose = require('mongoose')
const cors = require('cors')
// plug advanced logger
const morgan = require('morgan')
const path = require('path')
// import MongoDB connection script
const dbConnect = require('./dbConnect')
// plug cookie support
const cookieParser = require('cookie-parser')
const router = require('./routes/rootRouter')
const PORT = process.env.PORT

app.use(cors())
app.use(express.urlencoded({extended:true}))
app.use (express.json())
app.use(cookieParser())
app.use('/api', router)
// app.get('/api', (req,res) => res.json(["Test answer: ", 1,23,44,5]) )

app.use(morgan('dev'))
dbConnect()
app.listen(PORT, () => {
  console.log("server started on port:", PORT || 3008)
})
