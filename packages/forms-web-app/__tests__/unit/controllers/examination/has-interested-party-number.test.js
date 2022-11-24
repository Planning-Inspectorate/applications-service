const {
	getHasInterestedPartyNumber,
	postHasInterestedPartyNumber
} = require('../../../../src/controllers/examination/has-interested-party-number');
const { mockReq, mockRes } = require('../../mocks');

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
	backLinkUrl: '/examination/have-your-say-during-examination',
	hintHtml:
		'This is a unique reference number that identifies you as an interested party.<br />You will have been given this number when you registered.',
	id: 'examination-has-interested-party-number',
	options: [hasInterestedPartyNumberOptions[1], hasInterestedPartyNumberOptions[2]],
	pageTitle: 'Do you have an interested party number?',
	title: 'Do you have an interested party number?'
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
				...req
			};

			getHasInterestedPartyNumber(mockRequest, res);
			expect(res.render).toHaveBeenCalledWith(
				'pages/examination/has-interested-party-number',
				pageData
			);
		});

		it('should call the correct template: with session', () => {
			const mockRequest = {
				...req,
				session: {
					examination: {
						hasInterestedPartyNumber: 'yes'
					}
				}
			};

			const setPageData = { ...pageData };
			const hasInterestedPartyNumberValues = { ...hasInterestedPartyNumberOptions };

			const updatedHasInterestedPartyNumberValues = Object.keys(hasInterestedPartyNumberValues).map(
				(option) => {
					const optionChecked =
						hasInterestedPartyNumberValues[option].value ===
						mockRequest.session.examination.hasInterestedPartyNumber;

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
				'pages/examination/has-interested-party-number',
				setPageData
			);
		});
	});

	describe('postHasInterestedPartyNumber', () => {
		it('should render pages/examination/has-interested-party-number with errors', () => {
			const mockRequest = {
				...req,
				body: {
					errors: { a: 'b' },
					errorSummary: [{ text: 'There were errors here', href: '#' }]
				}
			};

			postHasInterestedPartyNumber(mockRequest, res);
			expect(res.render).toHaveBeenCalledWith('pages/examination/has-interested-party-number', {
				...pageData,
				errors: mockRequest.body.errors,
				errorSummary: mockRequest.body.errorSummary
			});
		});

		it('should redirect to /examination/check-your-answers', () => {
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
						hasInterestedPartyNumber: 'yes'
					}
				}
			};

			postHasInterestedPartyNumber(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-answers');
		});

		it('should redirect to /examination/your-interested-party-number', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-has-interested-party-number': 'yes'
				}
			};

			postHasInterestedPartyNumber(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/your-interested-party-number');
		});

		it('should redirect to /examination/are-you-applicant', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-has-interested-party-number': 'no'
				}
			};

			postHasInterestedPartyNumber(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/are-you-applicant');
		});
	});
});
