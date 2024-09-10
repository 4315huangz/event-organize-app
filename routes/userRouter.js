import { Router } from "express";
import { getCurrentUser, getAppStatus, updateUser } from "../controller/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
import { authorizePermissions, checkForTestUser } from "../middleware/authMiddleware.js";
import upload from "../middleware/multiMiddleware.js";
const router = Router();


router.route('/current-user').get(getCurrentUser);
router.route('/admin/app-status').get([authorizePermissions('Admin'), getAppStatus]);
router.route('/update-user').patch( 
    checkForTestUser,
    upload.single('avatar'),
    validateUpdateUserInput,
    updateUser);

export default router;