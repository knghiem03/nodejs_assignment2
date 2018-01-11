module.exports = (req, res, next) => {
    req.store = require('./data')
    next()
}