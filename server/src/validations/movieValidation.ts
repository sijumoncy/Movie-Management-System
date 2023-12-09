import Joi, { string } from 'joi';
import { movieDurationRegex } from '../constants/regex';

const addMovie = {
  body: Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string(),
    releaseYear: Joi.string().required(),
    releaseMonth: Joi.string(),
    releaseDate: Joi.number(),
    rating: Joi.number().default(0),
    duration: Joi.string().pattern(movieDurationRegex),
    genres: Joi.array().items(Joi.string()).required(),
    director: Joi.string().required(),
    language: Joi.string().required(),
  }),
};

const getMovies = {
  query: Joi.object().keys({
    title: Joi.string(),
    releaseYear: Joi.string(),
    genres: Joi.string(),
    rating: Joi.object({
      min: Joi.number().default(0).min(0),
      max: Joi.number().max(5),
    }),
    director: Joi.string(),
    language: Joi.string(),
    userId: Joi.string(),
    movieId: Joi.string(),
    limit: Joi.number().integer(),
    page: Joi.number().integer(),
  }),
};

const getMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
};

const updateMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
  body: Joi.object().keys({
    title: Joi.string(),
    description: Joi.string(),
    releaseYear: Joi.string(),
    releaseMonth: Joi.string(),
    releaseDate: Joi.number(),
    rating: Joi.number().default(0),
    duration: Joi.string().pattern(movieDurationRegex),
    genres: Joi.array().items(Joi.string()),
    director: Joi.string(),
    language: Joi.string(),
  }),
};

const deleteMovie = {
  params: Joi.object().keys({
    movieId: Joi.string().required(),
  }),
};

export {
    addMovie,
    getMovies,
    getMovie,
    updateMovie,
    deleteMovie
}