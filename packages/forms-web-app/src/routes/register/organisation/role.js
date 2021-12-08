const express = require('express');

const roleController = require('../../../controllers/register/organisation/role');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const {
  rules: roleValidationRules,
} = require('../../../validators/register/organisation/role');


const router = express.Router();

router.get('/role', roleController.getRole);

router.post(
  '/role',
  roleValidationRules(),
  validationErrorHandler,
  roleController.postRole
);

module.exports = router;