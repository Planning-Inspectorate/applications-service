const httpMocks = require('node-mocks-http');
const { StatusCodes } = require('http-status-codes');
const {
	getNIDocuments,
	getDocumentByCaseReference
} = require('../../../src/controllers/documents.v3');
const { RESPONSE_FILTERS, RESPONSE_DOCUMENTS } = require('../../__data__/documents');
const {
	fetchBackOfficeDocumentsByType
} = require('../../../src/services/document.backoffice.service');
const { fetchNIDocumentsByType } = require('../../../src/services/document.ni.service');
const config = require('../../../src/lib/config');

jest.mock('../../../src/lib/config');
jest.mock('../../../src/services/document.ni.service');
jest.mock('../../../src/services/document.backoffice.service');
const fetchNIDocumentsMock = require('../../../src/services/document.ni.service').fetchNIDocuments;
const fetchNIDocumentFiltersMock =
	require('../../../src/services/document.ni.service').fetchNIDocumentFilters;

describe('documentsV3 controller', () => {
	const res = httpMocks.createResponse();

	afterEach(() => {
		jest.resetAllMocks();
	});

	describe('getNIDocuments', () => {
		it('returns documents and filters in correct format', async () => {
			fetchNIDocumentsMock.mockResolvedValueOnce({
				count: 4,
				data: RESPONSE_DOCUMENTS
			});
			fetchNIDocumentFiltersMock.mockResolvedValueOnce(RESPONSE_FILTERS);

			await getNIDocuments(
				{
					body: {
						caseReference: 'EN000001'
					}
				},
				res
			);

			const expectedFilters = {
				caseReference: 'EN000001',
				page: 1,
				itemsPerPage: 25
			};

			expect(fetchNIDocumentsMock).toBeCalledWith(expectedFilters);
			expect(fetchNIDocumentFiltersMock).toBeCalledWith('EN000001');

			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(res._getData()).toEqual({
				documents: RESPONSE_DOCUMENTS,
				filters: RESPONSE_FILTERS,
				totalItems: 4,
				itemsPerPage: 25,
				totalPages: 1,
				currentPage: 1
			});
		});

		it('passes all request filters down to the service', async () => {
			fetchNIDocumentsMock.mockResolvedValueOnce({
				count: 4,
				data: RESPONSE_DOCUMENTS
			});
			fetchNIDocumentFiltersMock.mockResolvedValueOnce(RESPONSE_FILTERS);

			await getNIDocuments(
				{
					body: {
						caseReference: 'EN000001',
						page: 2,
						size: 50,
						filters: [
							{
								name: 'category',
								value: "Developer's Application",
								type: [{ value: 'Plans' }, { value: 'Reports' }]
							}
						],
						searchTerm: 'search',
						datePublishedFrom: '2000-01-01',
						datePublishedTo: '2020-12-31'
					}
				},
				res
			);

			const expectedFilters = {
				caseReference: 'EN000001',
				page: 2,
				itemsPerPage: 50,
				filters: [
					{
						name: 'category',
						value: "Developer's Application",
						type: [{ value: 'Plans' }, { value: 'Reports' }]
					}
				],
				searchTerm: 'search',
				datePublishedFrom: '2000-01-01',
				datePublishedTo: '2020-12-31'
			};

			expect(fetchNIDocumentsMock).toBeCalledWith(expectedFilters);

			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(res._getData()).toEqual({
				documents: RESPONSE_DOCUMENTS,
				filters: RESPONSE_FILTERS,
				totalItems: 4,
				itemsPerPage: 50,
				totalPages: 1,
				currentPage: 2
			});
		});

		it('limits itemsPerPage to 100', async () => {
			fetchNIDocumentsMock.mockResolvedValueOnce({
				count: 4,
				data: RESPONSE_DOCUMENTS
			});
			fetchNIDocumentFiltersMock.mockResolvedValueOnce(RESPONSE_FILTERS);

			await getNIDocuments(
				{
					body: {
						caseReference: 'EN000001',
						page: 2,
						size: 101
					}
				},
				res
			);

			const expectedFilters = {
				caseReference: 'EN000001',
				page: 2,
				itemsPerPage: 100
			};

			expect(fetchNIDocumentsMock).toBeCalledWith(expectedFilters);

			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(res._getData()).toEqual({
				documents: RESPONSE_DOCUMENTS,
				filters: RESPONSE_FILTERS,
				totalItems: 4,
				itemsPerPage: 100,
				totalPages: 1,
				currentPage: 2
			});
		});

		it('calculates the correct pagination', async () => {
			fetchNIDocumentsMock.mockResolvedValueOnce({
				count: 4,
				data: RESPONSE_DOCUMENTS
			});
			fetchNIDocumentFiltersMock.mockResolvedValueOnce(RESPONSE_FILTERS);

			await getNIDocuments(
				{
					body: {
						caseReference: 'EN000001',
						page: 2,
						size: 2
					}
				},
				res
			);

			const expectedFilters = {
				caseReference: 'EN000001',
				page: 2,
				itemsPerPage: 2
			};

			expect(fetchNIDocumentsMock).toBeCalledWith(expectedFilters);

			expect(res._getStatusCode()).toEqual(StatusCodes.OK);
			expect(res._getData()).toEqual({
				documents: RESPONSE_DOCUMENTS,
				filters: RESPONSE_FILTERS,
				totalItems: 4,
				itemsPerPage: 2,
				totalPages: 2,
				currentPage: 2
			});
		});
	});

	describe('getDocumentByCaseReference', () => {
		describe('NI', () => {
			describe('dict test', () => {
				test.each([
					[
						'Rule 6 leTTer',
						'Rule 6 letter - Notification of the preliminary meeting and matters to be discussed'
					],
					['Rule 8 LeTTer', 'Rule 8 letter - notification of timetable for the examination'],
					['ExaminatION library', 'Examination library'],
					['dco decision letter (SoS)(approve)', 'DCO decision letter (SoS)(approve)'],
					['dco decision letter (SoS)(refuse)', 'DCO decision letter (SoS)(refuse)']
				])('.add(%i, %i)', async (type, expected) => {
					fetchNIDocumentsByType.mockResolvedValueOnce({ data: 'mock document' });
					await getDocumentByCaseReference(
						{
							params: { caseReference: 'EN000001' },
							query: { type }
						},
						res
					);

					expect(fetchNIDocumentsByType).toHaveBeenCalledWith({
						caseReference: 'EN000001',
						type: expected
					});
				});
			});
			it('returns a NI document for the case ref and type (Rule 6 Letter)', async () => {
				fetchNIDocumentsByType.mockResolvedValueOnce({ data: 'mock document' });
				await getDocumentByCaseReference(
					{
						params: { caseReference: 'EN000001' },
						query: { type: 'Rule 6 letter' }
					},
					res
				);
				expect(fetchNIDocumentsByType).toHaveBeenCalledWith({
					caseReference: 'EN000001',
					type: 'Rule 6 letter - Notification of the preliminary meeting and matters to be discussed'
				});

				expect(res._getStatusCode()).toEqual(StatusCodes.OK);
				expect(res._getData()).toEqual({ data: 'mock document' });
			});

			it('returns a NI document for the case ref and type (Rule 8 Letter)', async () => {
				fetchNIDocumentsByType.mockResolvedValueOnce({ data: 'mock document' });
				await getDocumentByCaseReference(
					{
						params: { caseReference: 'EN000001' },
						query: { type: 'Rule 8 letter' }
					},
					res
				);
				expect(fetchNIDocumentsByType).toHaveBeenCalledWith({
					caseReference: 'EN000001',
					type: 'Rule 8 letter - notification of timetable for the examination'
				});

				expect(res._getStatusCode()).toEqual(StatusCodes.OK);
				expect(res._getData()).toEqual({ data: 'mock document' });
			});
		});
		describe('BO', () => {
			describe('dict test', () => {
				test.each([
					['Rule 6 leTTer', 'Rule 6 letter'],
					['Rule 8 LeTTer', 'Rule 8 letter'],
					['ExaminatION library', 'Examination library'],
					['dco decision letter (SoS)(approve)', 'DCO decision letter (SoS)(approve)'],
					['dco decision letter (SoS)(refuse)', 'DCO decision letter (SoS)(refuse)']
				])('.add(%i, %i)', async (type, expected) => {
					fetchBackOfficeDocumentsByType.mockResolvedValueOnce({ data: 'mock document' });
					config.backOfficeIntegration.documents.getDocuments.caseReferences = ['BC0110001'];
					await getDocumentByCaseReference(
						{
							params: { caseReference: 'BC0110001' },
							query: { type }
						},
						res
					);

					expect(fetchBackOfficeDocumentsByType).toHaveBeenCalledWith({
						caseReference: 'BC0110001',
						type: expected
					});
				});
			});
			it('returns a BO document for the case ref and type', async () => {
				fetchBackOfficeDocumentsByType.mockResolvedValueOnce({ data: 'mock document' });

				config.backOfficeIntegration.documents.getDocuments.caseReferences = ['BC0110001'];
				await getDocumentByCaseReference(
					{
						params: { caseReference: 'BC0110001' },
						query: { type: 'Rule 6 letter' }
					},
					res
				);

				expect(fetchBackOfficeDocumentsByType).toHaveBeenCalledWith({
					caseReference: 'BC0110001',
					type: 'Rule 6 letter'
				});

				expect(res._getStatusCode()).toEqual(StatusCodes.OK);
				expect(res._getData()).toEqual({ data: 'mock document' });
			});
		});
	});
});
