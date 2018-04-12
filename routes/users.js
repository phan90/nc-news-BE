const express = require('express');
const router = express.Router();
const {
    getUserProfile,
} = require('../controllers')

router.get('/:username', getUserProfile)

module.exports = router;