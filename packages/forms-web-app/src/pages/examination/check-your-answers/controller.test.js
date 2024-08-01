const { getCheckYourAnswers } = require('./controller');
const { getPageData } = require('./utils/get-page-data');
const { mockI18n } = require('../../_mocks/i18n');
const commonTranslations_EN = require('../../../locales/en/common.json');

const i18n = mockI18n({
	common: commonTranslations_EN
});

jest.mock('./utils/get-page-data', () => ({
	getPageData: jest.fn()
}));

describe('examination/check-your-answers/controller', () => {
	describe('#getCheckYourAnswers', () => {
		const res = { render: jest.fn(), status: jest.fn(() => res) };
		const req = { session: { mockSession: 'mock session' }, i18n };
		describe('When getting the check your answers page', () => {
			describe('and there is an error', () => {
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('no page data');
					});
					getCheckYourAnswers(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there are no issue', () => {
				const mockPageData = { mockPageData: 'mock page data' };
				beforeEach(() => {
					getPageData.mockReturnValue(mockPageData);
					getCheckYourAnswers(req, res);
				});
				it('should call the functions', () => {
					expect(getPageData).toBeCalledWith(req.i18n, req.session);
				});
				it('should render the check your answers page', () => {
					expect(res.render).toHaveBeenCalledWith(
						'examination/check-your-answers/view.njk',
						mockPageData
					);
				});
			});
		});
	});
});
