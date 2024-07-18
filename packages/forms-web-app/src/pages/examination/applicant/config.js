const applicantOptionValues = {
	1: 'yes',
	2: 'no'
};

const getApplicantOptions = (i18n) => ({
	1: {
		value: applicantOptionValues[1],
		text: i18n.t('common.yes1')
	},
	2: {
		value: applicantOptionValues[2],
		text: i18n.t('common.no1')
	}
});

module.exports = { applicantOptionValues, getApplicantOptions };
