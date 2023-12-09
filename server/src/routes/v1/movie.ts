import express from 'express';
import validate from '../../middleware/validate';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../../validations/userValidation';
import {  } from '../../controllers/userControllers';
import { authenticate } from '../../middleware/authenticate';
import { createMovieController, deleteMovieController, getMovieController, getMoviesController, updateMovieController } from '../../controllers/movieControllers';

const router = express.Router();

router
  .route('/')
  .post(authenticate, validate(createUser), createMovieController)
  .get(validate(getUsers), getMoviesController);

router
  .route('/:movieId')
  .get(validate(getUser), getMovieController)
  .patch(authenticate, validate(updateUser), updateMovieController)
  .delete(authenticate, validate(deleteUser), deleteMovieController);

export default router; 