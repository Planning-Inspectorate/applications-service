const {
	getPageData
} = require('../../../../../../src/controllers/examination/your-interested-party-number/utils/get-page-data');

let {
	getBackLinkUrl
} = require('../../../../../../src/controllers/examination/your-interested-party-number/utils/get-back-link-url');
const {
	getDeadlineDetailsInterestedPartyNumberOrDefault
} = require('../../../../../../src/controllers/examination/session/deadline/details/interested-party-number');

jest.mock(
	'../../../../../../src/controllers/examination/your-interested-party-number/utils/get-back-link-url',
	() => ({
		getBackLinkUrl: jest.fn()
	})
);
jest.mock(
	'../../../../../../src/controllers/examination/session/deadline/details/interested-party-number',
	() => ({
		getDeadlineDetailsInterestedPartyNumberOrDefault: jest.fn()
	})
);

describe('#getPageData', () => {
	describe('when setting the page data', () => {
		describe('and there is not a interested party number value value', () => {
			let result;
			beforeEach(() => {
				getDeadlineDetailsInterestedPartyNumberOrDefault.mockReturnValue('mock party number');
				getBackLinkUrl.mockReturnValue('back link url');
				result = getPageData({});
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'back link url',
					id: 'examination-your-interested-party-number',
					interestedPartyNumber: 'mock party number',
					pageTitle: "What's your interested party number?",
					title: "What's your interested party number?"
				});
			});
		});
	});
});
