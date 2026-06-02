const express = require('express');
const router = express.Router();
const smsController = require('../controllers/smsController');

router.post('/temporary-number', smsController.getTemporaryNumber);
router.post('/receive', smsController.receiveSms);
router.get('/messages', smsController.getMessages);

module.exports = router;
