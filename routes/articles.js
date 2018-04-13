const express = require('express');
const router = express.Router();
const {
    getAllArticles,
    getAllCommentsForArticle,
    addNewCommentToArticle,
    updateVotes
} = require('../controllers')

router.get('/:article_id/comments', getAllCommentsForArticle)
router.post('/:article_id/comments', addNewCommentToArticle)
router.patch('/:article_id', updateVotes)
router.get('/', getAllArticles)


module.exports = router;