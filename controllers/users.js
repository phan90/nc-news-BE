const { Users } = require('../models')

const getUserProfile = (req, res, next) => {
    Users.findOne(req.params)
        .then(user => {
            if (user === null) next({ status: 404, message: `${req.params.username} does not exist, please try again` })
            else res.send({ user })
        })
        .catch(next)
}
module.exports = {
    getUserProfile
}