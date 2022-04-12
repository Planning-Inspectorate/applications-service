const express = require('express');

const declarationController = require('../../../controllers/register/organisation/declaration');

const router = express.Router();

router.get('/declaration', declarationController.getDeclaration);

router.post('/declaration', declarationController.postDeclaration);

module.exports = router;
