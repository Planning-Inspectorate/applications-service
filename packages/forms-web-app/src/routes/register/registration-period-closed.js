const express = require('express');

const controller = require('../../controllers/register/registration-period-closed');

const router = express.Router({ mergeParams: true });

router.get('/', controller.showInfo);

module.exports = router;
