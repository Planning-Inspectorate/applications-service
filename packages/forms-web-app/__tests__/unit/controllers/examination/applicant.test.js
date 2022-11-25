const {
	getApplicant,
	postApplicant
} = require('../../../../src/controllers/examination/applicant');
const { mockReq, mockRes } = require('../../mocks');

const applicantOptions = {
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
	backLinkUrl: '/examination/have-an-interested-party-number',
	id: 'examination-applicant',
	options: [applicantOptions[1], applicantOptions[2]],
	pageTitle: 'Are you Test Project Name?',
	title: 'Are you Test Project Name?'
};

describe('controllers/examination/applicant', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				appData: {
					ProjectName: 'Test Project Name'
				},
				examination: {}
			}
		};
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getApplicant', () => {
		it('should call the correct template: no examination isApplicant session', () => {
			const mockRequest = req;

			getApplicant(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/is-applicant', pageData);
		});

		it('should call the correct template: with examination isApplicant session', () => {
			const mockRequest = {
				...req,
				session: {
					appData: {
						ProjectName: 'Test Project Name'
					},
					examination: {
						isApplicant: 'yes'
					}
				}
			};

			const setPageData = { ...pageData };
			const applicantValues = { ...applicantOptions };

			const updatedApplicantValues = Object.keys(applicantValues).map((value) => {
				const valueChecked =
					applicantValues[value].value === mockRequest.session.examination.isApplicant;

				if (!valueChecked) return applicantValues[value];

				return {
					...applicantValues[value],
					checked: 'checked'
				};
			});

			setPageData.options = updatedApplicantValues;

			getApplicant(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/is-applicant', setPageData);
		});
	});

	describe('postApplicant', () => {
		it('should render pages/examination/is-applicant with errors', () => {
			const mockRequest = {
				...req,
				body: {
					errors: {
						'examination-applicant': {
							msg: 'Select yes if you are #'
						}
					},
					errorSummary: [{ text: 'There were errors here', href: '#' }]
				}
			};

			postApplicant(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/is-applicant', {
				...pageData,
				errors: mockRequest.body.errors,
				errorSummary: mockRequest.body.errorSummary
			});
		});

		it('should redirect to /examination/check-your-answers', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-applicant': 'yes'
				},
				query: {
					mode: 'edit'
				}
			};

			postApplicant(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-answers');
		});

		it('should redirect to /examination/your-email-address', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-applicant': 'yes'
				}
			};

			postApplicant(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/your-email-address');
		});

		it('should redirect to /examination/who-are-you-submitting-for', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-applicant': 'no'
				}
			};

			postApplicant(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/who-are-you-submitting-for');
		});
	});
});
