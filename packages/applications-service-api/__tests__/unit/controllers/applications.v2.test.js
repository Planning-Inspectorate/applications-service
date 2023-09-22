const httpMocks = require('node-mocks-http');

jest.mock('../../../src/services/application.service');

jest.mock('../../../src/services/application.service');
const mockGetApplication = require('../../../src/services/application.service').getApplication;

const { getApplication } = require('../../../src/controllers/applications.v2');
const { APPLICATION_API, APPLICATION_API_LEGACY} = require('../../__data__/application');

describe('applications v2 controller', () => {
	let res;

	beforeEach(() => {
		res = httpMocks.createResponse();
	});

	describe('getApplication', () => {
		describe('parsing regions', () => {
			const req = {
				params: {
					caseReference: 'EN0110004'
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
					...APPLICATION_API_LEGACY,
					DateOfDCOAcceptance_NonAcceptance: null,
					ApplicantEmailAddress: 'TBC',
					ApplicantPhoneNumber: 'TBC',
					PromoterFirstName: 'TBC',
					PromoterLastName: 'TBC',
					PromoterName: 'TBC',
					WebAddress: 'TBC',
					sourceSystem: 'ODT'
				})
			});
		});
	});
});
