const {
	getBackOfficeApplication,
	getApplication
} = require('../../../src/services/application.service');

jest.mock('../../../src/repositories/project.repository');
const { getByCaseReference } = require('../../../src/repositories/project.repository');

jest.mock('../../../src/services/application.ni.service');
const { getNIApplication } = require('../../../src/services/application.ni.service');

jest.mock('../../../src/utils/application.mapper');
const {
	mapBackOfficeApplicationToApi,
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

	describe('getBackOfficeApplication', () => {
		it('invokes repository', async () => {
			const caseReference = 'EN010009';

			await getBackOfficeApplication(caseReference);

			expect(getByCaseReference).toBeCalledWith(caseReference);
		});
	});
});
