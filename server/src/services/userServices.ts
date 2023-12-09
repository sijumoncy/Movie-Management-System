import httpStatus from 'http-status';
import UserModel from '../models/User.model'
import ApiError from '../utils/apiError';
import {Schema} from 'mongoose';
import { IUser } from '../interfaces/User';

const createUserService = async (userBody: IUser) => {
  if (await UserModel.isEmailExist(userBody.email)) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  return UserModel.create(userBody);
};

const getUsersService = async (
  filter: Object,
  options: {
    limit?: number;
    page?: number;
  }
) => {
  const pageNum = (options.limit || 100) * (options.page || 0);
  const users = await UserModel.find(filter)
    .limit(options.limit || 100)
    .skip(pageNum)
    .exec();
  return users;
};

const getUserByIdService = async (id:Schema.Types.ObjectId | string) => {
  const user = UserModel.findById(id);
  return user
};

const getUserByEmailService = async (email:string) => {
  return UserModel.findOne({ email });
};

const updateUserByIdService = async (userId:Schema.Types.ObjectId | string, updateBody:{
  name?: string
  email?: string
  password?: string
}) => {
  const user = await getUserByIdService(userId);
  if (!user) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  if (updateBody.email && (await UserModel.isEmailExist(updateBody.email, user._id))) {
    throw new ApiError(httpStatus.BAD_REQUEST, 'Email already taken');
  }
  Object.assign(user, updateBody);
  await user.save();
  return user;
};

const deleteUserByIdService = async (userId:string) => {
  const deletedUser = await UserModel.findByIdAndDelete(userId);
  if (!deletedUser) {
    throw new ApiError(httpStatus.NOT_FOUND, 'User not found');
  }
  return deletedUser;
};

export {
  createUserService,
  getUsersService,
  getUserByIdService,
  updateUserByIdService,
  deleteUserByIdService,
  getUserByEmailService
};
