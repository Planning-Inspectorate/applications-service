const httpMocks = require('node-mocks-http');

jest.mock('../../../src/services/application.v2.service');

const {
	getApplication: getApplicationService
} = require('../../../src/services/application.v2.service');
const { getApplication } = require('../../../src/controllers/applications.v2');

describe('applications v2 controller', () => {
	let res;

	beforeEach(() => {
		res = httpMocks.createResponse();
	});

	describe('getApplication', () => {
		describe('parsing regions', () => {
			const req = {
				params: {
					caseReference: 'EN010009'
				}
			};

			it('given multiple regions, returns regions as array', async () => {
				getApplicationService.mockResolvedValueOnce({
					caseId: 1,
					regions: 'a,b,c'
				});

				await getApplication(req, res);

				expect(res._getData()).toEqual({
					caseId: 1,
					regions: ['a', 'b', 'c']
				});
			});

			it('given single region, returns regions as array', async () => {
				getApplicationService.mockResolvedValueOnce({
					caseId: 1,
					regions: 'a'
				});

				await getApplication(req, res);

				expect(res._getData()).toEqual({
					caseId: 1,
					regions: ['a']
				});
			});

			it('given undefined region, returns empty array', async () => {
				getApplicationService.mockResolvedValueOnce({
					caseId: 1
				});

				await getApplication(req, res);

				expect(res._getData()).toEqual({
					caseId: 1,
					regions: []
				});
			});
		});
	});
});
