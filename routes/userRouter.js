import { Router } from "express";
import { getCurrentUser, getApplicationStatus, updateUser } from "../controller/userController.js";
import { validateUpdateUserInput } from "../middleware/validationMiddleware.js";
const router = Router();


router.route('/current-user').get(getCurrentUser);
router.route('/admin/app-status').get(getApplicationStatus);
router.route('/update-user').patch(validateUpdateUserInput,updateUser);

export default router;