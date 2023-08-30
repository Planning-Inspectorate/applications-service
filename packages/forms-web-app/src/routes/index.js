const express = require('express');
const config = require('../config');

const router = express.Router();
const { routesConfig } = require('./config');

const cookieRouter = require('./cookies');
const projectSearchRouter = require('./project-search');
const registerRouter = require('./register');
const interestedPartyRouter = require('./having-your-say-guide');
const decisionMakingProcessGuideRouter = require('./decision-making-process-guide');
const footerPagesRouter = require('./footer-pages');
const confirmEmailRouter = require('./register/confirm-email');
const examinationRouter = require('../pages/examination/exmaination.router');
const projectsRouter = require('../pages/projects/projects.router');
const {
	isProcessingSubmission
} = require('../pages/examination/_middleware/submission.middleware');

router.use(routesConfig.project.directory, projectsRouter);
router.use('/', footerPagesRouter);
router.use('/cookies', cookieRouter);

if (!config.featureFlag.usePrivateBetaV1RoutesOnly) {
	router.use('/project-search', projectSearchRouter);
}

router.use('/projects/:case_ref/register', registerRouter);
router.use(
	`/projects/:case_ref/${routesConfig.examination.baseDirectory}`,
	isProcessingSubmission,
	examinationRouter
);
router.use(interestedPartyRouter);
router.use(decisionMakingProcessGuideRouter);
router.use('/interested-party/confirm-your-email', confirmEmailRouter);

module.exports = router;
