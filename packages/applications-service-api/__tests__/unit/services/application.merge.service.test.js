const {
	getAllMergedApplications,
	getAllMergedApplicationsDownload
} = require('../../../src/services/application.merge.service');
const sortApplications = require('../../../src/utils/sort-applications.merge');
const {
	getAllApplications: getAllNIApplications
} = require('../../../src/repositories/project.ni.repository');
const {
	getAllApplications: getAllBOApplications
} = require('../../../src/repositories/project.backoffice.repository');
const { mapNIApplicationsToApi } = require('../../../src/utils/application.mapper');
const mapApplicationsToCSV = require('../../../src/utils/map-applications-to-csv');
const {
	APPLICATION_DB,
	APPLICATIONS_NI_DB,
	APPLICATION_API_V1
} = require('../../__data__/application');

jest.mock('../../../src/repositories/project.ni.repository');
jest.mock('../../../src/repositories/project.backoffice.repository');
jest.mock('../../../src/utils/map-applications-to-csv');
jest.mock('../../../src/utils/sort-applications.merge');

describe('application.merge.service', () => {
	describe('getAllMergedApplications', () => {
		const BOApplication = {
			...APPLICATION_API_V1,
			sourceSystem: 'ODT',
			isMaterialChange: undefined,
			deadlineForAcceptanceDecision: '2023-01-30',
			deadlineForSubmissionOfRecommendation: null,
			deadlineForDecision: null,
			ProjectNameWelsh: undefined,
			SummaryWelsh: undefined,
			ProjectLocationWelsh: undefined
		};
		const NIApplications = mapNIApplicationsToApi(APPLICATIONS_NI_DB);
		const combinedApplications = [BOApplication, ...NIApplications];
		beforeEach(() => {
			getAllBOApplications.mockResolvedValue({
				applications: [APPLICATION_DB],
				count: 1
			});
			getAllNIApplications.mockResolvedValue({
				applications: APPLICATIONS_NI_DB,
				count: APPLICATIONS_NI_DB.length
			});
			sortApplications.mockImplementation((applications) => applications);
		});

		it('calls getAllNIApplicationsRepository', async () => {
			await getAllMergedApplications({});
			expect(getAllNIApplications).toHaveBeenCalled();
		});

		it('calls getAllBOApplicationsRepository', async () => {
			await getAllMergedApplications({});
			expect(getAllBOApplications).toHaveBeenCalled();
		});

		it('calls sortApplications with query.sort', async () => {
			await getAllMergedApplications({
				sort: '+ProjectName'
			});
			expect(sortApplications).toHaveBeenCalledWith(combinedApplications, '+ProjectName');
		});

		describe('when there are no duplicates caseReferences', () => {
			it('correctly merges applications and counts', async () => {
				const result = await getAllMergedApplications({});

				expect(result).toEqual({
					applications: expect.arrayContaining([...combinedApplications]),
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
				expect(result).toEqual({
					applications: expect.arrayContaining([...combinedApplications]),
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

	describe('getAllMergedApplicationsDownload', () => {
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
			await getAllMergedApplicationsDownload();
			expect(getAllNIApplications).toHaveBeenCalled();
		});
		it('calls getAllBOApplicationsRepository', async () => {
			await getAllMergedApplicationsDownload();
			expect(getAllBOApplications).toHaveBeenCalled();
		});
		it('removes duplicates from the combined applications and maps to CSV', async () => {
			const NIApplicationWithSameCaseReference = {
				...APPLICATIONS_NI_DB[0],
				CaseReference: APPLICATION_DB.caseReference
			};
			getAllNIApplications.mockResolvedValue({
				applications: [NIApplicationWithSameCaseReference, ...APPLICATIONS_NI_DB],
				count: APPLICATIONS_NI_DB.length + 1
			});
			const BOApplication = {
				...APPLICATION_API_V1,
				sourceSystem: 'ODT',
				isMaterialChange: undefined,
				deadlineForAcceptanceDecision: '2023-01-30',
				deadlineForSubmissionOfRecommendation: null,
				deadlineForDecision: null,
				ProjectNameWelsh: undefined,
				SummaryWelsh: undefined,
				ProjectLocationWelsh: undefined
			};
			const NIApplications = mapNIApplicationsToApi(APPLICATIONS_NI_DB);
			const combinedApplications = [BOApplication, ...NIApplications];
			await getAllMergedApplicationsDownload();
			expect(mapApplicationsToCSV).toHaveBeenCalledWith(combinedApplications);
		});
	});
});
