import {Router} from 'express';
const router = Router();

import { register, login, getAllUser } from '../controller/authController.js';
import { validateRegisterInput, validateLoginInput } from '../middleware/validationMiddleware.js';
router.route('/register').post(validateRegisterInput, register);
router.route('/login').post(validateLoginInput, login);
router.route('/getAllUser').get(getAllUser);

export default router;