const express = require('express');

const router = express.Router();

const fullNameRouter = require('./full-name');
const over18Router = require('./are-you-18-over');
const addressRouter = require('./address');
const emailRouter = require('./email-address');
const telephoneRouter = require('./telephone');
const commentsRouter = require('./comments');
const checkYourAnswersRouter = require('./check-your-answers');
const declarationRouter = require('./declaration');
const confirmationRouter = require('./confirmation');

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
