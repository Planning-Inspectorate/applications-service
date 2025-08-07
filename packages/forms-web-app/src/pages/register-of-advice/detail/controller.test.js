const mockAdviceDetail = {
	enquirySummaryList: [{ key: 'foo', value: 'bar' }],
	adviceGiven: 'Some advice',
	attachments: []
};

jest.resetModules();
jest
	.spyOn(require('../../../services/advice.service'), 'getAdviceDetailData')
	.mockResolvedValue(mockAdviceDetail);
const { getRegisterOfAdviceDetailController } = require('./controller');

describe('getRegisterOfAdviceDetailController', () => {
	it('should render the detail view with correct context', async () => {
		const req = {
			params: { id: '123' },
			query: { lang: 'cy' }
		};
		const res = {
			render: jest.fn()
		};
		const next = jest.fn();

		jest
			.spyOn(require('../../../services/advice.service'), 'getAdviceDetailData')
			.mockResolvedValue(mockAdviceDetail);

		await getRegisterOfAdviceDetailController(req, res, next);

		expect(res.render).toHaveBeenCalledWith(
			'register-of-advice/detail/view.njk',
			expect.objectContaining({
				...mockAdviceDetail,
				backToListUrl: '/register-of-advice?lang=cy',
				backToListText: 'Back to list'
			})
		);
	});

	it('should call next with error if getAdviceDetailData throws', async () => {
		const req = { params: { id: '123' }, query: {} };
		const res = { render: jest.fn() };
		const next = jest.fn();

		jest
			.spyOn(require('../../../services/advice.service'), 'getAdviceDetailData')
			.mockRejectedValue(new Error('fail'));

		await getRegisterOfAdviceDetailController(req, res, next);
		expect(next).toHaveBeenCalledWith(expect.any(Error));
	});
});
