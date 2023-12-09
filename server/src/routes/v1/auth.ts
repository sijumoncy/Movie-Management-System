import express from 'express';
import validate from '../../middleware/validate';
import {
  login,
  register,
} from '../../validations/authValidation';

import {loginController, logoutController, refreshTokensController, registerController} from '../../controllers/authControllers'
import { authenticate } from '../../middleware/authenticate';

const router = express.Router();

router.post('/register', validate(register), registerController);
router.post('/login', validate(login), loginController);
router.post('/logout', authenticate, logoutController);
router.post('/refresh-token', authenticate, refreshTokensController);

export default router;
