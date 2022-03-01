const router = require('express').Router();
const userRouter = require('./users.js');
const movieRouter = require('./movies.js');
const { validateNewUser, validateLogin } = require('../middlewares/joiValidator.js');
const { createUser, login } = require('../controllers/users.js');
const auth = require('../middlewares/auth.js');

router.post('/signup', validateNewUser, createUser);
router.post('/signin', validateLogin, login);

router.use('/users', auth, userRouter);
router.use('/movies', auth, movieRouter);

module.exports = router;
