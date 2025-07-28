/* istanbul ignore file */

const express = require('express');
const swaggerUi = require('swagger-ui-express');
const { loadOpenAPISpec } = require('../utils/openapi');

const router = express.Router();

router.use('/', swaggerUi.serve);
router.get('/', swaggerUi.setup(loadOpenAPISpec()));

module.exports = router;
