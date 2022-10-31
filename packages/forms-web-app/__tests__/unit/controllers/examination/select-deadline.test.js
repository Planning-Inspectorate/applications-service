const {
	getSelectDeadline,
	postSelectDeadline
} = require('../../../../src/controllers/examination/select-deadline/controller');
const { mockReq, mockRes } = require('../../mocks');

const selectDeadlineOptions = [
	{
		value: '0',
		text: 'selectDeadlineOption 1'
	},
	{
		value: '1',
		text: 'selectDeadlineOption 2'
	},
	{
		value: '2',
		text: 'selectDeadlineOption 3'
	}
];

const pageData = {
	backLinkUrl: '/examination/your-email-address',
	hintText:
		'Select the item you want to submit against. You can submit against another item later.',
	id: 'examination-select-deadline',
	options: selectDeadlineOptions,
	pageTitle: 'Which item would you like to submit against for this deadline?',
	title: 'Which item would you like to submit against for this deadline?'
};

describe('controllers/examination/select-deadline', () => {
	let req;
	let res;

	beforeEach(() => {
		req = {
			...mockReq(),
			session: {
				examination: {
					deadlineItems: selectDeadlineOptions
				}
			}
		};
		res = mockRes();

		jest.resetAllMocks();
	});

	describe('getSelectDeadline', () => {
		it('should call the correct template: no session', () => {
			const mockRequest = {
				...req
			};

			getSelectDeadline(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/select-deadline', pageData);
		});

		it('should call the correct template: with session', () => {
			const mockRequest = {
				...req,
				session: {
					examination: {
						deadlineItems: selectDeadlineOptions,
						selectedDeadlineItems: {
							active: '0'
						}
					}
				}
			};

			const setPageData = { ...pageData };
			const selectDeadlineValues = [...pageData.options];

			const updatedSelectDeadlineValues = selectDeadlineValues.map((selectDeadlineValue) => {
				const valueChecked =
					selectDeadlineValue.value ===
					mockRequest.session.examination.selectedDeadlineItems.activeId;

				if (!valueChecked) return selectDeadlineValue;

				return {
					...selectDeadlineValue,
					checked: 'checked'
				};
			});

			setPageData.options = updatedSelectDeadlineValues;

			getSelectDeadline(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/select-deadline', setPageData);
		});
	});

	describe('postSubmittingFor', () => {
		it('should render pages/examination/select-deadline with errors', () => {
			const mockRequest = {
				...req,
				body: {
					errors: { a: 'b' },
					errorSummary: [{ text: 'There were errors here', href: '#' }]
				}
			};

			postSelectDeadline(mockRequest, res);

			expect(res.render).toHaveBeenCalledWith('pages/examination/select-deadline', {
				...pageData,
				errors: mockRequest.body.errors,
				errorSummary: mockRequest.body.errorSummary
			});
		});

		it('should redirect to /examination/select-upload-evidence-or-comment', () => {
			const mockRequest = {
				...req,
				body: {
					'examination-select-deadline': '0'
				}
			};

			postSelectDeadline(mockRequest, res);

			expect(res.redirect).toHaveBeenCalledWith('/examination/select-upload-evidence-or-comment');
		});
	});
});
