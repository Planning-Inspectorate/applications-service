const express = require('express');
const { validateNotEmpty } = require('../../../validators/shared');
const { validationErrorHandler } = require('../../../validators/validation-error-handler');
const { getChooseDeadline, postChooseDeadline } = require('./controller');

const router = express.Router({ mergeParams: true });
const { chooseDeadlineId } = require('./config');
const route = '/choose-deadline';

router.get(route, getChooseDeadline);
router.post(
	route,
	validateNotEmpty({
		id: chooseDeadlineId,
		onError: { message: { isEmpty: 'Select a deadline' } }
	}),
	validationErrorHandler,
	postChooseDeadline
);

module.exports = router;
