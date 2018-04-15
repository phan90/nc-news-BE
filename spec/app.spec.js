process.env.NODE_ENV = 'test';
const { expect } = require('chai');
const app = require('../app');
const request = require('supertest')(app);
const mongoose = require('mongoose');
const { dataPath } = require('../config')
const { topicData, articleData, userData } = require(dataPath)
const _ = require('lodash');
const seedDB = require('../seed/seed')

describe.only('/api', () => {
    let topics, articles, users, comments;
    beforeEach(() => {
        this.timeout = 10000
        return seedDB(topicData, articleData, userData)
            .then(docs => {
                [topics, users, articles, comments] = docs
            });
    });
    after(() => {
        return mongoose.disconnect()
    });
    describe('/topics', () => {
        it('GET /topics', () => {
            return request
                .get('/api/topics')
                .expect(200)
                .then(res => {
                    expect(res.body).to.have.all.keys('topics')
                    expect(res.body.topics.length).to.equal(2);
                    expect(res.body.topics[0].title).to.equal('Mitch');
                });
        });
        it('GET /topics error handling when path is spelt incorrectly', () => {
            return request
                .get('/api/topiccs')
                .expect(404)
        });
        it('GET /topics/:topic_id/articles', () => {
            return request
                .get(`/api/topics/${topics[0]._id}/articles`)
                .expect(200)
                .then(res => {
                    expect(res.body.articles.length).to.equal(2);
                    expect(res.body.articles[0].title).to.equal('Living in the shadow of a great man');
                });
        });
        it('GET /topics/:topic_id/articles error handling when ID does not exist', () => {
            return request
                .get('/api/topics/5acf32deba0/articles')
                .expect(400)
        });
        it('GET /topics/:topic_id/articles error handling when ID does not exist', () => {
            return request
                .get('/api/topics/your id here/articles')
                .expect(404)
        });
        it('GET /topics/:topic_id/articles error handling when ID does not exist', () => {
            return request
                .get(`/api/topics/${topics[0]._id}//articles`)
                .expect(404)
        });
        it('POST /topics/:topic_id/articles', () => {
            const newArticle = {
                "title": "this is my new article title",
                "body": "This is my new article content",
                "created_by": _.sample(users)._id
            }
            return request
                .post(`/api/topics/${topics[0]._id}/articles`)
                .send(newArticle)
                .expect(201)
                .then(res => {
                    expect(res.body.title).to.equal(newArticle.title)
                    expect(res.body.body).to.equal(newArticle.body)
                });
        });
        it('POST /topics/:topic_id/articles error handling when ID does not exist', () => {
            return request
                .get('/api/topics/5ace0a0/articles')
                .expect(400)
        });
        it('POST /topics/:topic_id/articles error handling when input values are incorrect', () => {
            const newArticle = {
                "title": "this is my new article title",
                "body": "This is my new article content",
                "created_by": _.sample(users)._id, 
                "votes": "ten"
            }
            return request
                .post(`/api/articles/${articles[0]._id}/comments`)
                .send(newArticle)
                .expect(400)
        });
    });
    describe('/articles', () => {
        it('GET /articles', () => {
            return request
                .get('/api/articles')
                .expect(200)
                .then(res => {
                    expect(res.body).to.have.all.keys('articles')
                    expect(res.body.articles.length).to.equal(4);
                    expect(res.body.articles[0].title).to.equal('Living in the shadow of a great man');
                });
        });
        it('GET /articles error handling when path is spelt incorrectly', () => {
            return request
                .get('/api/articless')
                .expect(404)
        });
        it('GET /articles/:article_id/comments', () => {
            return request
                .get(`/api/articles/${articles[1]._id}/comments`)
                .expect(200)
                .then(res => {
                    expect(res.body).to.be.an('object')
                    expect(res.body.comments[0].belongs_to.title).to.equal(`${articles[1].title}`)
                });
        });
        it('GET /articles/:article_id/comments error handling when ID does not exist', () => {
            return request
                .get('/api/articles/5ace0fa96fba0/comments')
                .expect(400)
        });
        it('GET /articles/:article_id/comments error handling when ID does not exist', () => {
            return request
                .get('/api/articles/your id here/comments')
                .expect(404)
        });
        it('POST /articles/:article_id/comments', () => {
            const newComment = {
                "comment": "This is my new comment",
                "created_by": users[0]._id
            }
            return request
                .post(`/api/articles/${articles[0]._id}/comments`)
                .send(newComment)
                .expect(201)
                .then(res => {
                    expect(res.body.body).to.equal(newComment.comment)
                    expect(res.body.created_by).to.equal(`${newComment.created_by}`)
                });
        });
        it('POST /articles/:article_id/comments error handling when ID does not exist', () => {
            return request
                .post(`/api/articles/DLMKLM/comments`)
                .expect(400)
        });
        it('POST /articles/:article_id/comments error handling when input values are incorrect', () => {
            const newComment = {
                "comment": "This is my new comment",
                "created_by": _.sample(users)._id.toString(), 
                "votes": "ten"
            }
            return request
                .post(`/api/articles/${articles[0]._id}/comments`)
                .send(newComment)
                .expect(400)
        });
        it('PATCH /articles/:article_id/votes', () => {
            return request
                .patch(`/api/articles/${articles[0]._id}?vote=up`)
                .expect(200)
                .then(res => {
                    expect(res.body.votes).to.equal(articles[0].votes + 1);
                })
            return request
                .patch(`/api/articles/${articles[0]._id}?vote=down`)
                .expect(200)
                .then(res => {
                    expect(res.body.votes).to.equal(articles[0].votes - 1);
                });
            })
        it('PATCH /articles/:article_id/votes error handling when ID does not exist', () => {
            return request
                .patch(`/api/articles/dlmsl?vote=up`)
                .expect(400)
            })
    });
    describe('/comments', () => {
        it('PATCH /comments/:comment_id/votes', () => {
            return request
                .patch(`/api/comments/${comments[0]._id}?vote=up`)
                .expect(200)
                .then(res => {
                    expect(res.body.votes).to.equal(comments[0].votes + 1);
                })
            return request
                .patch(`/api/comments/${comments[0]._id}?vote=down`)
                .expect(200)
                .then(res => {
                    expect(res.body.votes).to.equal(comments[0].votes - 1);
                });
        });
        it('PATCH /comments/:comment_id/votes error handling when ID does not exist', () => {
            return request
                .patch(`/api/comments/dlmsl?vote=up`)
                .expect(400)
        })
        it('PATCH /comments/:comment_id/votes error handling when ID is similar to mongo ID does not exist', () => {
            return request
                .patch(`/api/comments/8acfcb5ffd92ce06e02099a9?vote=up`)
                .expect(404)
        })
        it('DELETE /comment/:comment_id', () => {
            return request
                .delete(`/api/comments/${comments[0]._id}`)
                .expect(200)
                .then(res => {
                    expect(res.body.message).to.equal(`comment ${comments[0]._id} successfully deleted`)
                });
        });
        it('DELETE /comment/:comment_id error handling when ID does not exist', () => {
            return request
                .delete(`/api/comments/lnlsdk`)
                .expect(400)
        });
        it('DELETE /comment/:comment_id error handling when ID does not exist but is a mongoID', () => {
            return request
                .delete(`/api/comments/${articles[0]._id}`)
                .expect(404)
        });
    });
    describe('/users', () => {
        it('GET /users/:username', () => {
            return request
            .get(`/api/users/${users[0].username}`)
            .expect(200)
            .then(res => {
                expect(res.body.user.username).to.equal(users[0].username)
                expect(res.body.user.name).to.equal(users[0].name)
            })
        });
        it('GET /users/:username error handling when ID does not exist', () => {
            return request
                .get(`/api/users/lnsdln`)
                .expect(404)
        });
    })
});

