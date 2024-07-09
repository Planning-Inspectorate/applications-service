const { getUserIsSubmittingFor } = require('../../_session/deadline/helpers');
const { markActiveChecked } = require('../../_utils/mark-active-checked');
const { getSubmittingForOptions } = require('../config');

const formatSubmittingForOptions = (i18n, session) => {
	const submittingForOptions = getSubmittingForOptions(i18n);
	const formattedSubmittingForOptions = [
		submittingForOptions[1],
		submittingForOptions[2],
		submittingForOptions[3]
	];
	const userIsSubmittingFor = getUserIsSubmittingFor(session);
	return userIsSubmittingFor
		? markActiveChecked(formattedSubmittingForOptions, userIsSubmittingFor)
		: formattedSubmittingForOptions;
};

module.exports = { formatSubmittingForOptions };
