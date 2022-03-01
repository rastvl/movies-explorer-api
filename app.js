require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
// const { validateNewUser, validateLogin } = require('./middlewares/joiValidator.js');
// const { createUser, login } = require('./controllers/users.js');
const { requestLogger, errorLogger } = require('./middlewares/logger.js');
const { limiter } = require('./middlewares/rateLimiter.js');
const router = require('./routes/index.js');
const NotFoundError = require('./errors/NotFoundError.js');
const { errorMessages } = require('./utils/constants.js');
const { cors } = require('./middlewares/cors.js');
const auth = require('./middlewares/auth.js');
const cfg = require('./utils/serverConfig.js');

const app = express();
// body parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({
  extended: true,
}));

// db connect
mongoose.connect(cfg.mongodb);

app.use(cors);

app.use(requestLogger);

app.use(limiter);

app.use(helmet());

// app.post('/signup', validateNewUser, createUser);
// app.post('/signin', validateLogin, login);

// app.use(require('./routes/users.js'));
// app.use(require('./routes/movies.js'));
app.use(router);

app.all('*', auth, () => {
  throw new NotFoundError(errorMessages.notFountRoute);
});

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/defaulError.js'));

// start server
app.listen(cfg.port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${cfg.port}`);
});
