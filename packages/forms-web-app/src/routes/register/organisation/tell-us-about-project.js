const express = require('express');

const commentsController = require('../../../controllers/register/organisation/tell-us-about-project');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: commentsValidationRules,
} = require('../../../validators/register/organisation/tell-us-about-project');

const router = express.Router();

router.get('/tell-us-about-project', commentsController.getComments);

router.post(
  '/tell-us-about-project',
  commentsValidationRules(),
  validationErrorHandler,
  commentsController.postComments
);

module.exports = router;
