const { Comments } = require('../models')

const updateCommentCount = (req, res, next) => {
    const { comment_id } = req.params
    const { vote } = req.query
    const num = vote === 'up' ? 1 : vote === 'down' ? -1 : 0;
    Comments.findByIdAndUpdate(comment_id, { $inc: { votes: num } }, { new: true })
        .then(updatedVotes => {
            res.send(updatedVotes)
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 400 })
            else next(err)
        })
}

const deleteComment = (req, res, next) => {
    const { comment_id } = req.params
    Comments.remove({ _id: comment_id })
        .then(deleted => {
            return Comments.find()
        })
        .then(comments => {
            res.send({ deletedComment: comment_id, comments: comments })
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 400 })
            else next(err)
        })

}

module.exports = {
    updateCommentCount,
    deleteComment
}
