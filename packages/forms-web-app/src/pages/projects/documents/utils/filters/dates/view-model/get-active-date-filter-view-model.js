const {
	getParamsWithoutActiveDatesFilter
} = require('../utils/get-params-without-active-dates-filter');

const getActiveDateFilterViewModel = (query, label, filterName, filterValue, inputNamePrefix) => ({
	label,
	tags: [
		{
			icon: 'close',
			textHtml: `<span class="govuk-visually-hidden">Remove ${filterName}</span> ${filterValue} <span class="govuk-visually-hidden">filter</span>`,
			link: getParamsWithoutActiveDatesFilter(query, inputNamePrefix)
		}
	]
});

module.exports = { getActiveDateFilterViewModel };
