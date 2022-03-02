require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const { errors } = require('celebrate');
const helmet = require('helmet');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const { limiter } = require('./middlewares/rateLimiter');
const router = require('./routes/index');
const NotFoundError = require('./errors/NotFoundError');
const { errorMessages } = require('./utils/constants');
const { cors } = require('./middlewares/cors');
const auth = require('./middlewares/auth');
const cfg = require('./utils/serverConfig');

const app = express();

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

app.use(router);

app.all('*', auth, () => {
  throw new NotFoundError(errorMessages.notFountRoute);
});

app.use(errorLogger);

app.use(errors());

app.use(require('./middlewares/defaulError'));

// start server
app.listen(cfg.port, () => {
  // eslint-disable-next-line no-console
  console.log(`App listening on port ${cfg.port}`);
});
