import { Request, Response } from 'express';
import httpStatus from 'http-status';
import { pickKeyValues } from '../utils/pickKeyValues';
import ApiError from '../utils/apiError';
import { IAuthRequest } from '../interfaces/User';
import { createUserService, deleteUserByIdService, getUserByIdService, getUsersService, updateUserByIdService } from '../services/userServices';

const createUserController = async (req: IAuthRequest, res: Response) => {
    const user = await createUserService(req.body);
    res
      .status(httpStatus.CREATED)
      .json({ message: 'user created successfully', data: user });
};

const getUsersController = async (req: IAuthRequest, res: Response) => {
    const filter = pickKeyValues(req.query, ['name']);
    const options = pickKeyValues(req.query, ['limit', 'page']);
    const result = await getUsersService(filter, options);
    res.status(httpStatus.OK).send(result);
};

const getUserController = async (req: IAuthRequest, res: Response) => {
  const user = await getUserByIdService(req.params.userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  res.send(user);
};

const updateUserController = async (req: IAuthRequest, res: Response) => {
  const user = await updateUserByIdService(req.params.userId, req.body);
  res.send(user);
};

const deleteUserController = async (req: IAuthRequest, res: Response) => {
  const deletedUser = await deleteUserByIdService(req.params.userId);
  res.status(httpStatus.OK).send(deletedUser);
};

export {
  createUserController,
  getUsersController,
  getUserController,
  updateUserController,
  deleteUserController,
};