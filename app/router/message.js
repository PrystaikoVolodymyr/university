// rout => message/

const router = require('express').Router();
const { messageController } = require('../controller');
const { authMiddleware } = require('../middleware');


router.post('/send-message', authMiddleware.authorize_user, messageController.sendMessage);
router.get('/get-message', authMiddleware.authorize_user, messageController.getMessage);

module.exports = router;
