const {
	getParamsWithoutActiveDatesFilter
} = require('../utils/get-params-without-active-dates-filter');

const getActiveDateFilterViewModel = (query, label, tagAlt, tagText, inputNamePrefix) => ({
	label,
	tags: [
		{
			alt: tagAlt,
			icon: 'close',
			text: tagText,
			link: getParamsWithoutActiveDatesFilter(query, inputNamePrefix)
		}
	]
});

module.exports = { getActiveDateFilterViewModel };
