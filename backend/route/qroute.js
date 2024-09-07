const express = require('express');
const router = express.Router();
const queuecon= require('../controllers/queuecon');

router.get('/number',queuecon.tokenNumber);


module.exports = router;