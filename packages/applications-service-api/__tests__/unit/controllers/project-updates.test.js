jest.mock('../../../src/services/application.backoffice.service');
jest.mock('../../../src/repositories/projectUpdate.repository');

const { getProjectUpdates } = require('../../../src/controllers/project-updates');

const {
	getProjectUpdates: getProjectUpdatesRepository
} = require('../../../src/repositories/projectUpdate.repository');
const { PROJECT_UPDATE_DB, PROJECT_UPDATE_RESPONSE } = require('../../__data__/projectUpdates');

describe('project updates controller', () => {
	let mockRes;
	beforeEach(() => {
		mockRes = { send: jest.fn(), status: jest.fn().mockImplementation(() => mockRes) };
	});
	afterEach(() => jest.resetAllMocks());

	describe('getProjectUpdates', () => {
		const req = {
			params: {
				caseReference: 'BC0110001'
			}
		};

		it('returns project updates when case has some', async () => {
			getProjectUpdatesRepository.mockResolvedValueOnce([PROJECT_UPDATE_DB]);

			await getProjectUpdates(req, mockRes);

			expect(mockRes.send).toBeCalledWith({
				updates: [PROJECT_UPDATE_RESPONSE]
			});
		});

		it('returns no project updates when case has none', async () => {
			getProjectUpdatesRepository.mockResolvedValueOnce([]);

			await getProjectUpdates(req, mockRes);

			expect(mockRes.send).toBeCalledWith({
				updates: []
			});
		});

		it('returns 500 when unhandled error occurs', async () => {
			const expectedError = new Error('some error');

			getProjectUpdatesRepository.mockRejectedValueOnce(expectedError);

			await expect(getProjectUpdates(req, mockRes)).rejects.toThrow(expectedError);
		});
	});
});
