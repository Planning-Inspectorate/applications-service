const express = require('express');

const router = express.Router();

const homeRouter = require('./home');
const cookieRouter = require('./cookies');
const overviewRouter = require('./overview');
const projectSearchRouter = require('./project-search');
const guidancePagesRouter = require('./guidance-pages');
const registerRouter = require('./register');
const interestedPartyRouter = require('./interested-party-guide');
const documentLibraryRouter = require('./document-library');
const footerPagesRouter = require('./footer-pages');
const confirmEmailRouter = require('./register/confirm-email');
const representationsRouter = require('./representations');
const timetableRouter = require('./timetable');
const allExaminationDocsRouter = require('./all-examination-documents');
const recommendationsRouter = require('./recommendations');

router.use('/', homeRouter);
router.use('/', guidancePagesRouter);
router.use('/', footerPagesRouter);
router.use('/cookies', cookieRouter);
router.use('/overview', overviewRouter);
router.use('/project-search', projectSearchRouter);
router.use('/register', registerRouter);
router.use(interestedPartyRouter);
router.use('/document-library', documentLibraryRouter);
router.use('/interested-party/confirm-your-email', confirmEmailRouter);
router.use('/representations', representationsRouter);
router.use('/timetable', timetableRouter);
router.use('/all-examination-documents', allExaminationDocsRouter);
router.use('/recommendations', recommendationsRouter);

module.exports = router;
