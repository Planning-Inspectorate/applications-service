const express = require('express');

const declarationController = require('../../../controllers/register/organisation/declaration');
const { asyncRoute } = require('../../../utils/async-route');

const router = express.Router();

router.get('/declaration', declarationController.getDeclaration);

router.post('/declaration', asyncRoute(declarationController.postDeclaration));

module.exports = router;
