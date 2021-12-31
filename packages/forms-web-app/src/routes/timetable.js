const express = require('express');
const timetableController = require('../controllers/timetable');

const router = express.Router();

router.get('/:case_ref', timetableController.getTimetable);

module.exports = router;
