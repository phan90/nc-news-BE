const { Users } = require('../models')

const getUserProfile = (req, res, next) => {
    Users.findOne(req.params)
    .then(user => {
        if (user === null) next({ status: 404 })
        else res.send({user})
    })
    .catch(next)
}
module.exports = {
    getUserProfile
}