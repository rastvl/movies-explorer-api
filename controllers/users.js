// const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const User = require('../models/user.js');
const NotFoundError = require('../errors/NotFoundError.js');
const BadRequestError = require('../errors/BadRequestError.js');
const ConflictError = require('../errors/ConflictError.js');
const AuthError = require('../errors/AuthError.js');
const { errorMessages } = require('../utils/constants.js');

const handleError = (err, next) => {
  if (err.name === 'CastError') {
    throw new BadRequestError('Произошла ошибка');
  } next(err);
};

const getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .then((user) => {
      res.send(user);
    })
    .catch((err) => handleError(err, next))
    .catch(next);
};

const updateUserInfo = (req, res, next) => {
  const { name, email } = req.body;

  User.findByIdAndUpdate(req.user._id, { name, email })
    .then((user) => {
      if (user) {
        res.send(user);
      }
      return next(new NotFoundError(errorMessages.notFoundUser));
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        return next(new BadRequestError(errorMessages.auth));
      }
      if (err.name === 'MongoError' && err.code === 11000) {
        return next(new ConflictError(errorMessages.conflict));
      }
      return next(err);
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  bcrypt
    .hash(password, 10)
    .then((hash) => {
      User.create({
        name,
        email,
        password: hash,
      })
        .then((user) => res.send(user))
        .catch((err) => {
          if (err.name === 'ValidationError') {
            throw new BadRequestError(errorMessages.badRequestNewUser);
          }
          if (err.name === 'MongoServerError' && err.code === 11000) {
            throw new ConflictError(errorMessages.conflictEmail);
          } else next(err);
        })
        .catch((err) => handleError(err, next));
    })
    .catch(next);
};

const login = (req, res, next) => {
  const { email, password } = req.body;

  const { NODE_ENV, JWT_SECRET } = process.env;

  return User.findUserByCredentials(email, password)
    .then((user) => {
      req.user = {
        userId: user._id.toString(),
      };
      const token = jwt.sign(
        { _id: user._id },
        NODE_ENV === 'production' ? JWT_SECRET : 'some-secret-key',
        {
          expiresIn: '7d',
        },
      );
      req.headers.authorization = `Bearer ${token}`;
      res.send({ token });
    })
    .catch((err) => {
      if (err.message === errorMessages.auth) {
        throw new AuthError(err.message);
      } else throw err;
    })
    .catch(next);
};

module.exports = {
  getCurrentUser,
  updateUserInfo,
  createUser,
  login,
};
