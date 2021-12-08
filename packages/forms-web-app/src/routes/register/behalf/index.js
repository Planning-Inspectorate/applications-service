const express = require('express');

const router = express.Router();

const representingForRouter = require('./representing-for');
const representeeNameRouter = require('./representee-name');
const representeeOver18Router = require('./representee-over-18');
const representeeAddressRouter = require('./representee-address');
const representeeEmailRouter = require('./representee-email');
const representeeTelephoneRouter = require('./representee-telephone');

const fullNameRouter = require('./full-name');
const over18Router = require('./over-18');
const addressRouter = require('./address');
const emailRouter = require('./email');
const telephoneRouter = require('./telephone');


const commentsRouter = require('./comments');
const addAnotherCommentRouter = require('./add-another-comment');
const removeCommentRouter = require('./remove-comment');
const checkYourAnswersRouter = require('./check-your-answers');
const declarationRouter = require('./declaration');
const confirmationRouter = require('./confirmation');

router.use('/', representingForRouter);
router.use('/', representeeNameRouter);
router.use('/', representeeOver18Router);
router.use('/', representeeAddressRouter);
router.use('/', representeeEmailRouter);
router.use('/', representeeTelephoneRouter);

router.use('/', fullNameRouter);
router.use('/', over18Router);
router.use('/', addressRouter);
router.use('/', emailRouter);
router.use('/', telephoneRouter);

router.use('/', commentsRouter);
router.use('/', addAnotherCommentRouter);
router.use('/', removeCommentRouter);
router.use('/', checkYourAnswersRouter);
router.use('/', declarationRouter);
router.use('/', confirmationRouter);

module.exports = router;
