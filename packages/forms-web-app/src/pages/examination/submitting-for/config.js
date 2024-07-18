const submittingForOptionValues = {
	1: 'myself',
	2: 'organisation',
	3: 'agent'
};

const getSubmittingForOptions = (i18n) => ({
	1: {
		value: submittingForOptionValues[1],
		text: i18n.t('examination.submittingFor.options.myself')
	},
	2: {
		value: submittingForOptionValues[2],
		text: i18n.t('examination.submittingFor.options.organisation')
	},
	3: {
		value: submittingForOptionValues[3],
		text: i18n.t('examination.submittingFor.options.agent')
	}
});

module.exports = { submittingForOptionValues, getSubmittingForOptions };
