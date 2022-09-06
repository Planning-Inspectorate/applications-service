const {
	getSubmittingFor,
	postSubmittingFor
} = require('../../../../src/controllers/examination/submitting-for');
const { mockReq, mockRes } = require('../../mocks');

const submittingForOptions = {
	1: {
		value: 'myself',
		text: 'Myself'
	},
	2: {
		value: 'organisation',
		text: 'An organisation I work for'
	},
	3: {
		value: 'agent',
		text: 'On behalf of another person, a family group or another organisation I do not work for'
	}
};

const submittingForData = {
	backLinkUrl: `/examination/are-you-applicant`,
	id: 'examination-submitting-for',
	options: [submittingForOptions[1], submittingForOptions[2], submittingForOptions[3]],
	pageTitle: 'Who are you making the submission for?',
	title: 'Who are you making the submission for?'
};

describe('controllers/examination/submitting-for', () => {
	let req;
	let res;

	beforeEach(() => {
		req = mockReq();
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getSubmittingFor', () => {
		it('should call the correct template: no session', () => {
			const mockRequest = {
				...req
			};

			getSubmittingFor(mockRequest, res);
			expect(res.render).toHaveBeenCalledWith(
				'pages/examination/submitting-for',
				submittingForData
			);
		});

		it('should call the correct template: with session', () => {
			const mockRequest = {
				...req,
				session: {
					examination: {
						submitter: 'organisation'
					}
				}
			};

			const setSubmittingForData = { ...submittingForData };
			const submittingForValues = { ...submittingForOptions };

			const updatedSubmittingForValues = Object.keys(submittingForValues).map((option) => {
				const optionChecked =
					submittingForValues[option].value === mockRequest.session.examination.submitter;

				if (!optionChecked) return submittingForValues[option];

				return {
					...submittingForValues[option],
					checked: 'checked'
				};
			});

			setSubmittingForData.options = updatedSubmittingForValues;

			getSubmittingFor(mockRequest, res);
			expect(res.render).toHaveBeenCalledWith(
				'pages/examination/submitting-for',
				setSubmittingForData
			);
		});
	});

	describe('postSubmittingFor', () => {
		it('should render pages/examination/submitting-for with errors', () => {
			const mockRequest = {
				...req,
				body: {
					errors: { a: 'b' },
					errorSummary: [{ text: 'There were errors here', href: '#' }]
				}
			};

			postSubmittingFor(mockRequest, res);
			expect(res.render).toHaveBeenCalledWith('pages/examination/submitting-for', {
				...submittingForData,
				errors: mockRequest.body.errors,
				errorSummary: mockRequest.body.errorSummary
			});
		});

		it('should redirect to /examination/check-your-answers', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-submitting-for': 'myself'
				},
				query: {
					mode: 'edit'
				},
				session: {
					examination: {
						submitter: 'myself'
					}
				}
			};

			postSubmittingFor(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-answers');
		});

		it('should redirect to /examination/your-name', () => {
			const mockRequest = {
				...req,
				body: {
					['examination-submitting-for']: 'myself'
				}
			};

			postSubmittingFor(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/your-name');
		});

		it('should redirect to /examination/your-organisation-name', () => {
			const mockRequest = {
				...req,
				body: {
					['examination-submitting-for']: 'organisation'
				}
			};

			postSubmittingFor(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/your-organisation-name');
		});

		it('should redirect to /examination/name-of-person-or-group', () => {
			const mockRequest = {
				...req,
				body: {
					['examination-submitting-for']: 'agent'
				}
			};

			postSubmittingFor(mockRequest, res);
			expect(res.redirect).toHaveBeenCalledWith('/examination/name-of-person-or-group');
		});
	});
});
