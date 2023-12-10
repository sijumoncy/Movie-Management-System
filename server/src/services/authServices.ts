import httpStatus from 'http-status';
import TokenModel from '../models/TokenModel';
import ApiError from '../utils/apiError';
import bcrypt from 'bcryptjs';
import { tokenTypes } from '../interfaces/Token'; 
import {
  getUserByEmailService,
  getUserByIdService,
} from './userServices';
import UserModel from '../models/User.model';
import { generateAuthTokenService, verifyToken } from './tokenServices';

const loginWithEmailAndPassword = async (email: string, password: string) => {
  const user = await getUserByEmailService(email);
  
  if (!user) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }
  
  const isMatch = bcrypt.compareSync(password, user.password)

  if(!isMatch){
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Incorrect email or password');
  }

  return user;
};

const logoutService = async (refreshToken: string) => {
  const deletedRefreshToken = await TokenModel.findOneAndDelete({
    token: refreshToken,
    type: tokenTypes.REFRESH,
    blacklisted: false,
  });
  if (!deletedRefreshToken) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Not found');
  }
};

const refreshAuthService = async (refreshToken: string) => {
  try {
    const refreshTokenDoc = await verifyToken(refreshToken, tokenTypes.REFRESH);
    const user = await getUserByIdService(refreshTokenDoc.user);
    if (!user) {
      throw new Error();
    }
    await logoutService(refreshToken);
    return generateAuthTokenService(user._id);
  } catch (error) {
    throw new ApiError(httpStatus.UNAUTHORIZED, 'Please authenticate');
  }
};


export {refreshAuthService, logoutService, loginWithEmailAndPassword}