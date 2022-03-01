const movieRouter = require('express').Router();
const { getAllMovies, createMovie, deleteMovie } = require('../controllers/movies.js');
const { validateNewMovie } = require('../middlewares/joiValidator.js');
const auth = require('../middlewares/auth.js');

movieRouter.get('/', auth, getAllMovies);
movieRouter.post('/', auth, validateNewMovie, createMovie);
movieRouter.delete('/:id', auth, deleteMovie);

module.exports = movieRouter;
