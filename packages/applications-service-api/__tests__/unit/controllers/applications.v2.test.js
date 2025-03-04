const httpMocks = require('node-mocks-http');

jest.mock('../../../src/services/application.backoffice.service');

jest.mock('../../../src/services/application.backoffice.service');
const mockGetApplication =
	require('../../../src/services/application.backoffice.service').getApplication;

const { getApplication } = require('../../../src/controllers/applications.v2');
const { APPLICATION_API, APPLICATION_API_V1 } = require('../../__data__/application');

describe('applications v2 controller', () => {
	let res;

	beforeEach(() => {
		res = httpMocks.createResponse();
	});

	describe('getApplication', () => {
		describe('parsing regions', () => {
			const req = {
				params: {
					caseReference: 'BC0110001'
				}
			};

			it('given application data, returns correct field mapping', async () => {
				mockGetApplication.mockResolvedValueOnce({
					...APPLICATION_API,
					sourceSystem: 'ODT'
				});

				await getApplication(req, res);
				const responseBody = res._getData();

				expect(responseBody).toEqual({
					...APPLICATION_API_V1,
					sourceSystem: 'ODT',
					isMaterialChange: undefined,
					deadlineForAcceptanceDecision: '2023-01-30',
					deadlineForSubmissionOfRecommendation: null,
					deadlineForDecision: null,
					ProjectNameWelsh: undefined,
					SummaryWelsh: undefined,
					ProjectLocationWelsh: undefined
				});
			});
		});
	});
});
