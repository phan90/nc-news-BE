const faker = require('faker/locale/en_GB');
const _ = require('lodash');

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


module.exports = { makeReferenceObject, updateArticleData, createComments};