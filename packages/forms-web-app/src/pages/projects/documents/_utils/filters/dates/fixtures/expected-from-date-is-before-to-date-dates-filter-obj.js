const expectedFromDateIsBeforeToDateDatesFilterObj = {
	activeDateFilters: [
		{
			label: 'Date from',
			tags: [
				{
					icon: 'close',
					link: '?date-to-day=2&date-to-month=1&date-to-year=2023',
					textHtml: `<span class="govuk-visually-hidden">Remove documents published before</span> 1 January 2023 <span class="govuk-visually-hidden">filter</span>`
				}
			]
		},
		{
			label: 'Date to',
			tags: [
				{
					icon: 'close',
					link: '?date-from-day=1&date-from-month=1&date-from-year=2023',
					textHtml: `<span class="govuk-visually-hidden">Remove documents published after</span> 2 January 2023 <span class="govuk-visually-hidden">filter</span>`
				}
			]
		}
	],
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
						{ classes: 'govuk-input--width-2', name: 'day', value: '1' },
						{ classes: 'govuk-input--width-2', name: 'month', value: '1' },
						{ classes: 'govuk-input--width-4', name: 'year', value: '2023' }
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
						{ classes: 'govuk-input--width-2', name: 'day', value: '2' },
						{ classes: 'govuk-input--width-2', name: 'month', value: '1' },
						{ classes: 'govuk-input--width-4', name: 'year', value: '2023' }
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

module.exports = { expectedFromDateIsBeforeToDateDatesFilterObj };
