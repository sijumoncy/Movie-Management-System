import express from 'express';
import validate from '../../middleware/validate';
import { createUser, deleteUser, getUser, getUsers, updateUser } from '../../validations/userValidation';

const router = express.Router();

router
  .route('/')
  .post(validate(createUser))
  .get(validate(getUsers));

router
  .route('/:userId')
  .get(validate(getUser))
  .patch(validate(updateUser))
  .delete(validate(deleteUser));

export default router;