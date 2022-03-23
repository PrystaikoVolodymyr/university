// rout => auth/

const router = require('express').Router();
const { authController, userController} = require('../controller');
const { userMiddleware } = require('../middleware');

router.post('/sing-up', userMiddleware.createUser, authController.singUp);
router.post('/sing-in', userMiddleware.singIn, authController.singIn);
router.post('/two-factor-authenticate', );


module.exports = router;
