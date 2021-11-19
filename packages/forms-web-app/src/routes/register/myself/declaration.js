const express = require('express');

const declarationController = require('../../../controllers/register/myself/declaration');

const router = express.Router();

router.get('/declaration', declarationController.getDeclaration);

module.exports = router;