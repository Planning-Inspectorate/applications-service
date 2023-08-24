const express = require('express');
const { getProjectSearch } = require('../pages/projects/project-search/controller');

const router = express.Router();

router.get('/', getProjectSearch);

module.exports = router;
