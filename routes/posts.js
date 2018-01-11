const router = require('express').Router()

router.param('postId', (req, res, next, value) => {
    const post = req.store.posts[value]
    if(post) {
        req.postModel = post
        next()
    } else {
        res.status(404).send("post not found")
    }
})

router.get('/', (req, res) => {
    return res.status(200).send(req.store.posts || [])
})

router.post('/', (req, res) =>  {
    let newPost = req.body
    let id = req.store.posts.length
    req.store.posts.push(newPost)
    res.status(201).send({id:id})
})

router.put('/:postId', (req, res) => {
    Object.assign(req.postModel, req.body)
    res.status(200).send(req.postModel)
}) 

router.delete('/:postId', (req, res) => {
    req.store.posts.splice(req.params.postId, 1)
    return res.status(200).end()
})

router.use('/:postId/comments', require('./comments'))

module.exports = router