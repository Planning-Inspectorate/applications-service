const express = require('express');

const router = express.Router();

const homeRouter = require('./home');
const cookieRouter = require('./cookies');
const projectSearchRouter = require('./project-search');
const guidancePagesRouter = require('./guidance-pages');
const registerRouter = require('./register');
const interestedPartyRouter = require('./having-your-say-guide');
const footerPagesRouter = require('./footer-pages');
const confirmEmailRouter = require('./register/confirm-email');
const examinationRouter = require('./examination');

router.use('/', homeRouter);
router.use('/', guidancePagesRouter);
router.use('/', footerPagesRouter);
router.use('/cookies', cookieRouter);
router.use('/project-search', projectSearchRouter);
router.use('/register', registerRouter);
router.use('/examination', examinationRouter);
router.use(interestedPartyRouter);
router.use('/interested-party/confirm-your-email', confirmEmailRouter);

module.exports = router;
