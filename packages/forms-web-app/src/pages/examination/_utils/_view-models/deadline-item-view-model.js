const { getContentByLocale } = require('../../../_utils/get-content-by-locale');

const deadlineItemViewModel = (text, value) => ({
	text,
	value
});

const getDeadlineItemViewModelLocale = (i18n, { text, textWelsh, value }) => {
	const textByLocale = getContentByLocale(i18n, text, textWelsh);

	return deadlineItemViewModel(textByLocale, value);
};

module.exports = { deadlineItemViewModel, getDeadlineItemViewModelLocale };
