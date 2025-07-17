/* eslint-disable consistent-return */
const {
	getRepresentationsForApplication,
	getRepresentationByIdAndCaseRef
} = require('../../../src/services/representation.service');
const config = require('../../../src/lib/config');
const { isBackOfficeCaseReference } = require('../../../src/utils/is-backoffice-case-reference');
const {
	getRepresentationsWithCount: getRepresentationsNIRepository,
	getRepresentationById: getRepresentationByIdNIRepository,
	getFilters: getNIFilters
} = require('../../../src/repositories/representation.ni.repository');
const {
	getDocumentsByDataId: getDocumentsByDataIdNIRepository
} = require('../../../src/repositories/document.ni.repository');

const {
	getRepresentationByIdAndCaseRef: getRepresentationByBORepository,
	getRepresentations: getRepresentationsBORepository,
	getFilters: getBOFilters
} = require('../../../src/repositories/representation.backoffice.repository');
const {
	getDocumentsByIds: getDocumentsByIdsBORepository
} = require('../../../src/repositories/document.backoffice.repository');
const {
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATION_NI_DATA,
	REPRESENTATIONS_BACKOFFICE_DATA,
	REPRESENTATIONS_BACKOFFICE_RESPONSE
} = require('../../__data__/representation');
const { SERVICE_USERS_BACKOFFICE_DATA } = require('../../__data__/serviceUser');
const {
	BACK_OFFICE_DB_DOCUMENTS,
	DB_DOCUMENTS: NI_DB_DOCUMENTS
} = require('../../__data__/documents');

jest.mock('../../../src/repositories/document.ni.repository');
jest.mock('../../../src/repositories/representation.ni.repository');
jest.mock('../../../src/repositories/representation.backoffice.repository');
jest.mock('../../../src/repositories/document.backoffice.repository');
jest.mock('../../../src/utils/is-backoffice-case-reference');

describe('representation.service', () => {
	beforeAll(() => {
		isBackOfficeCaseReference.mockImplementation((caseReference) => caseReference === 'BC010001');
	});
	const filtersMockData = [
		{ name: 'Members of the Public/Businesses', count: 23 },
		{ name: 'Parish Councils', count: 2 }
	];
	describe('getRepresentationsForApplication', () => {
		beforeEach(() => {
			getRepresentationsNIRepository.mockResolvedValue({
				representations: REPRESENTATION_NI_DATA,
				count: 1
			});
			getRepresentationsBORepository.mockResolvedValue({
				representations: REPRESENTATIONS_BACKOFFICE_DATA.map((representation) => ({
					...representation,
					represented: SERVICE_USERS_BACKOFFICE_DATA[0],
					representative: SERVICE_USERS_BACKOFFICE_DATA[1]
				})),
				count: 1
			});

			getNIFilters.mockResolvedValue(filtersMockData);
			getBOFilters.mockResolvedValue(filtersMockData);
		});
		describe('when case reference is back office', () => {
			it('should call getRepresentationsBORepository with correct params', async () => {
				await getRepresentationsForApplication({ caseReference: 'BC010001' });
				expect(getRepresentationsBORepository).toBeCalledWith({
					caseReference: 'BC010001',
					offset: 0,
					limit: 25,
					searchTerm: undefined,
					type: undefined
				});
			});
			it('should get filters by calling getBOFilters', async () => {
				await getRepresentationsForApplication({ caseReference: 'BC010001' });
				expect(getBOFilters).toBeCalledWith('BC010001');
			});
			it('should return mapped representations', async () => {
				const data = await getRepresentationsForApplication({ caseReference: 'BC010001' });
				expect(data).toEqual({
					representations: REPRESENTATIONS_BACKOFFICE_RESPONSE,
					currentPage: 1,
					itemsPerPage: 25,
					totalItems: 1,
					totalPages: 1,
					filters: {
						typeFilters: filtersMockData
					}
				});
			});
		});
		describe('when case reference is ni', () => {
			it('should call getRepresentationsWithCountNIRepository with correct params', async () => {
				await getRepresentationsForApplication({ caseReference: 'EN010009' });
				expect(getRepresentationsNIRepository).toBeCalledWith({
					caseReference: 'EN010009',
					offset: 0,
					limit: 25,
					searchTerm: undefined,
					type: undefined
				});
			});
			it('should get filters by calling getNIFilters', async () => {
				await getRepresentationsForApplication({ caseReference: 'EN010009' });
				expect(getNIFilters).toBeCalledWith('RepFrom', 'EN010009');
			});
			it('should return mapped representations', async () => {
				const data = await getRepresentationsForApplication({ caseReference: 'EN010009' });
				expect(data).toEqual({
					representations: REPRESENTATION_NI_DATA,
					currentPage: 1,
					itemsPerPage: 25,
					totalItems: 1,
					totalPages: 1,
					filters: {
						typeFilters: filtersMockData
					}
				});
			});
		});
	});
	describe('getRepresentationById', () => {
		beforeEach(() => {
			getRepresentationByIdNIRepository.mockResolvedValue(REPRESENTATION_NI_DATA[0]);
			getDocumentsByDataIdNIRepository.mockResolvedValue(NI_DB_DOCUMENTS);
			getDocumentsByIdsBORepository.mockResolvedValue(BACK_OFFICE_DB_DOCUMENTS);
			getRepresentationByBORepository.mockResolvedValue({
				...REPRESENTATION_BACKOFFICE_DATA,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: SERVICE_USERS_BACKOFFICE_DATA[1]
			});
		});
		describe('when case reference is back office', () => {
			it('should call getRepresentationByBORepository with correct params', async () => {
				await getRepresentationByIdAndCaseRef('1', 'BC010001');
				expect(getRepresentationByBORepository).toBeCalledWith('1', 'BC010001');
			});
			it('should return undefined if no representation found', async () => {
				getRepresentationByBORepository.mockResolvedValue(null);
				const data = await getRepresentationByIdAndCaseRef('1', 'BC010001');
				expect(data).toBeUndefined();
			});
			it('should call getDocumentsByIdsBORepository with correct params', async () => {
				await getRepresentationByIdAndCaseRef('1', 'BC010001');
				expect(getDocumentsByIdsBORepository).toBeCalledWith(
					REPRESENTATION_BACKOFFICE_DATA.attachmentIds
				);
			});
			it('should return representation', async () => {
				expect(await getRepresentationByIdAndCaseRef('1', 'BC010001')).toEqual(
					REPRESENTATION_BACKOFFICE_RESPONSE
				);
			});
		});
		describe('when case reference is ni', () => {
			it('should call getRepresentationByIdNIRepository with correct params', async () => {
				await getRepresentationByIdAndCaseRef('1', 'EN010009');
				expect(getRepresentationByIdNIRepository).toBeCalledWith('1');
			});
			it('return undefined if no representation found', async () => {
				getRepresentationByIdNIRepository.mockResolvedValue(null);
				const data = await getRepresentationByIdAndCaseRef('1', 'EN010009');
				expect(data).toBeUndefined();
			});
			it('should call getDocumentsByDataIdNIRepository with correct params', async () => {
				await getRepresentationByIdAndCaseRef('1', 'EN010009');
				expect(getDocumentsByDataIdNIRepository).toBeCalledWith(
					REPRESENTATION_NI_DATA[0]?.Attachments.split(',')
				);
			});
			it('should return mapped representation', async () => {
				const data = await getRepresentationByIdAndCaseRef('1', 'EN010009');
				expect(data).toEqual({
					...REPRESENTATION_NI_DATA[0],
					attachments: NI_DB_DOCUMENTS.map((doc) => ({
						...doc,
						path: doc.path ? `${config.documentsHost}${doc.path}` : null
					}))
				});
			});
		});
	});
});
