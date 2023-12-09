import express from 'express';
import validate from '../../middleware/validate';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../../validations/userValidation';
import { createUserController, deleteUserController, getUserController, getUsersController, updateUserController } from '../../controllers/userControllers';
import { AdminOnlyAccess, authenticate, checkPermissionAdminOrSameUserReq } from '../../middleware/authenticate';

const router = express.Router();

router
  .route('/')
  .post(authenticate, validate(createUser), createUserController)
  .get(authenticate, AdminOnlyAccess, validate(getUsers), getUsersController);

router
  .route('/:userId')
  .get(authenticate, checkPermissionAdminOrSameUserReq, validate(getUser), getUserController)
  .patch(authenticate, checkPermissionAdminOrSameUserReq, validate(updateUser), updateUserController)
  .delete(authenticate, AdminOnlyAccess, validate(deleteUser), deleteUserController);

export default router; 