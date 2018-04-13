const { Comments } = require('../models')

const updateCommentCount = (req, res, next) => {
    const { comment_id } = req.params
    const { vote } = req.query
    const num = vote === 'up' ? 1 : vote === 'down' ? -1 : 0;
    Comments.findByIdAndUpdate(comment_id, { $inc: { votes: num } }, { new: true })
        .then(updatedVotes => {
            if (!updatedVotes) next({ status: 404 })
            else res.send(updatedVotes)
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 400, message: `${comment_id} does not exist, please try again` })
            else next(err)
        })
}

const deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    Comments.findByIdAndRemove(comment_id)
        .then(deleted => {
            if (deleted === null) next({ status: 400, message: `${comment_id} does not exist, please try again` })
            else res.send({ message: `comment ${comment_id} successfully deleted` })
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 400, message: `${comment_id} does not exist, please try again` })
            else next(err)
        })
}

module.exports = {
    updateCommentCount,
    deleteComment
}
