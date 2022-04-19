// rout => auth/

const router = require('express').Router();
const { authController, userController} = require('../controller');
const { userMiddleware } = require('../middleware');

router.post('/sing-up', userMiddleware.createUser, authController.singUp);
router.post('/sing-in', userMiddleware.singIn, authController.singIn);
router.post('/two-factor-authenticate', authController.verifyTwoFactorAuth);
router.get('/check-refresh', authController.checkRefreshToken);


module.exports = router;
