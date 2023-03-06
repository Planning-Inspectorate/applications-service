const express = require('express');

const adviceController = require('../controllers/advice');

const router = express.Router();

router.get('/:adviceID', adviceController.getAdviceById);
router.get('/', adviceController.getAdvice);

module.exports = router;
