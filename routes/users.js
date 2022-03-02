const userRouter = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users');
const { validateProfileUpdate } = require('../middlewares/joiValidator');
const auth = require('../middlewares/auth');

userRouter.get('/me', auth, getCurrentUser);
userRouter.patch('/me', auth, validateProfileUpdate, updateUserInfo);

module.exports = userRouter;
