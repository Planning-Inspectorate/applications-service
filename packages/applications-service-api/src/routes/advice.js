const express = require('express');

const adviceController = require('../controllers/advice');
const { asyncRoute } = require('@pins/common/src/utils/async-route');

const router = express.Router();

router.get('/:adviceID', asyncRoute(adviceController.getAdviceById));
router.get('/', asyncRoute(adviceController.getAdvice));

module.exports = router;
