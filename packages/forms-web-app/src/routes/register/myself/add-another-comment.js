const express = require('express');

const addAnotherCommentController = require('../../../controllers/register/myself/add-another-comment');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: addAnotherCommentValidationRules,
} = require('../../../validators/register/myself/add-another-comment');


const router = express.Router();

router.get('/add-another-comment', addAnotherCommentController.getAnotherComment);

router.post(
  '/add-another-comment',
  addAnotherCommentValidationRules(),
  validationErrorHandler,
  addAnotherCommentController.postAnotherComment
);

module.exports = router;