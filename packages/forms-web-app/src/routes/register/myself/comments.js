const express = require('express');

const commentsController = require('../../../controllers/register/myself/comments');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: commentsValidationRules,
} = require('../../../validators/register/comments');


const router = express.Router();

router.get('/comments', commentsController.getComments);

router.post(
  '/comments',
  commentsValidationRules(),
  validationErrorHandler,
  commentsController.postComments
);

module.exports = router;