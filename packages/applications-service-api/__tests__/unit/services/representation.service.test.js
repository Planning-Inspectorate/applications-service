/* eslint-disable consistent-return */
const {
	getRepresentationsForApplication,
	getRepresentationById
} = require('../../../src/services/representation.service');
const {
	getRepresentationById: getRepresentationByBORepository,
	getRepresentations: getRepresentationsBORepository,
	getFilters: getBOFilters
} = require('../../../src/repositories/representation.repository');
const {
	getDocumentsByIds: getDocumentsByIdsBORepository
} = require('../../../src/repositories/document.repository');
const {
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATIONS_BACKOFFICE_DATA,
	REPRESENTATIONS_BACKOFFICE_RESPONSE
} = require('../../__data__/representation');
const { SERVICE_USERS_BACKOFFICE_DATA } = require('../../__data__/serviceUser');
const { BACK_OFFICE_DB_DOCUMENTS } = require('../../__data__/documents');

jest.mock('../../../src/repositories/representation.repository');
jest.mock('../../../src/repositories/document.repository');

describe('representation.service', () => {
	const filtersMockData = [
		{ name: 'Members of the Public/Businesses', count: 23 },
		{ name: 'Parish Councils', count: 2 }
	];
	describe('getRepresentationsForApplication', () => {
		beforeEach(() => {
			getRepresentationsBORepository.mockResolvedValue({
				representations: REPRESENTATIONS_BACKOFFICE_DATA.map((representation) => ({
					...representation,
					represented: SERVICE_USERS_BACKOFFICE_DATA[0],
					representative: SERVICE_USERS_BACKOFFICE_DATA[1]
				})),
				count: 1
			});
			getBOFilters.mockResolvedValue(filtersMockData);
		});
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
	describe('getRepresentationById', () => {
		beforeEach(() => {
			getDocumentsByIdsBORepository.mockResolvedValue(BACK_OFFICE_DB_DOCUMENTS);
			getRepresentationByBORepository.mockResolvedValue({
				...REPRESENTATION_BACKOFFICE_DATA,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: SERVICE_USERS_BACKOFFICE_DATA[1]
			});
		});
		it('should call getRepresentationByBORepository with correct params', async () => {
			await getRepresentationById('1', 'BC010001');
			expect(getRepresentationByBORepository).toBeCalledWith('1');
		});
		it('should return undefined if no representation found', async () => {
			getRepresentationByBORepository.mockResolvedValue(null);
			const data = await getRepresentationById('1', 'BC010001');
			expect(data).toBeUndefined();
		});
		it('should call getDocumentsByIdsBORepository with correct params', async () => {
			await getRepresentationById('1', 'BC010001');
			expect(getDocumentsByIdsBORepository).toBeCalledWith(
				REPRESENTATION_BACKOFFICE_DATA.attachmentIds
			);
		});
		it('should return representation', async () => {
			expect(await getRepresentationById('1', 'BC010001')).toEqual(
				REPRESENTATION_BACKOFFICE_RESPONSE
			);
		});
	});
});
