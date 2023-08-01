jest.mock('../../../src/services/application.v2.service');
jest.mock('../../../src/repositories/projectUpdate.repository');

const { getApplication } = require('../../../src/services/application.v2.service');
const { getProjectUpdates } = require('../../../src/controllers/project-updates');

const {
	getProjectUpdates: getProjectUpdatesRepository
} = require('../../../src/repositories/projectUpdate.repository');
const { APPLICATION_DB } = require('../../__data__/application');
const { PROJECT_UPDATE_DB, PROJECT_UPDATE_RESPONSE } = require('../../__data__/projectUpdates');

describe('project updates controller', () => {
	describe('getProjectUpdates', () => {
		const req = {
			params: {
				caseReference: 'BC0110001'
			}
		};

		let mockRes;

		beforeEach(() => {
			mockRes = { send: jest.fn(), status: jest.fn().mockImplementation(() => mockRes) };
		});
		afterEach(() => jest.resetAllMocks());

		it('returns project updates when case has some', async () => {
			getApplication.mockResolvedValueOnce(APPLICATION_DB);
			getProjectUpdatesRepository.mockResolvedValueOnce([PROJECT_UPDATE_DB]);

			await getProjectUpdates(req, mockRes);

			expect(mockRes.send).toBeCalledWith({
				updates: [PROJECT_UPDATE_RESPONSE]
			});
		});

		it('returns no project updates when case has none', async () => {
			getApplication.mockResolvedValueOnce(APPLICATION_DB);
			getProjectUpdatesRepository.mockResolvedValueOnce([]);

			await getProjectUpdates(req, mockRes);

			expect(mockRes.send).toBeCalledWith({
				updates: []
			});
		});

		it('returns 404 when case not found', async () => {
			getApplication.mockResolvedValueOnce(null);

			await expect(getProjectUpdates(req, mockRes)).rejects.toEqual({
				code: 404,
				message: {
					errors: ['Application BC0110001 was not found']
				}
			});
		});

		it('returns 500 when unhandled error occurs', async () => {
			const expectedError = new Error('some error');

			getApplication.mockResolvedValueOnce(APPLICATION_DB);
			getProjectUpdatesRepository.mockRejectedValueOnce(expectedError);

			await expect(getProjectUpdates(req, mockRes)).rejects.toThrow(expectedError);
		});
	});
});
