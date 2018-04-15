const mongoose = require('mongoose');
const { DB_URL, dataPath } = require('../config')
const { Users, Articles, Comments, Topics } = require('../models');
const { topicData, articleData, userData } = require(dataPath)
const { 
    makeReferenceObject,
    updateArticleData,
    createComments } = require('../utils')
    
mongoose.Promise = Promise;

function seedDB(topics, articles, users) {
    return mongoose.connection.dropDatabase()
        .then(() => {
            return Promise.all([
                Topics.insertMany(topics),
                Users.insertMany(users)
            ])
        })
        .then(([topicDocs, userDocs]) => {
            const topicID = makeReferenceObject(topicDocs, topicData)
            articles = updateArticleData(articles, topicID, userDocs)
            return Promise.all([topicDocs, userDocs, Articles.insertMany(articles)])
        })
        .then(([topics, users, articles]) => {
            const comments = createComments(articles, users)
            return Promise.all([topics, users, articles, Comments.insertMany(comments)])
        })
}

module.exports = seedDB;