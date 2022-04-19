// rout => users/

const router = require('express').Router();

const { userController } = require('../controller');
const { authMiddleware } = require('../middleware');

router.get('/me', userController.getUserInfo)
router.get('/', authMiddleware.authorize_user, userController.getUsers);
router.post('/connection-request', userController.sendRequestToConnect);
router.post('/connection-approve', userController.approveConnectRequest);
router.post('/connection-reject', userController.rejectConnectRequest);

module.exports = router;
