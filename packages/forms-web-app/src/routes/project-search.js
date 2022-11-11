const express = require('express');
const projectSearchController = require('../controllers/project-search');
const { asyncRoute } = require('../utils/async-route');

const router = express.Router();

router.get('/', asyncRoute(projectSearchController.getProjectList));

module.exports = router;
