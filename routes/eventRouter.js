import {Router} from 'express';
const router = Router();
 
import {getAllEvents, getEvent, createEvent, deleteEvent, updateEvent } 
from '../controller/eventController.js';
import {validEventInput, validateIdParam} from '../middleware/validationMiddleware.js'
import { checkForTestUser } from '../middleware/authMiddleware.js';

router.route('/').get(getAllEvents).post(checkForTestUser, validEventInput, createEvent);

router.route('/:id')
.get(validateIdParam, getEvent)
.patch(checkForTestUser,validEventInput,validateIdParam, updateEvent)
.delete(checkForTestUser,validateIdParam,deleteEvent);

export default router;