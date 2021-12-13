const mongoose = require('mongoose')

const memoSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    createdOn: {type: String, default: new Date().toJSON().slice(0,10)},
        body: {type: String, required: true},
        })

const Memo = mongoose.model('Memo', memoSchema)

module.exports = Memo