const expectedInvalidDateDatesFilterObj = {
	activeDateFilters: [],
	datesFilter: [
		{
			errorSummary: {
				list: [
					{
						href: '#docments-page-date-from-form-group-error',
						text: 'The from date must be a real date'
					},
					{
						href: '#docments-page-date-to-form-group-error',
						text: 'The to date must be a real date'
					}
				],
				title: 'There is a problem'
			},
			formGroups: [
				{
					errorMessage: { text: 'The from date must be a real date' },
					errorMessageText: 'The from date must be a real date',
					errorMessageTitle: 'from',
					id: 'docments-page-date-from-form-group',
					inputNamePrefix: 'date-from',
					inputs: [
						{ classes: 'govuk-input--width-2 govuk-input--error', name: 'day', value: '32' },
						{ classes: 'govuk-input--width-2 govuk-input--error', name: 'month', value: '1' },
						{ classes: 'govuk-input--width-4 govuk-input--error', name: 'year', value: '2023' }
					],
					name: 'date-from',
					title: 'From'
				},
				{
					errorMessage: { text: 'The to date must be a real date' },
					errorMessageText: 'The to date must be a real date',
					errorMessageTitle: 'to',
					id: 'docments-page-date-to-form-group',
					inputNamePrefix: 'date-to',
					inputs: [
						{ classes: 'govuk-input--width-2 govuk-input--error', name: 'day', value: '2' },
						{ classes: 'govuk-input--width-2 govuk-input--error', name: 'month', value: 'abc' },
						{ classes: 'govuk-input--width-4 govuk-input--error', name: 'year', value: '2023' }
					],
					name: 'date-to',
					title: 'To'
				}
			],
			isOpen: true,
			title: 'Date published',
			type: 'date'
		}
	],
	datesFilterErrorSummary: {
		list: [
			{
				href: '#docments-page-date-from-form-group-error',
				text: 'The from date must be a real date'
			},
			{
				href: '#docments-page-date-to-form-group-error',
				text: 'The to date must be a real date'
			}
		],
		title: 'There is a problem'
	}
};

module.exports = { expectedInvalidDateDatesFilterObj };
