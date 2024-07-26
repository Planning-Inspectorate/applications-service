const personalInformationWhichOptionValues = {
	1: 'comment'
};

const getPersonalInformationWhichOptions = (i18n) => ({
	1: {
		text: i18n.t('examination.personalInformationWhich.common.options.comment'),
		value: personalInformationWhichOptionValues[1]
	}
});

module.exports = { personalInformationWhichOptionValues, getPersonalInformationWhichOptions };
