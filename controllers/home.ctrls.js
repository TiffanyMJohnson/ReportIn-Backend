const db = require('../models')


const index = (req, res) => {
    db.Memo.find({}, (error, memos) => {
        if (error) return res.status(400).json({ error: error.message })
        res.status(200).json(tasks)
    })

}


//create
const create = (req, res) => {
    db.Memo.create(req.body, (error, createdMemo) => {
        if(error) return res.status(400).json({ error: error.message })

        return res.status(201).json(createdTask)
    })

}


// update
const update = (req, res) => {
    console.log(req.body)
    db.Memo.findByIdAndUpdate(
        req.params.id,
        req.body,
        {
            new: true,
        },
        (error, updatedMemo) => {
            if (error) return res.status(400).json({ error: error.message })

            return res.status(200).json(updatedMemo)

        
        }
    )
}



// delete
const destroy = (req, res) => {
    db.Memo.findByIdAndDelete(req.params.id, (error, deletedMemo) => {
        if (error) return res.status(400).json({ error: error.message })
        return res.status(200).json({
            message:`Memo deleted successfully.`
        })
    })}





module.exports = {
    index,
    create,
    update,
    destroy,
}