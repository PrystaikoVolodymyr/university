// rout => users/

const router = require('express').Router();
const { userController } = require('../controller');
// const { userMiddleware } = require('../middleware');

router.get('/me', userController.getUserInfo);
router.post('/connection-request', userController.sendRequestToConnect);
router.post('/connection-approve', userController.approveConnectRequest);

module.exports = router;
