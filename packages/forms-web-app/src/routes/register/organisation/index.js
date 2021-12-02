const express = require('express');

const router = express.Router();

const fullNameRouter = require('./full-name');
const over18Router = require('./over-18');
const organisationNameRouter = require('./organisation-name');
const roleRouter = require('./role');
const addressRouter = require('./address');
const emailRouter = require('./email');
const telephoneRouter = require('./telephone');
const commentsRouter = require('./comments');
const addAnotherCommentRouter = require('./add-another-comment');
const checkYourAnswersRouter = require('./check-your-answers');
const declarationRouter = require('./declaration');
const confirmationRouter = require('./confirmation');

router.use('/', fullNameRouter);
router.use('/', over18Router);
router.use('/', organisationNameRouter);
router.use('/', roleRouter);
router.use('/', addressRouter);
router.use('/', emailRouter);
router.use('/', telephoneRouter);
router.use('/', commentsRouter);
router.use('/', addAnotherCommentRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', declarationRouter);
router.use('/', confirmationRouter);

module.exports = router;
