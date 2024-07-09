const { getHasInterestedPartyNumber, postHasInterestedPartyNumber } = require('./controller');
const { mockReq, mockRes } = require('../../../../__tests__/unit/mocks');
const { mockI18n } = require('../../_mocks/i18n');
const commonTranslations_EN = require('../../../locales/en/common.json');

const i18n = mockI18n({
	common: commonTranslations_EN
});

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

const pageData = {
	backLinkUrl: 'have-your-say-during-examination',
	id: 'examination-has-interested-party-number',
	options: [hasInterestedPartyNumberOptions[1], hasInterestedPartyNumberOptions[2]]
};

describe('controllers/examination/has-interested-party-number', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				examination: {}
			}
		};
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getHasInterestedPartyNumber', () => {
		it('should call the correct template: no session', () => {
			const mockRequest = {
				...req,
				i18n
			};

			getHasInterestedPartyNumber(mockRequest, res);
			expect(res.render).toHaveBeenCalledWith(
				'examination/has-interested-party-number/view.njk',
				pageData
			);
		});

		it('should call the correct template: with session', () => {
			const mockRequest = {
				...req,
				session: {
					examination: {
						hasInterestedPartyNo: 'yes'
					}
				},
				i18n
			};

			const setPageData = { ...pageData };
			const hasInterestedPartyNumberValues = { ...hasInterestedPartyNumberOptions };

			const updatedHasInterestedPartyNumberValues = Object.keys(hasInterestedPartyNumberValues).map(
				(option) => {
					const optionChecked =
						hasInterestedPartyNumberValues[option].value ===
						mockRequest.session.examination.hasInterestedPartyNo;

					if (!optionChecked) return hasInterestedPartyNumberValues[option];

					return {
						...hasInterestedPartyNumberValues[option],
						checked: 'checked'
					};
				}
			);

			setPageData.options = updatedHasInterestedPartyNumberValues;

			getHasInterestedPartyNumber(mockRequest, res);
			expect(res.render).toHaveBeenCalledWith(
				'examination/has-interested-party-number/view.njk',
				setPageData
			);
		});
	});

	describe('postHasInterestedPartyNumber', () => {
		it('should render examination/has-interested-party-number/view.njk with errors', () => {
			const mockRequest = {
				...req,
				body: {
					errors: { a: 'b' },
					errorSummary: [{ text: 'There were errors here', href: '#' }]
				},
				i18n
			};

			postHasInterestedPartyNumber(mockRequest, res);
			expect(res.render).toHaveBeenCalledWith('examination/has-interested-party-number/view.njk', {
				...pageData,
				errors: mockRequest.body.errors,
				errorSummary: mockRequest.body.errorSummary
			});
		});

		it('should redirect to check-your-answers', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-has-interested-party-number': 'yes'
				},
				query: {
					mode: 'edit'
				},
				session: {
					examination: {
						hasInterestedPartyNo: 'yes'
					}
				},
				i18n
			};

			postHasInterestedPartyNumber(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('check-your-answers');
		});

		it('should redirect to your-interested-party-number', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-has-interested-party-number': 'yes'
				},
				i18n
			};

			postHasInterestedPartyNumber(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('your-interested-party-number');
		});

		it('should redirect to are-you-applicant', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-has-interested-party-number': 'no'
				},
				i18n
			};

			postHasInterestedPartyNumber(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('are-you-applicant');
		});
	});
});
