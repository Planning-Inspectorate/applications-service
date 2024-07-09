const { getPageData } = require('./get-page-data');

describe('examination/has-interested-party-number/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the data for the has interested party number page', () => {
			const hasInterestedPartyNumberOptions = {
				1: {
					value: 'yes',
					text: 'Yes'
				},
				2: {
					value: 'no',
					text: 'No'
				}
			};
			const result = getPageData(hasInterestedPartyNumberOptions);
			it('should return the correct data', () => {
				expect(result).toEqual({
					backLinkUrl: 'have-your-say-during-examination',
					id: 'examination-has-interested-party-number',
					options: [hasInterestedPartyNumberOptions[1], hasInterestedPartyNumberOptions[2]]
				});
			});
		});
	});
});
