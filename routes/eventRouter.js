import {Router} from 'express';
const router = Router();

import {getAllEvents, getEvent, createEvent, deleteEvent, updateEvent } 
from '../controller/eventController.js';

router.route('/').get(getAllEvents).post(createEvent);
router.route('/:id').get(getEvent).patch(updateEvent).delete(deleteEvent);

export default router;