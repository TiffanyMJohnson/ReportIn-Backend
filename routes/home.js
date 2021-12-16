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

module.exports = router