const express = require('express');

const router = express.Router();
const { routesConfig } = require('./config');

const { pagesRouter } = require('../pages/router');
const examinationRouter = require('../pages/examination/exmaination.router');
const { apiRouter } = require('../api/router');
const {
	isProcessingSubmission
} = require('../pages/examination/_middleware/submission.middleware');

const { apiSubdirectory } = require('../api/config');
const { processGuideRouter } = require('../pages/process-guide/router');
const { haveYourSayGuideRouter } = require('../pages/have-your-say-guide/router');
const { accessibilityStatementRouter } = require('../pages/accessibility-statement/router');
const { shortDocLinkRedirectRouter } = require('../pages/redirects/short-document-link/router');

const { addGlobalMiddleware } = require('../pages/_middleware/add-global-middleware');
const {
	examinationMiddleware
} = require('../pages/examination/_middleware/examination.middleware');
const config = require('../config');

router.get('/health', async (req, res) => {
	res.status(200).send({
		status: 'OK',
		uptime: process.uptime(),
		commit: config.gitSha
	});
});

router.use(addGlobalMiddleware);

router.use(shortDocLinkRedirectRouter);

router.use(pagesRouter);

router.use(accessibilityStatementRouter);

router.use(
	`/projects/:case_ref/${routesConfig.examination.baseDirectory}`,
	examinationMiddleware,
	isProcessingSubmission,
	examinationRouter
);

router.use(haveYourSayGuideRouter);
router.use(processGuideRouter);
router.use(`/${apiSubdirectory}`, apiRouter);

module.exports = router;
