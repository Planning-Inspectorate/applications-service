const express = require('express');
const config = require('../config');

const router = express.Router();
const { routesConfig } = require('./config');

const cookieRouter = require('./cookies');
const registerRouter = require('./register');
const { registerRouter: registerPagesRouter } = require('../pages/projects/register/router');
const footerPagesRouter = require('./footer-pages');
const examinationRouter = require('../pages/examination/exmaination.router');
const projectsRouterLegacy = require('../pages/projects/projects.router');
const { projectsRouter } = require('../pages/projects/router');
const { projectSearchRouter } = require('../pages/project-search/router');
const { registerOfApplicationsRouter } = require('../pages/register-of-applications/router');
const { apiRouter } = require('../api/router');
const {
	isProcessingSubmission
} = require('../pages/examination/_middleware/submission.middleware');

const { apiSubdirectory } = require('../api/config');
const { processGuideRouter } = require('../pages/process-guide/router');
const { haveYourSayGuideRouter } = require('../pages/have-your-say-guide/router');
const { indexRouter } = require('../pages/index/router');
const { accessibilityStatementRouter } = require('../pages/accessibility-statement/router');

if (config.featureFlag.allowHomepage) router.use(indexRouter);

router.use(projectsRouter);
router.use(routesConfig.project.directory, projectsRouterLegacy);

router.use(accessibilityStatementRouter);
router.use('/', footerPagesRouter);
router.use('/cookies', cookieRouter);

if (!config.featureFlag.usePrivateBetaV1RoutesOnly) {
	router.use('/', projectSearchRouter);
	router.use('/', registerOfApplicationsRouter);
}

router.use(registerPagesRouter);
router.use('/projects/:case_ref/register', registerRouter);

router.use(
	`/projects/:case_ref/${routesConfig.examination.baseDirectory}`,
	isProcessingSubmission,
	examinationRouter
);

router.use(haveYourSayGuideRouter);
router.use(processGuideRouter);
router.use(`/${apiSubdirectory}`, apiRouter);

module.exports = router;
