import httpStatus from 'http-status';
import {
  loginWithEmailAndPassword,
  logoutService,
  refreshAuthService,
} from '../services/authServices';
import {
  generateAuthTokenService,
} from '../services/tokenServices';

import { createUserService } from '../services/userServices';
import { Request, Response } from 'express';

const registerController = async (req: Request, res: Response) => {
  const user = await createUserService(req.body);
  const tokens = await generateAuthTokenService(user._id);
  const userData = user.toObject()
  userData.password = ''
  res
    .status(httpStatus.CREATED)
    .json({ message: 'user registration successfull', data: { user:userData, tokens } });
};

const loginController = async (req: Request, res: Response) => {
  const { email, password } = req.body;
  const user = await loginWithEmailAndPassword(email, password);
  const tokens = await generateAuthTokenService(user._id);
  const userData = user.toObject()
  userData.password = ''
  res
    .status(httpStatus.OK)
    .json({ message: 'login successfull', data: { user:userData, tokens } });
};

const logoutController = async (req: Request, res: Response) => {
  await logoutService(req.body.refreshToken);
  res.status(httpStatus.NO_CONTENT).send();
};

const refreshTokensController = async (req: Request, res: Response) => {
  const tokens = await refreshAuthService(req.body.refreshToken);
  res.send({ ...tokens });
};

export {
    registerController,
    loginController,
    logoutController,
    refreshTokensController
}