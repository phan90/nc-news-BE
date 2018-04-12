const mongoose = require('mongoose');
mongoose.Promise = Promise;
const seedDB = require('./seed')
const { DB_URL, dataPath } = require('../config')
const { topicData, articleData, userData } = require(dataPath)

mongoose
    .connect(DB_URL)
    .then(() => seedDB(topicData, articleData, userData))
    .then(() => mongoose.disconnect())