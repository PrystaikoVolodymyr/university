// rout => users/

const router = require('express').Router();
const { userController } = require('../controller');
const { userMiddleware } = require('../middleware');

// router.post('/connection-request', userMiddleware.createUser, userController.requestToConnect);

module.exports = router;
