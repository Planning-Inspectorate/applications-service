const { getFilters } = require('./get-filters');

describe('pages/projects/relevant-representations/_utils/get-filters', () => {
	describe('#getFilters', () => {
		describe('When getting the filters for the relevant representations page', () => {
			describe('and no filters have been applied', () => {
				let filters;

				const mockQuery = {};
				const mockFilters = [
					{ name: 'mock filter 1', count: 1 },
					{ name: 'mock filter 2', count: 2 },
					{ name: 'mock filter 3', count: 3 }
				];

				beforeEach(() => {
					filters = getFilters(mockQuery, mockFilters);
				});

				it('should return the filters with no active filters', () => {
					expect(filters).toEqual({
						activeFilters: [],
						filterNameID: 'type',
						filters: [
							{
								checked: false,
								label: 'Mock filter 1',
								text: 'Mock filter 1 (1)',
								value: 'mock filter 1'
							},
							{
								checked: false,
								label: 'Mock filter 2',
								text: 'Mock filter 2 (2)',
								value: 'mock filter 2'
							},
							{
								checked: false,
								label: 'Mock filter 3',
								text: 'Mock filter 3 (3)',
								value: 'mock filter 3'
							}
						]
					});
				});
			});

			describe('and filters have been applied', () => {
				let filters;

				const mockQuery = {
					type: ['mock filter 1', 'mock filter 3']
				};
				const mockFilters = [
					{ name: 'mock filter 1', count: 1 },
					{ name: 'mock filter 2', count: 2 },
					{ name: 'mock filter 3', count: 3 }
				];

				beforeEach(() => {
					filters = getFilters(mockQuery, mockFilters);
				});

				it('should return the filters with active filters', () => {
					expect(filters).toEqual({
						activeFilters: [
							{
								label: undefined,
								tags: [
									{
										icon: 'close',
										link: '?type=mock+filter+3',
										textHtml:
											'<span class="govuk-visually-hidden">Remove</span> Mock filter 1 <span class="govuk-visually-hidden">filter</span>'
									},
									{
										icon: 'close',
										link: '?type=mock+filter+1',
										textHtml:
											'<span class="govuk-visually-hidden">Remove</span> Mock filter 3 <span class="govuk-visually-hidden">filter</span>'
									}
								]
							}
						],
						filterNameID: 'type',
						filters: [
							{
								checked: true,
								label: 'Mock filter 1',
								text: 'Mock filter 1 (1)',
								value: 'mock filter 1'
							},
							{
								checked: false,
								label: 'Mock filter 2',
								text: 'Mock filter 2 (2)',
								value: 'mock filter 2'
							},
							{
								checked: true,
								label: 'Mock filter 3',
								text: 'Mock filter 3 (3)',
								value: 'mock filter 3'
							}
						]
					});
				});
			});
		});
	});
});
