const express = require('express');

const removeComentController = require('../../../controllers/register/behalf/remove-comment');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const {
    rules: removeCommentRules,
  } = require('../../../validators/register/behalf/remove-comment');

const router = express.Router();

router.get('/remove-comment', removeComentController.getRemoveComment);

router.post(
    '/remove-comment',
    removeCommentRules(),
    validationErrorHandler,
    removeComentController.postRemoveComment
  );

module.exports = router;