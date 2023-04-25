const httpMocks = require('node-mocks-http');

jest.mock('../../../src/services/application.v2.service');

const {
	getApplication: getApplicationService
} = require('../../../src/services/application.v2.service');
const { getApplication } = require('../../../src/controllers/applications.v2');
const { APPLICATION_DB } = require('../../__data__/application');

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
				getApplicationService.mockResolvedValueOnce(APPLICATION_DB);

				await getApplication(req, res);
				const responseBody = res._getData();

				expect(responseBody.CaseReference).toEqual('EN0110004');
				expect(responseBody.ProjectName).toEqual(
					'Drax Bioenergy with Carbon Capture and Storage Project'
				);
				expect(responseBody.Proposal).toEqual('EN01 - Generating Stations');
				expect(responseBody.Summary).toEqual(
					'Drax Power Limited proposes to install post-combustion capture technology that would capture carbon dioxide emissions from up to two of the existing biomass units at Drax Power Station. The proposal includes the construction and operation of carbon capture technology and associated equipment, and the integration of the units into the existing Common Services at Drax Power Station. The proposal includes associated development.'
				);
				expect(responseBody.ProjectEmailAddress).toEqual('drax.project.email@example.org');
				expect(responseBody.Region).toEqual('yorkshire_and_the_humber');
				expect(responseBody.ProjectLocation).toEqual('Drax Power Station, North Yorkshire');
				expect(responseBody.AnticipatedGridRefEasting).toEqual(485899);
				expect(responseBody.AnticipatedGridRefNorthing).toEqual(414508);
				expect(responseBody.MapZoomLevel).toEqual(6);
				expect(responseBody.AnticipatedDateOfSubmission).toEqual('2023-09-01 00:00:00.0000000');
				expect(responseBody.AnticipatedSubmissionDateNonSpecific).toEqual('Q3 2023');
				expect(responseBody.sourceSystem).toEqual('ODT');

				expect(responseBody.Stage).toEqual(1);
				expect(responseBody.MapZoomLevel).toEqual(6);
				expect(responseBody.LongLat).toEqual([-0.7028315466694124, 53.620079146110655]);
			});
		});
	});
});
