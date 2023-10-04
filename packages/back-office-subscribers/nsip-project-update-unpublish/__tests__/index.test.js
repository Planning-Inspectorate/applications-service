jest.mock('axios');

const axios = require('axios');

const subject = require('../index');

describe('nsip-project-update-unpublish', () => {
	const message = {
		id: 952,
		caseReference: 'BC0110001',
		updateContentEnglish: 'helloworldfoo3',
		updateStatus: 'unpublished',
		updateDate: '2023-08-03T10:35:08.432Z'
	};

	const env = process.env;

	beforeEach(() => {
		jest.resetModules();
		process.env = { ...env };
	});

	afterEach(() => {
		process.env = env;
	});

	describe('index', () => {
		it('invokes api delete with project update id from message', async () => {
			process.env.APPLICATIONS_SERVICE_API_URL = 'https://example.org';
			axios.delete.mockImplementationOnce(() => Promise.resolve());

			const mockContext = {
				log: jest.fn(),
				bindingData: {
					enqueuedTimeUtc: 1,
					deliveryCount: 1,
					messageId: 123
				},
				bindings: {
					projectUpdate: jest.fn()
				}
			};

			await subject(mockContext, message);

			expect(axios.delete).toBeCalledWith(`https://example.org/api/v1/project-updates/952`);
		});
	});
});
