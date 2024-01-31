const { getApplication, getAllApplications } = require('../../../src/services/application.service');
const config = require('../../../src/lib/config');
jest.mock('../../../src/repositories/project.backoffice.repository');
const {
	getByCaseReference,
	getAllApplications: getAllApplicationsRepository
} = require('../../../src/repositories/project.backoffice.repository');
const { getAllNIApplications } = require('../../../src/services/application.ni.service');
const { getNIApplication } = require('../../../src/services/application.ni.service');

jest.mock('../../../src/utils/application.mapper');
jest.mock('../../../src/services/application.ni.service');

const {
	mapBackOfficeApplicationToApi,
	mapBackOfficeApplicationsToApi,
	mapNIApplicationToApi
} = require('../../../src/utils/application.mapper');
const { APPLICATION_DB, APPLICATION_FO } = require('../../__data__/application');

jest.mock('../../../src/lib/config', () => ({
	backOfficeIntegration: {
		applications: {
			getApplication: {
				caseReferences: ['BC0110001']
			}
		}
	},
	logger: {
		level: 'info'
	}
}));

describe('application.service', () => {
	describe('getApplication', () => {
		it('invokes getBackOfficeApplication if BO caseReference', async () => {
			getByCaseReference.mockResolvedValueOnce(APPLICATION_DB);

			await getApplication('BC0110001');

			expect(getByCaseReference).toHaveBeenCalledWith('BC0110001');
			expect(mapBackOfficeApplicationToApi).toHaveBeenCalledWith(APPLICATION_DB);
		});

		it('invokes getNIApplication if NI caseReference', async () => {
			getNIApplication.mockResolvedValueOnce(APPLICATION_FO);

			await getApplication('EN010009');

			expect(getNIApplication).toHaveBeenCalledWith('EN010009');
			expect(mapNIApplicationToApi).toHaveBeenCalledWith(APPLICATION_FO);
		});
	});
	describe('getAllApplications', () => {
		it('invokes getAllBOApplicationsRepository if BO caseReference', async () => {
			config.backOfficeIntegration.applications.getAllApplications = true;
			getAllApplicationsRepository.mockResolvedValueOnce([APPLICATION_DB]);

			await getAllApplications();

			expect(getAllApplicationsRepository).toHaveBeenCalled();
			expect(mapBackOfficeApplicationsToApi).toHaveBeenCalledWith([APPLICATION_DB]);
		});
		it('invokes getAllNIApplications if NI caseReference', async () => {
			config.backOfficeIntegration.applications.getAllApplications = false;

			await getAllApplications();

			expect(getAllNIApplications).toHaveBeenCalled();
		});
	});
});
