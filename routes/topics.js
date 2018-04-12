const express = require('express');
const router = express.Router();
const {
    getAllTopics,
    getAllArticlesByTopic, 
    addNewArticleToTopic
} = require('../controllers')

router.get('/', getAllTopics)
router.get('/:topic_id/articles', getAllArticlesByTopic)
router.post('/:topic_id/articles', addNewArticleToTopic)


module.exports = router;