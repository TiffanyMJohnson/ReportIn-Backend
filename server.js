const express = require('express')
const routes = require('./routes');
const cors = require('cors')
const mongoose = require("mongoose")
const bodyParser = require("body-parser")

const path= require("path")
require('dotenv').config()


mongoose.connect("mongodb+srv://tiffanyjohnson:avalynn2@seir-flex-622.fn8cm.mongodb.net/ReportIn")

const PORT = process.env.PORT || 3003

const app = express()

require('./config/db.connection')

const whitelist = ['http://localhost:3000', process.env.HEROKUFRONTURL]
const coreOptions = {
    origin: (origin, callback) => {
        if (whitelist.indexOf(origin) !== -1 || !origin) {
            callback(null, true)
        } else {
            callback(new Error('Not allowed by CORS'))
        }
    },
    credentials: true
}
app.use(bodyParser.json())
app.use(cors())
app.use(express.json())
app.use(express.urlencoded({extended: false}))



app.get('/', (req, res) => {
    res.send('This is the working route.')
})


// app.use('/memoslist', routes.home)
app.use('/newmemo', require("./routes/home"))
app.use('/memoslist', require("./routes/home"))
app.use('/delete/:id', require("./routes/home"))
app.use('/update/:id', require("./routes/home"))
app.use("/", require ("./routes/home"))
// app.use('/users', routes.users)


app.listen(PORT, (req, res) => {
    console.log(`Now listening on PORT ${PORT}`)
})