const mongoose = require('mongoose')

const memoSchema = new mongoose.Schema ({
    title: {type: String, required: true},
    date: {type: String, required: true},
    body: {type: String, required: true},
        }   
)

const Memo = mongoose.model('Memo', memoSchema)

module.exports = Memo