import {Router} from 'express';
const router = Router();

import {getAllEvents, getEvent, createEvent, deleteEvent, updateEvent } 
from '../controller/eventController.js';
import {validEventInput, validateIdParam} from '../middleware/validationMiddleware.js'

router.route('/').get(getAllEvents).post(validEventInput, createEvent);
router.route('/:id')
.get(validateIdParam, getEvent)
.patch(validEventInput,validateIdParam, updateEvent)
.delete(validateIdParam,deleteEvent);

export default router;