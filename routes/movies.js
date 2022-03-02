const movieRouter = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies');
const { validateNewMovie, validateDeletion } = require('../middlewares/joiValidator');
const auth = require('../middlewares/auth');

movieRouter.get('/', auth, getAllMovies);
movieRouter.post('/', auth, validateNewMovie, createMovie);
movieRouter.delete('/:id', auth, validateDeletion, deleteMovie);

module.exports = movieRouter;
