const expectedMissingDateValuesDatesFilterObj = {
	activeDateFilters: [],
	datesFilter: [
		{
			errorSummary: {
				list: [
					{
						href: '#docments-page-date-from-form-group-error',
						text: 'The from date must include year'
					},
					{
						href: '#docments-page-date-to-form-group-error',
						text: 'The to date must include day and month'
					}
				],
				title: 'There is a problem'
			},
			formGroups: [
				{
					errorMessage: { text: 'The from date must include year' },
					errorMessageText: 'The from date must include year',
					errorMessageTitle: 'from',
					id: 'docments-page-date-from-form-group',
					inputNamePrefix: 'date-from',
					inputs: [
						{ classes: 'govuk-input--width-2', label: 'Day', name: 'day', value: '2' },
						{ classes: 'govuk-input--width-2', label: 'Month', name: 'month', value: '1' },
						{
							classes: 'govuk-input--width-4 govuk-input--error',
							label: 'Year',
							name: 'year',
							value: ''
						}
					],
					name: 'date-from',
					title: 'From'
				},
				{
					errorMessage: { text: 'The to date must include day and month' },
					errorMessageText: 'The to date must include day and month',
					errorMessageTitle: 'to',
					id: 'docments-page-date-to-form-group',
					inputNamePrefix: 'date-to',
					inputs: [
						{
							classes: 'govuk-input--width-2 govuk-input--error',
							label: 'Day',
							name: 'day',
							value: ''
						},
						{
							classes: 'govuk-input--width-2 govuk-input--error',
							label: 'Month',
							name: 'month',
							value: ''
						},
						{ classes: 'govuk-input--width-4', label: 'Year', name: 'year', value: '2023' }
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
				text: 'The from date must include year'
			},
			{
				href: '#docments-page-date-to-form-group-error',
				text: 'The to date must include day and month'
			}
		],
		title: 'There is a problem'
	}
};

module.exports = { expectedMissingDateValuesDatesFilterObj };
