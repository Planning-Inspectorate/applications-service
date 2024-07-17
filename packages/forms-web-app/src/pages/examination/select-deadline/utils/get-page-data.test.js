const { getPageData } = require('./get-page-data');

const { getBackLinkUrl } = require('./get-back-link-url');
const { getDeadlineItemOptions } = require('./get-deadline-item-options');

jest.mock('./get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));
jest.mock('./get-deadline-item-options', () => ({
	getDeadlineItemOptions: jest.fn()
}));

describe('pages/examination/select-deadline/utils/get-page-data', () => {
	const req = {
		i18n: jest.fn(),
		query: 'mock query',
		session: 'mock session'
	};

	const mockDeadlineItemOptions = [
		'mock deadline item 1',
		'mock deadline item 2',
		'mock deadline item 3'
	];

	const pageData = {
		backLinkUrl: 'mock back link url',
		id: 'examination-select-deadline',
		options: mockDeadlineItemOptions
	};

	describe('#getPageData', () => {
		describe('When getting the page data for the select deadline page', () => {
			describe('and there is no active submission item id', () => {
				let result;

				beforeEach(() => {
					getBackLinkUrl.mockReturnValue(pageData.backLinkUrl);
					getDeadlineItemOptions.mockReturnValue(mockDeadlineItemOptions);

					result = getPageData(req.i18n, req.query, req.session);
				});

				it('should call the functions', () => {
					expect(getBackLinkUrl).toHaveBeenCalledWith(req.query, req.session);
					expect(getDeadlineItemOptions).toHaveBeenCalledWith(req.i18n, req.session);
				});

				it('should return the page data with no checked option', () => {
					expect(result).toEqual(pageData);
				});
			});
		});
	});
});
