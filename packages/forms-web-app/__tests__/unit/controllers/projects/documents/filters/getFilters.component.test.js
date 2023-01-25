const {
	getFilters
} = require('../../../../../../src/controllers/projects/documents/utils/filters/getFilters');
describe('component', () => {
	describe('#getFilters', () => {
		describe('When getting the filters for the UI', () => {
			const mockFilters = [
				{
					name: 'stage',
					value: '1',
					count: '1',
					label: 'i am a label 1',
					type: [
						{ value: 'first', count: '1' },
						{ value: 'should not be checked', count: '5' }
					]
				},
				{
					name: 'stage',
					value: '2',
					count: '7',
					label: 'i am a label 2',
					type: [
						{ value: 'second', count: '2' },
						{ value: 'third', count: '1' }
					]
				}
			];
			const mockQuery = { 'stage-1': 'first', 'stage-2': ['second', 'third'] };
			const result = getFilters(mockFilters, mockQuery);
			it('should return the filters in mapped and in the view model', () => {
				expect(result).toEqual({
					activeFilters: [
						{
							label: 'i am a label 1',
							tags: [
								{
									params: 'stage-2=second&stage-2=third',
									text: 'first'
								}
							]
						},
						{
							label: 'i am a label 2',
							tags: [
								{
									params: 'stage-1=first&stage-2=third',
									text: 'second'
								},
								{
									params: 'stage-1=first&stage-2=second',
									text: 'third'
								}
							]
						}
					],
					filters: [
						{
							idPrefix: 'stage-1',
							items: [
								{
									checked: true,
									text: 'first (1)',
									value: 'first'
								},
								{
									checked: false,
									text: 'should not be checked (5)',
									value: 'should not be checked'
								}
							],
							label: 'i am a label 1',
							name: 'stage-1',
							title: 'i am a label 1 (1)'
						},
						{
							idPrefix: 'stage-2',
							items: [
								{
									checked: true,
									text: 'second (2)',
									value: 'second'
								},
								{
									checked: true,
									text: 'third (1)',
									value: 'third'
								}
							],
							label: 'i am a label 2',
							name: 'stage-2',
							title: 'i am a label 2 (7)'
						}
					]
				});
			});
		});
	});
});
