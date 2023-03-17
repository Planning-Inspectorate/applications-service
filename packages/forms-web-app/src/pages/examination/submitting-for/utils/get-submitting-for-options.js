const { getUserIsSubmittingFor } = require('../../_session/deadline/helpers');
const { markActiveChecked } = require('../../_utils/mark-active-checked');
const {
	routesConfig: {
		examination: {
			pages: { submittingFor }
		}
	}
} = require('../../../../routes/config');

const getSubmittingForOptions = (session) => {
	const submittingForOptions = [
		submittingFor.options[1],
		submittingFor.options[2],
		submittingFor.options[3]
	];
	const userIsSubmittingFor = getUserIsSubmittingFor(session);
	return userIsSubmittingFor
		? markActiveChecked(submittingForOptions, userIsSubmittingFor)
		: submittingForOptions;
};

module.exports = { getSubmittingForOptions };
