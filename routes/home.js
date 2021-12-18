const express = require('express')
const { MemoryStore } = require('express-session')
const router = express.Router()
const Memo = require("../models/Memo")





// router.get('/', ctrls.home.index)
// router.post('/', ctrls.home.create)
// router.put('/:id', ctrls.home.update)
// router.delete('/:id', ctrls.home.destroy)

router.route("/newmemo").post((req, res) => {
    const title = req.body.title
    const body = req.body.body
    const createdOn = req.body.createdOn
    const newMemo = new Memo({
        title,
        body,
        createdOn
    })
    newMemo.save()

})

router.route("/memos").get((req, res) => {
    Memo.find()
        .then(foundMemos => res.json(foundMemos))
})

router.delete('/delete/:id', (req, res) => {
    const id= req.params.id

    Memo.findByIdAndDelete({_id: id}, (req, res, err) => {
        if(!err) {
            console.log("Memo deleted")
        }else {
            console.log(err)
        }
    })
})

router.put('/update/:id', (req, res) => {
    const id= req.params.id
    const updateMemo = {
        title: req.body.title,
        body: req.body.body,
        createdOn: req.body.createdOn
    }
    Memo.findByIdAndUpdate({_id: id}, {$set: updateMemo}, (req, res, err) => {
        if(!err) {
            console.log("Memo updated")
        } else {
            console.log(err)
        }
    })
})

module.exports = router