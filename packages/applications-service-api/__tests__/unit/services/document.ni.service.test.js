jest.mock('../../../src/repositories/document.ni.repository');
jest.mock('../../../src/utils/document.mapper');

const {
	fetchDocuments,
	getAvailableFilters,
	fetchDocumentsByDocumentType
} = require('../../../src/repositories/document.ni.repository');
const {
	DB_DOCUMENTS,
	RESPONSE_DOCUMENTS,
	DB_FILTERS,
	RESPONSE_FILTERS
} = require('../../__data__/documents');
const { mapDocuments, mapFilters } = require('../../../src/utils/document.mapper');
const {
	fetchNIDocuments,
	fetchNIDocumentFilters,
	fetchNIDocumentsByType
} = require('../../../src/services/document.ni.service');

describe('document ni service', () => {
	describe('fetchNIDocuments', () => {
		it('queries repository, invokes mapper with db data, then returns result', async () => {
			const filters = { caseReference: 'EN000001' };

			fetchDocuments.mockResolvedValueOnce({
				count: 1,
				rows: DB_DOCUMENTS
			});
			mapDocuments.mockReturnValueOnce(RESPONSE_DOCUMENTS);

			const result = await fetchNIDocuments(filters);

			expect(mapDocuments).toBeCalledWith(DB_DOCUMENTS);
			expect(result).toEqual({
				count: 1,
				data: RESPONSE_DOCUMENTS
			});
		});
	});

	describe('fetchNIDocumentFilters', () => {
		it('calls getFilters then passes result to mapper', async () => {
			getAvailableFilters.mockResolvedValueOnce(DB_FILTERS);
			mapFilters.mockReturnValueOnce(RESPONSE_FILTERS);
			const mockIsMaterialChange = false;

			const result = await fetchNIDocumentFilters('EN000001', mockIsMaterialChange);

			expect(mapFilters).toBeCalledWith(DB_FILTERS, false);
			expect(result).toEqual(RESPONSE_FILTERS);
		});
	});

	describe('fetchNIDocumentsByType', () => {
		describe('when document type is in wrong letter case for NI', () => {
			test.each`
				type                         | expectedResult
				${'RULE_6_LETTER'}           | ${'Rule 6 letter - Notification of the preliminary meeting and matters to be discussed'}
				${'RULE_8_LETTER'}           | ${'Rule 8 letter - notification of timetable for the examination'}
				${'EXAMINATION_LIBRARY'}     | ${'Examination library'}
				${'DECISION_LETTER_APPROVE'} | ${'DCO decision letter (SoS)(approve)'}
				${'DECISION_LETTER_REFUSE'}  | ${'DCO decision letter (SoS)(refuse)'}
			`('"$type" should map to "$expectedResult"', async ({ type, expectedResult }) => {
				fetchDocumentsByDocumentType.mockResolvedValueOnce({ dataValues: DB_DOCUMENTS[0] });
				mapDocuments.mockReturnValueOnce(RESPONSE_DOCUMENTS);
				const result = await fetchNIDocumentsByType({
					caseReference: 'EN000001',
					type: type
				});

				expect(fetchDocumentsByDocumentType).toBeCalledWith({
					caseReference: 'EN000001',
					type: expectedResult
				});
				expect(result).toEqual({
					data: RESPONSE_DOCUMENTS[0]
				});
			});
		});
		it('calls fetchNIDocumentsByType then passes result to repository', async () => {
			fetchDocumentsByDocumentType.mockResolvedValueOnce({ dataValues: DB_DOCUMENTS[0] });
			mapDocuments.mockReturnValueOnce(RESPONSE_DOCUMENTS);
			const result = await fetchNIDocumentsByType({
				caseReference: 'EN000001',
				type: 'RULE_6_LETTER'
			});

			expect(fetchDocumentsByDocumentType).toBeCalledWith({
				caseReference: 'EN000001',
				type: 'Rule 6 letter - Notification of the preliminary meeting and matters to be discussed'
			});
			expect(result).toEqual({
				data: RESPONSE_DOCUMENTS[0]
			});
		});
	});
});
