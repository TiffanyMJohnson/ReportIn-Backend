const express = require('express')
const router = express.Router()


const ctrls = require('../controllers')


router.get('/', ctrls.home.index)
router.post('/', ctrls.home.create)
router.put('/:id', ctrls.home.update)
router.delete('/:id', ctrls.home.destroy)


module.exports = router