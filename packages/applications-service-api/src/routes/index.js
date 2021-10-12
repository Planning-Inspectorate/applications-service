/**
 * Routes
 *
 * This puts all the endpoints into the application.
 */
const express = require('express');

const router = express.Router();

const apiDocsRouter = require('./api-docs');

router.use('/api-docs', apiDocsRouter);

module.exports = router;
