const express = require('express')
const router = express.Router()
const Memo = require("../models/Memo")





// router.get('/', ctrls.home.index)
// router.post('/', ctrls.home.create)
// router.put('/:id', ctrls.home.update)
// router.delete('/:id', ctrls.home.destroy)

router.route("/memoform").post((req, res) => {
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

router.route("/memoslist").get((req, res) => {
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

router.put('/put/:id', (req, res) => {
    const updatedMemo = {
        title: req.body.title,
        body: req.body.body,
        createdOn: req.body.createdOn
    }
    Memo.findByIdAndUpdate({_id: req.params.id}, {$set: updatedMemo}, (req, res, errr) => {
        if(!err) {
            console.log("Memo updated")
        } else {
            console.log(err)
        }
    })
})

module.exports = router