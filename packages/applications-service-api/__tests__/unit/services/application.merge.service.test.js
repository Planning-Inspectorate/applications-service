const { getAllMergedApplications } = require('../../../src/services/application.merge.service');
const {
	getAllApplications: getAllNIApplications
} = require('../../../src/repositories/project.ni.repository');
const {
	getAllApplications: getAllBOApplications
} = require('../../../src/repositories/project.backoffice.repository');
const { addMapZoomLevelAndLongLat } = require('../../../src/utils/application.mapper');
const {
	APPLICATION_DB,
	APPLICATIONS_NI_DB,
	APPLICATION_API_V1
} = require('../../__data__/application');

jest.mock('../../../src/repositories/project.ni.repository');
jest.mock('../../../src/repositories/project.backoffice.repository');
describe('application.merge.service', () => {
	describe('getAllMergedApplications', () => {
		beforeEach(() => {
			getAllBOApplications.mockResolvedValue({
				applications: [APPLICATION_DB],
				count: 1
			});
			getAllNIApplications.mockResolvedValue({
				applications: APPLICATIONS_NI_DB,
				count: APPLICATIONS_NI_DB.length
			});
		});
		it('calls getAllNIApplicationsRepository', async () => {
			await getAllMergedApplications({});
			expect(getAllNIApplications).toHaveBeenCalled();
		});
		it('calls getAllBOApplicationsRepository', async () => {
			await getAllMergedApplications({});
			expect(getAllBOApplications).toHaveBeenCalled();
		});

		describe('when there are no duplicates caseReferences', () => {
			it('correctly merges applications and counts', async () => {
				const result = await getAllMergedApplications({});

				const BOApplication = {
					...APPLICATION_API_V1,
					DateOfDCOAcceptance_NonAcceptance: null,
					sourceSystem: 'ODT'
				};
				const NIApplications = APPLICATIONS_NI_DB.map(addMapZoomLevelAndLongLat);
				const combinedApplications = [BOApplication, ...NIApplications];
				expect(result).toEqual({
					applications: combinedApplications,
					totalItems: combinedApplications.length,
					totalItemsWithoutFilters: combinedApplications.length,
					itemsPerPage: combinedApplications.length,
					totalPages: 1,
					currentPage: 1,
					filters: expect.anything() // not testing filters as the original mapper is used here
				});
			});
		});

		describe('when there are duplicates caseReferences', () => {
			it('correctly removes duplicates and merges applications and counts', async () => {
				const NIApplicationWithSameCaseReference = {
					...APPLICATIONS_NI_DB[0],
					CaseReference: APPLICATION_DB.caseReference
				};
				getAllNIApplications.mockResolvedValue({
					applications: [NIApplicationWithSameCaseReference, ...APPLICATIONS_NI_DB],
					count: APPLICATIONS_NI_DB.length + 1
				});

				const result = await getAllMergedApplications({});
				const BOApplication = {
					...APPLICATION_API_V1,
					DateOfDCOAcceptance_NonAcceptance: null,
					sourceSystem: 'ODT'
				};
				const NIApplications = APPLICATIONS_NI_DB.map(addMapZoomLevelAndLongLat);
				const combinedApplications = [BOApplication, ...NIApplications];
				expect(result).toEqual({
					applications: combinedApplications,
					totalItems: combinedApplications.length,
					totalItemsWithoutFilters: combinedApplications.length,
					itemsPerPage: combinedApplications.length,
					totalPages: 1,
					currentPage: 1,
					filters: expect.anything() // not testing filters as the original mapper is used here
				});
			});
		});
	});
});
