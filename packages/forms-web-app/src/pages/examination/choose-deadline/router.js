const express = require('express');
const { getChooseDeadline, postChooseDeadline } = require('./controller');
const {
	validateExaminationChooseDeadline
} = require('./_utils/validate-examination-choose-deadline');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');

const router = express.Router({ mergeParams: true });
const route = '/choose-deadline';

router.get(route, getChooseDeadline);
router.post(route, validateExaminationChooseDeadline(), validationErrorHandler, postChooseDeadline);

module.exports = router;
