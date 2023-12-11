import express from 'express';
import validate from '../../middleware/validate';
import { addMovie, getMovie, getMovies, updateMovie, deleteMovie } from '../../validations/movieValidation';
import {  } from '../../controllers/userControllers';
import { authenticate } from '../../middleware/authenticate';
import { createMovieController, deleteMovieController, getMovieController, getMoviesController, updateMovieController } from '../../controllers/movieControllers';

const router = express.Router();

router
  .route('/:movieId')
  .patch(authenticate, validate(updateMovie), updateMovieController)
  .get(validate(getMovie), getMovieController)
  .delete(authenticate, validate(deleteMovie), deleteMovieController);

router
  .route('/')
  .post(authenticate, validate(addMovie), createMovieController)
  .get(validate(getMovies), getMoviesController);

export default router; 