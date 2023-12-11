import httpStatus from 'http-status';
import ApiError from '../utils/apiError';
import { pickKeyValues } from '../utils/pickKeyValues';
import { Request, Response } from 'express';
import { createMovieService, deleteMovieByIdService, getMovieByIdService, getMoviesService, updateMovieByIdService } from '../services/movieServices';
import { IAuthRequest } from '../interfaces/User';

const createMovieController = async (req: IAuthRequest, res: Response) => {
  const movie = await createMovieService(req.body, req);
  res
    .status(httpStatus.CREATED)
    .json({ message: 'movie created successfully', data: movie });
};

const getMoviesController = async (req: Request, res: Response) => {
    const filter = pickKeyValues(req.query, ['title', 'releaseYear', 'genres', 'director', 'language']);
    const compareFilters = pickKeyValues(req.query, ['rating']);
    const options = pickKeyValues(req.query, ['limit', 'page']);
    const result = await getMoviesService(filter, options, compareFilters);
    res.status(httpStatus.OK).send(result);
  };

const getMovieController = async (req: Request, res: Response) => {
    const movie = await getMovieByIdService(req.params.productId);
    if (!movie) {
      throw new ApiError(httpStatus.NOT_FOUND, 'movie not found');
    }
    res.send(movie);
};

const updateMovieController = async (req: Request, res: Response) => {
    const movie = await updateMovieByIdService(req.params.productId, req.body, req);
    res.status(httpStatus.OK).json({ message: 'movie updated successfully', data: movie });
  };
  
  const deleteMovieController = async (req: Request, res: Response) => {
    const deletedProduct = await deleteMovieByIdService(req.params.productId, req);
    res.status(httpStatus.OK).send(deletedProduct);
  };

export {
    createMovieController,
    getMovieController,
    getMoviesController,
    updateMovieController,
    deleteMovieController
}