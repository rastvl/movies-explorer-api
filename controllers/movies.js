const Movie = require('../models/movie');
const { errorMessages, messagges } = require('../utils/constants');
const ServerError = require('../errors/ServerError');
const ForbiddenError = require('../errors/ForbiddenError');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');

const handleError = (err, next) => {
  if (err.name === 'CastError') {
    throw new BadRequestError('Произошла ошибка');
  } else next(err);
};

const getAllMovies = (req, res, next) => {
  Movie.find({ owner: req.user._id })
    .then((movies) => res.send(movies))
    .catch(() => next(new ServerError(errorMessages.server)));
};

const createMovie = (req, res, next) => {
  const {
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
  } = req.body;

  const { user } = req;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailerLink,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner: user,
  })
    .then((data) => {
      res.send(data);
    })
    .catch(next);
};

const deleteMovie = (req, res, next) => {
  const { id } = req.params;

  Movie.findById(id)
    .then((movie) => {
      if (movie) {
        if (!movie.owner.equals(req.user._id)) {
          throw new ForbiddenError(errorMessages.forbidden);
        }
        Movie.findByIdAndDelete(id).then(() => {
          res.send({
            message: messagges.deleteMovie,
          });
        }).catch(next);
      } else {
        throw new NotFoundError(errorMessages.notFoundDB);
      }
    })
    .catch((err) => {
      handleError(err, next);
    })
    .catch(next);
};

module.exports = {
  getAllMovies,
  createMovie,
  deleteMovie,
};
