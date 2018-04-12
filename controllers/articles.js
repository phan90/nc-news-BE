const { Articles, Comments, Users } = require('../models')

const getAllArticles = (req, res, next) => {
    Articles.find()
        .populate({ path: 'belongs_to', select: 'title -_id' })
        .populate({ path: 'created_by', select: { '_id': 0, '__v':0 }})
        .lean()
        .then(articles => {
            return Promise.all([articles, Comments.find().lean()])
        })
        .then(([articles, comments]) => {
            const commentcount = comments.reduce((acc, comment) => {
                acc[comment.belongs_to] = (acc[comment.belongs_to] || 0) + 1;
                return acc
            }, {})
            // const articlesWithCount = articles.map((article, i) => {
            //     return { comment_count: commentcount[article._id] || 0, ...article}
            // })
            articles.forEach(article => {
                article.commment_count = commentcount[article._id]||0;
            })
            res.send({ articles: articles})
        })
        .catch(next)
}

const getAllCommentsForArticle = (req, res, next) => {
    const { article_id } = req.params
    Comments.find({ belongs_to: article_id })
        .populate({
            path: 'belongs_to',
            select: { '_id': 0, 'title': 1 },
            populate: { path: 'belongs_to', model: 'topics', select: { '_id': 0, 'title': 1 } }
        })
        .populate({ path: 'created_by', select: { '_id': 0, '__v': 0 } })
        .then(comments => {
            if (comments.length === 0) next({ status: 404 })
            else res.send(comments)
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 400 })
            else next(err)
        })
}

const addNewCommentToArticle = (req, res, next) => {
    const { comment, votes } = req.body
    const { article_id } = req.params
    let newComment = { votes }
    newComment.body = comment
    newComment.belongs_to = article_id
    Users.findOne()
        .then(users => {
            newComment.created_by = users._id
            return new Comments(newComment).save()
        })
        .then(comment => {
            res.status(201).send(comment)
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 400 })
            else if (err.name === 'ValidationError') next({ status: 400 })
            else next(err)
        })
}

const updateVotes = (req, res, next) => {
    const { article_id } = req.params
    const { vote } = req.query
    const num = vote === 'up' ? 1 : vote === 'down' ? -1 : 0;
    Articles.findByIdAndUpdate(article_id, { $inc: { votes: num } }, { new: true })
        .then(updatedVotes => {
            if (updatedVotes === null) next({ status: 404 })
            else res.send(updatedVotes)
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 400 })
            else next(err)
        })
}

module.exports = {
    getAllArticles,
    getAllCommentsForArticle,
    addNewCommentToArticle,
    updateVotes
}