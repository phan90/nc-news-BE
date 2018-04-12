const express = require('express');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { DB_URL } = require('./config');
const app = express();
const apiRouter = require('./routes/api')
mongoose.Promise = Promise;

mongoose.connect(DB_URL).then(() => console.log(`connected to ${DB_URL}`))

app.use(bodyParser.json());
app.use('/api', apiRouter)

app.use('/*', (req, res, next) => next({ status: 404 }));

app.use((err, req, res, next) => {
    if (err.status === 404) res.status(404).send({ message: 'Page not found' });
    else next(err);
});

app.use((err, req, res, next) => {
    if (err.status === 400) res.status(400).send({ message: 'Bad request' });
    else next(err);
});

app.use((err, req, res, next) => {
    res.status(500).send({ message: 'Internal server error' });
});

module.exports = app;