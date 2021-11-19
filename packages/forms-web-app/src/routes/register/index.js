const express = require('express');

const router = express.Router();

const startRouter = require('./start');
const typeOfPartyRouter = require('./type-of-party');
const fullNameRouter = require('./full-name');
const over18Router = require('./over-18');
const addressRouter = require('./address');
const emailRouter = require('./email');
const telephoneRouter = require('./telephone');
const commentsRouter = require('./comments');
const checkYourAnswersRouter = require('./check-your-answers');
const declarationRouter = require('./declaration');
const confirmationRouter = require('./confirmation');

router.use('/', startRouter);
router.use('/', typeOfPartyRouter);
router.use('/', fullNameRouter);
router.use('/', over18Router);
router.use('/', addressRouter);
router.use('/', emailRouter);
router.use('/', telephoneRouter);
router.use('/', commentsRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', declarationRouter);
router.use('/', confirmationRouter);

module.exports = router;
