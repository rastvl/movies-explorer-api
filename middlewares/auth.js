const jwt = require('jsonwebtoken');
const AuthError = require('../errors/AuthError');
const { errorMessages } = require('../utils/constants');

module.exports = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(errorMessages.unauthorized);
  }

  const token = authorization.replace('Bearer ', '');

  const { NODE_ENV, JWT_SECRET } = process.env;

  try {
    req.user = jwt.verify(token, NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key');
    next();
  } catch (err) {
    throw new AuthError(errorMessages.unauthorized);
  }
};
