// rout => auth/

const router = require('express').Router();
const { authController } = require('../controller');
const { userMiddleware } = require('../middleware');

router.post('/sing-up', userMiddleware.createUser, authController.singUp);
router.post('/sing-in', userMiddleware.singIn, authController.singIn);

module.exports = router;
