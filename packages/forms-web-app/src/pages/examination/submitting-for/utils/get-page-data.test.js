const { getPageData } = require('./get-page-data');

const { getBackLinkUrl } = require('./get-back-link-url');
const { getDeadlineDetailsInterestedPartyNumberOrDefault } = require('../../_session/deadline');
const { mockI18n } = require('../../../_mocks/i18n');

jest.mock('./get-back-link-url', () => ({
	getBackLinkUrl: jest.fn()
}));
jest.mock('../../_session/deadline', () => ({
	getDeadlineDetailsInterestedPartyNumberOrDefault: jest.fn()
}));

const examinationTranslations__EN = require('../../_translations/en.json');

const i18n = mockI18n({
	examination: examinationTranslations__EN
});
const mockQuery = {};
const mockSession = { examination: {} };

describe('pages/examination/submitting-for/utils/get-page-data', () => {
	describe('#getPageData', () => {
		describe('When getting the page data for the submitting for page', () => {
			let result;
			beforeEach(() => {
				getBackLinkUrl.mockReturnValue('mock/return/url');
				getDeadlineDetailsInterestedPartyNumberOrDefault.mockReturnValue('');
				result = getPageData(i18n, mockQuery, mockSession);
			});
			it('should return the submitting for page data', () => {
				expect(result).toEqual({
					backLinkUrl: 'mock/return/url',
					id: 'examination-submitting-for',
					interestedPartyNumber: '',
					options: [
						{
							text: 'Myself',
							value: 'myself'
						},
						{
							text: 'An organisation I work for',
							value: 'organisation'
						},
						{
							text: 'On behalf of another person, a household or another organisation I do not work for',
							value: 'agent'
						}
					]
				});
			});
		});
	});
});
