const express = require('express');
const projectSearchController = require('../controllers/project-search');

const router = express.Router();

router.get('/', projectSearchController.getProjectList);

module.exports = router;
