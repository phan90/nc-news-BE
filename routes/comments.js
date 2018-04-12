const express = require('express');
const router = express.Router();
const {
    updateCommentCount, 
    deleteComment
} = require('../controllers')


router.patch('/:comment_id', updateCommentCount)
router.delete('/:comment_id', deleteComment)


module.exports = router;