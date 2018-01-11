const router = require('express').Router({mergeParams: true})

router.param('commentId', (req, res, next, value) => {
    let comment = req.postModel.comments[value]

    if(comment) {
        req.commentModel = comment
        next()
    } else {
        res.status(404).send('comment not found')
    }
})

router.get('/', (req, res) => {
    res.status(200).send(req.postModel.comments || [])
})

router.post('/', (req, res) => {
    let comments = req.postModel.comments
    let newComment = req.body
    let id = comments.length
    comments.push(newComment)
    res.status(201).send({id:id})
})

router.put('/:commentId', (req, res) => {
    Object.assign(req.commentModel, req.body)
    res.status(200).send(req.commentModel)
})

router.delete('/:commentId', (req, res) => {
    req.postModel.comments.splice(req.params.commentId, 1)
    res.status(200).end()
})

module.exports = router