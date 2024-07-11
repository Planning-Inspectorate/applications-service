const { getPageData } = require('./get-page-data');

let { getBackLinkUrl } = require('./get-back-link-url');

const { mockI18n } = require('../../../_mocks/i18n');

const examinationTranslations__EN = require('../../_translations/en.json');

jest.mock('./get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));

const i18n = mockI18n({
	examination: examinationTranslations__EN
});

const mockQuery = { text: 'mock query' };

describe('pages/examination/name/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('when setting the page data', () => {
			let result;

			const mockSession = {
				examination: {},
				currentView: {
					id: 'mock id',
					route: ''
				}
			};

			beforeEach(() => {
				getBackLinkUrl.mockReturnValue('back link url');
				result = getPageData(i18n, mockSession, mockQuery);
			});
			it('should return the page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'back link url',
					id: 'mock id',
					name: undefined,
					pageTitle: '',
					title: ''
				});
			});
		});
	});
});
