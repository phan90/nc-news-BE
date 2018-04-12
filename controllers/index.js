const {
    getAllTopics, 
    getAllArticlesByTopic, 
    addNewArticleToTopic
} = require('./topics')

const {
    getAllArticles, 
    getAllCommentsForArticle,
    addNewCommentToArticle, 
    updateVotes
} = require('./articles')

const {
    updateCommentCount, 
    deleteComment
} = require('./comments')

const {
    getUserProfile
} = require('./users')

module.exports = {
    getAllTopics, 
    getAllArticlesByTopic, 
    addNewArticleToTopic, 
    getAllArticles, 
    getAllCommentsForArticle, 
    addNewCommentToArticle, 
    updateVotes, 
    updateCommentCount, 
    deleteComment, 
    getUserProfile
}