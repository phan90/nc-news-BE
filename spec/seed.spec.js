process.env.NODE_ENV = 'test';
const app = require('../app');
const seedDB = require('../seed/seed')
const { topicData, articleData, userData } = require('../seed/testData')
const { Users, Articles, Comments, Topics } = require('../models')
const { expect } = require('chai')
const mongoose = require('mongoose')

describe('seeds', () => {
    let topics, articles, users;
    beforeEach(() => {
        return seedDB(topicData, articleData, userData)
            .then(docs => {
                [topics, users, articles, comments] = docs
            });
    });
    after(() => {
        return mongoose.disconnect()
    });
    describe('topics', () => {
        it('seeds topics', () => {
            return Topics.count().then(topicCount => {
                expect(topicCount).to.be.a('number')
                expect(topicCount).to.not.equal(0);
            });
        });
        it('has something at a specific ID', () => {
            const [mitch] = topics;
            return Topics.findById(mitch._id).then(mitch => {
                expect(mitch.title).to.equal('Mitch')
            });
        });
    });
    describe('articles', () => {
        it('seeds articles', () => {
            return Articles.count().then(articleCount => {
                expect(articleCount).to.be.a('number')
                expect(articleCount).to.not.equal(0);
            });
        });
        it('has something at a specific ID', () => {
            const [firstArticle] = articles;
            return Articles.findById(firstArticle._id).then(article => {
                expect(article.title).to.equal('Living in the shadow of a great man')
            });
        });
    });
    describe('users', () => {
        it('seeds users', () => {
            return Users.count().then(userCount => {
                expect(userCount).to.be.a('number')
                expect(userCount).to.not.equal(0);
            });
        });
        it('has something at a specific ID', () => {
            const [firstUser] = users;
            return Users.findById(firstUser._id).then(user => {
                expect(user.name).to.equal('jonny')
            });
        });
    });
    describe('comments', () => {
        it('seeds comments', () => {
            return Comments.count().then(commentCount => {
                expect(commentCount).to.be.a('number');
                expect(commentCount).to.not.equal(0)
            });
        });
    });
})