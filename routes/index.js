const router = require('express').Router();
const userRouter = require('./users');
const movieRouter = require('./movies');
const { validateNewUser, validateLogin } = require('../middlewares/joiValidator');
const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');

router.post('/signup', validateNewUser, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
