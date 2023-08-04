jest.mock('../../../src/services/application.v2.service');
jest.mock('../../../src/repositories/projectUpdate.repository');

const {
	getProjectUpdates,
	deleteProjectUpdate
} = require('../../../src/controllers/project-updates');

const {
	getProjectUpdates: getProjectUpdatesRepository,
	deleteProjectUpdate: deleteProjectUpdateRepository
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

	describe('deleteProjectUpdate', () => {
		const req = {
			params: {
				projectUpdateId: 1
			}
		};

		it('returns 204 when delete is successful', async () => {
			deleteProjectUpdateRepository.mockResolvedValueOnce();

			await deleteProjectUpdate(req, mockRes);

			expect(mockRes.status).toBeCalledWith(204);
			expect(mockRes.send).toBeCalled();
		});

		it('returns 404 when record is not found in database', async () => {
			deleteProjectUpdateRepository.mockRejectedValueOnce({
				name: 'PrismaClientKnownRequestError',
				code: 'P2025'
			});

			await expect(deleteProjectUpdate(req, mockRes)).rejects.toEqual({
				code: 404,
				message: {
					errors: ["Project Update with projectUpdateId '1' not found"]
				}
			});
		});
	});
});
