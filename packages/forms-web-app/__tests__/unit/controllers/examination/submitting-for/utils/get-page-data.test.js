const {
	getPageData
} = require('../../../../../../src/controllers/examination/submitting-for/utils/get-page-data');

const {
	getBackLinkUrl
} = require('../../../../../../src/controllers/examination/submitting-for/utils/get-back-link-url');
const {
	getSubmittingForOptions
} = require('../../../../../../src/controllers/examination/submitting-for/utils/get-submitting-for-options');

jest.mock(
	'../../../../../../src/controllers/examination/submitting-for/utils/get-back-link-url',
	() => ({
		getBackLinkUrl: jest.fn()
	})
);
jest.mock(
	'../../../../../../src/controllers/examination/submitting-for/utils/get-submitting-for-options',
	() => ({
		getSubmittingForOptions: jest.fn()
	})
);

describe('controllers/examination/submitting-for/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the page data for the submitting for page', () => {
			let result;
			beforeEach(() => {
				getBackLinkUrl.mockReturnValue('mock/return/url');
				getSubmittingForOptions.mockReturnValue([
					'mock option 1',
					'mock option 2',
					'mock option 3'
				]);
				result = getPageData();
			});
			it('should return the submitting for page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'mock/return/url',
					id: 'examination-submitting-for',
					options: ['mock option 1', 'mock option 2', 'mock option 3'],
					pageTitle: 'Who are you making the submission for?',
					title: 'Who are you making the submission for?'
				});
			});
		});
	});
});
