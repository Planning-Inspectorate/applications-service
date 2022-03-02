const express = require('express');

const declarationController = require('../../../controllers/register/agent/declaration');

const router = express.Router();

router.get('/declaration', declarationController.getDeclaration);

router.post('/declaration', declarationController.postDeclaration);

module.exports = router;
