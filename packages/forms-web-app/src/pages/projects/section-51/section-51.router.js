const express = require('express');
const { getSection51 } = require('./section-51.controller');
const {
	getSection51AdviceDetail
} = require('./section-51-advice-detail/section-51-advice-detail.controller');
const { projectsMiddleware } = require('../_middleware/middleware');
const router = express.Router();
const section51Route = '/:case_ref/s51advice';

router.get(section51Route, projectsMiddleware, getSection51);
router.get(`${section51Route}/:id`, projectsMiddleware, getSection51AdviceDetail);

module.exports = router;
