const {
	getAddAnotherDeadlineItem,
	postAddAnotherDeadlineItem,
	postChangeADeadlineItem
} = require('../../../../../src/controllers/examination/add-another-deadline-item/controller');
const {
	getPageData
} = require('../../../../../src/controllers/examination/add-another-deadline-item/utils/get-page-data');

jest.mock(
	'../../../../../src/controllers/examination/add-another-deadline-item/utils/get-page-data',
	() => ({
		getPageData: jest.fn()
	})
);

describe('controllers/examination/add-another-deadline-item/controller', () => {
	describe('#getAddAnotherDeadlineItem', () => {
		describe('When getting the add another deadline item page', () => {
			describe('and there is an error', () => {
				const res = { render: jest.fn(), status: jest.fn(() => res) };
				const req = { session: 'mock session' };
				beforeEach(() => {
					getPageData.mockImplementation(() => {
						throw new Error('no page data');
					});
					getAddAnotherDeadlineItem(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and the page renders', () => {
				const res = { render: jest.fn() };
				const req = { session: 'mock session' };
				beforeEach(() => {
					getPageData.mockReturnValue({ text: 'mock page data' });
					getAddAnotherDeadlineItem(req, res);
				});
				it('should render the page with the page data', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/add-another-deadline-item', {
						text: 'mock page data'
					});
				});
			});
		});
	});
	describe('#postAddAnotherDeadlineItem', () => {
		describe('When posting add another deadline item', () => {
			const res = { render: jest.fn(), status: jest.fn(() => res), redirect: jest.fn() };
			const req = { session: 'mock session', body: {} };
			describe('and there is an error', () => {
				beforeEach(() => {
					postAddAnotherDeadlineItem(req, res);
				});
				it('should render the error page', () => {
					expect(res.status).toHaveBeenCalledWith(500);
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and there errors with the body', () => {
				beforeEach(() => {
					req.body = {
						errors: { 'examination-add-another-deadline-item': 'an error' },
						errorSummary: [{ text: 'Error summary', href: '#' }]
					};
					getPageData.mockReturnValue({ text: 'mock page data' });
					postAddAnotherDeadlineItem(req, res);
				});
				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('pages/examination/add-another-deadline-item', {
						errorSummary: [
							{
								href: '#',
								text: 'Error summary'
							}
						],
						errors: {
							'examination-add-another-deadline-item': 'an error'
						},
						text: 'mock page data'
					});
				});
			});
			describe('and there are no issues', () => {
				beforeEach(() => {
					req.body = {
						'examination-add-another-deadline-item': 'yes'
					};
					getPageData.mockReturnValue({ text: 'mock page data' });
					postAddAnotherDeadlineItem(req, res);
				});
				it('should render the error page', () => {
					expect(res.redirect).toHaveBeenCalledWith('/examination/select-deadline-item');
				});
			});
		});
	});
	describe('#postChangeADeadlineItem', () => {
		describe('When changing a deadline item', () => {
			const res = {
				render: jest.fn(),
				redirect: jest.fn(),
				status: jest.fn(() => res)
			};
			const req = { body: {}, session: { examination: {} } };
			describe('and there is no item id ', () => {
				beforeEach(() => {
					postChangeADeadlineItem(req, res);
				});
				it('should render the error page', () => {
					expect(res.render).toHaveBeenCalledWith('error/unhandled-exception');
				});
			});
			describe('and the item id is present', () => {
				beforeEach(() => {
					req.body.itemIdToChange = 1;
					postChangeADeadlineItem(req, res);
				});
				it('should redirect', () => {
					expect(res.redirect).toHaveBeenCalledWith('/examination/check-your-deadline-item');
				});
			});
		});
	});
});
