// rout => message/

const router = require('express').Router();
const { messageController } = require('../controller');

router.post('/send-message', messageController.sendMessage);
router.get('/get-message', messageController.getMessage);

module.exports = router;
