const expectedNoQueryValuesDatesFilterObj = {
	activeDateFilters: [],
	datesFilter: [
		{
			errorSummary: null,
			formGroups: [
				{
					errorMessage: null,
					errorMessageTitle: 'from',
					id: 'docments-page-date-from-form-group',
					inputNamePrefix: 'date-from',
					inputs: [
						{ classes: 'govuk-input--width-2', label: 'Day', name: 'day', value: '' },
						{ classes: 'govuk-input--width-2', label: 'Month', name: 'month', value: '' },
						{ classes: 'govuk-input--width-4', label: 'Year', name: 'year', value: '' }
					],
					name: 'date-from',
					title: 'From'
				},
				{
					errorMessage: null,
					errorMessageTitle: 'to',
					id: 'docments-page-date-to-form-group',
					inputNamePrefix: 'date-to',
					inputs: [
						{ classes: 'govuk-input--width-2', label: 'Day', name: 'day', value: '' },
						{ classes: 'govuk-input--width-2', label: 'Month', name: 'month', value: '' },
						{ classes: 'govuk-input--width-4', label: 'Year', name: 'year', value: '' }
					],
					name: 'date-to',
					title: 'To'
				}
			],
			isOpen: false,
			title: 'Date published',
			type: 'date'
		}
	],
	datesFilterErrorSummary: null
};

module.exports = { expectedNoQueryValuesDatesFilterObj };
