const express = require('express');
const config = require('../config');

const router = express.Router();

const cookieRouter = require('./cookies');
const projectSearchRouter = require('./project-search');
const guidancePagesRouter = require('./guidance-pages');
const registerRouter = require('./register');
const interestedPartyRouter = require('./having-your-say-guide');
const decisionMakingProcessGuideRouter = require('./decision-making-process-guide');
const footerPagesRouter = require('./footer-pages');
const confirmEmailRouter = require('./register/confirm-email');
const examinationRouter = require('./examination');

router.use('/', guidancePagesRouter);
router.use('/', footerPagesRouter);
router.use('/cookies', cookieRouter);
if (!config.featureFlag.usePrivateBetaV1RoutesOnly) {
  router.use('/project-search', projectSearchRouter);
}
router.use('/register', registerRouter);
router.use('/register-have-your-say', registerRouter);
if (!config.featureFlag.usePrivateBetaV1RoutesOnly) {
  router.use('/examination', examinationRouter);
}
router.use(interestedPartyRouter);
router.use(decisionMakingProcessGuideRouter);
router.use('/interested-party/confirm-your-email', confirmEmailRouter);

module.exports = router;
