const userRouter = require('express').Router();
const { getCurrentUser, updateUserInfo } = require('../controllers/users.js');
const { validateProfileUpdate } = require('../middlewares/joiValidator.js');
const auth = require('../middlewares/auth.js');

userRouter.get('/users/me', auth, getCurrentUser);
userRouter.patch('/users/me', auth, validateProfileUpdate, updateUserInfo);

module.exports = userRouter;
