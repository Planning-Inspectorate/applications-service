const { getApplicant, postApplicant } = require('./controller');
const { mockReq, mockRes } = require('../../../../__tests__/unit/mocks');

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
	pageTitle: 'Are you Mock promoter name?',
	title: 'Are you Mock promoter name?'
};

describe('examination/applicant', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				appData: {
					ProjectName: 'Test Project Name'
				},
				promoterName: 'Mock promoter name',
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

			expect(res.render).toHaveBeenCalledWith('examination/applicant/view.njk', pageData);
		});

		it('should call the correct template: with examination isApplicant session', () => {
			const mockRequest = {
				...req,
				session: {
					appData: {
						ProjectName: 'Test Project Name'
					},
					promoterName: 'Mock promoter name',
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

			expect(res.render).toHaveBeenCalledWith('examination/applicant/view.njk', setPageData);
		});
	});

	describe('postApplicant', () => {
		it('should render pages/examination/applicant with errors', () => {
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

			expect(res.render).toHaveBeenCalledWith('examination/applicant/view.njk', {
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
