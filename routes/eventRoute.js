const express = require('express');
const { getEvent, getEventById, addEvent, deleteEvent, updateEvent } = require('../controllers/eventController');
const { roleVerify } = require('../middlewares/roleMiddleware');
const router = express.Router();

router.get('/' ,roleVerify("admin","user"),getEvent);
router.get('/:id',roleVerify("admin","user"),getEventById);
router.post('/',roleVerify("admin","user"),addEvent);
router.delete('/:id',roleVerify("admin"),deleteEvent);
router.put('/:id',roleVerify("admin"),updateEvent);

module.exports = router;