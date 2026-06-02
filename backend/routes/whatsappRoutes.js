const express = require('express');
const router = express.Router();
const whatsappController = require('../controllers/whatsappController');

router.post('/webhook', whatsappController.receiveMessage);
router.post('/send', whatsappController.sendMessage);
router.get('/messages', whatsappController.getMessages);

module.exports = router;
