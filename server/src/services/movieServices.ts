import httpStatus from 'http-status';
import MovieModel from '../models/Movie.model';
import { generateMinMaxDbQuery } from '../utils/generateMinMaxDbQry';
import ApiError from '../utils/apiError';
import { IMovie } from '../interfaces/Movie';
import { IAuthRequest } from '../interfaces/User';

const createMovieService = async (movieBody: IMovie, req:IAuthRequest) => {
  const created = await MovieModel.create({...movieBody, user: req.user?._id})
  return created
};

const getMoviesService = async (
  filter: Object,
  options: {
    limit?: number;
    page?: number;
  },
  compareFilters: { rating?: { min: number; max: number } }
) => {
  const pageNum = (options.limit || 100) * (options.page || 0);
  const compareQry = generateMinMaxDbQuery(compareFilters);
  const movie = await MovieModel.find({ filter, ...compareQry })
    .select('-user')
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return movie;
};

const getMovieByIdService = async (id: string) => {
  return MovieModel.findById(id).select('-user');
};

const updateMovieByIdService = async (
  movieId: string,
  updateBody: {
    [K in keyof IMovie]?: IMovie[K];
  },
  req: IAuthRequest
) => {
  let movie;
  if (req.user?.isAdmin) {
    movie = await getMovieByIdService(movieId);
  } else {
    movie = await MovieModel.find({ _id: movieId, userId: req.user?._id });
    movie = movie.length > 0 ? movie[0] : undefined;
  }
  if (!movie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'movie not found');
  }
  Object.assign(movie, updateBody);
  await movie.save();
  return movie;
};

const deleteMovieByIdService = async (movieId: string, req: IAuthRequest) => {
let deletedMovie;
  if (req.user?.isAdmin) {
    deletedMovie = await MovieModel.findByIdAndDelete(movieId);
  } else {
    deletedMovie = await MovieModel.findOneAndDelete({_id:movieId, userId: req.user?._id});
  }
  if (!deletedMovie) {
    throw new ApiError(httpStatus.NOT_FOUND, 'movie not found');
  }
  return deletedMovie;
};

export {
  createMovieService,
  updateMovieByIdService,
  getMovieByIdService,
  getMoviesService,
  deleteMovieByIdService,
};
