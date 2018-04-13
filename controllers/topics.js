const { Topics, Articles, Users } = require('../models')

const getAllTopics = (req, res, next) => {
    Topics.find()
        .then(topics => {
            res.send({ topics })
        })
        .catch(next)
}

const getAllArticlesByTopic = (req, res, next) => {
    const { topic_id } = req.params
    Articles.find({ belongs_to: topic_id })
        .then(articles => {
            if (articles.length === 0) next({ status: 404 })
            res.send({ articles })
        })
        .catch(err => {
            if (err.name === 'CastError') next({ status: 400, message: `${topic_id} does not exist, please try again` })
            else next(err)
        })
}

const addNewArticleToTopic = (req, res, next) => {
    const { title, body, votes } = req.body
    const { topic_id } = req.params
    let article = { title, body, votes, belongs_to: topic_id };
    Users.findOne()
        .then(users => {
            article.created_by = users._id
            return new Articles(article).save()
        })
        .then(newArticle => {
            res.status(201).send(newArticle)
        })
        .catch(err => {
            if (err.name === 'ValidationError') next({ status: 400, message: `Error: either ${topic_id} does not exist or invalid comment, please try again` })
            else next(err)
        })
}

module.exports = {
    getAllTopics,
    getAllArticlesByTopic,
    addNewArticleToTopic
}