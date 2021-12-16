const express = require('express')

const routes = require('./routes');

const cors = require('cors')

const mongoose = require("mongoose")

const session = require('express-session')
// const MongoDBStore = require('connect-mongodb-session')(session)

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

app.use(cors(coreOptions))

// app.set('trust proxy', 1)


// app.use(session({
//     secret: process.env.SECRET,
//     resave: false,
//     saveUninitialized: false,
//     store: new MongoDBStore({ 
//         uri: process.env.MONGODBURI,
//         collection: 'mySessions'
//     }),
//     cookie:{
//         sameSite: 'none',
//         secure: true
// }
// }))


// const isAuthenticated = (req, res, next) => {
//     if (req.session.currentUser) {
//         return next()
//     } else {
//         res.status(403).json({msg:"login required"})
//     }
// }

app.use(express.json())



app.get('/', (req, res) => {
    res.send('This is the working route.')
})


app.use('/memolist', routes.home)
app.use("/", require ("./routes/home"))
// app.use('/users', routes.users)


app.listen(PORT, (req, res) => {
    console.log(`Now listening on PORT ${PORT}`)
})