const mongoose = require('mongoose');
const { DB_URL, dataPath } = require('../config')
const { Users, Articles, Comments, Topics } = require('../models');
const { topicData, articleData, userData } = require(dataPath)
const faker = require('faker/locale/en_GB');
const _ = require('lodash');

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
        // .then(([topics, users, articles, comments]) => 
        // console.log(comments)
        // )
        .catch(console.log)
}

function makeReferenceObject(docs, data) {
    return data.reduce((acc, val, i) => {
        acc[val.title] = docs[i]._id;
        return acc
    }, {})
}

function updateArticleData(articleData, topicID, userID) {
    articleData.forEach(article => {
        article.belongs_to = topicID[article.topic.charAt(0).toUpperCase() + article.topic.slice(1)]
        // article.created_by = userID[Math.floor(Math.random() * userID.length)]._id
        article.created_by = userID[_.random(0, userID.length - 1)]._id
    })
    return articleData
}

function createComments(articles, users) {
    return Array.from({ length: _.random(1, 100) }, () => {
        return {
            body: faker.lorem.sentences(),
            belongs_to: _.sample(articles)._id,
            created_at: faker.date.recent().getTime(),
            votes: _.random(0, 10),
            created_by: _.sample(users)._id
        }
    })
}


module.exports = seedDB;