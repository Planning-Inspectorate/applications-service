jest.mock('../../../src/repositories/document.backoffice.repository');
jest.mock('../../../src/utils/document.mapper');

const {
	getDocuments,
	getFilters,
	getDocumentsByType
} = require('../../../src/repositories/document.backoffice.repository');
const {
	BACK_OFFICE_DB_DOCUMENTS,
	RESPONSE_DOCUMENTS,
	DB_FILTERS,
	RESPONSE_FILTERS
} = require('../../__data__/documents');
const {
	fetchBackOfficeDocuments,
	fetchBackOfficeDocumentFilters,
	fetchBackOfficeDocumentsByType
} = require('../../../src/services/document.backoffice.service');
const { mapBackOfficeDocuments, mapFilters } = require('../../../src/utils/document.mapper');

describe('document back office service', () => {
	describe('fetchBackOfficeDocuments', () => {
		it('queries repository, invokes mapper with db data, then returns result', async () => {
			const filters = { caseReference: 'EN000001' };

			getDocuments.mockResolvedValueOnce({
				count: 1,
				rows: BACK_OFFICE_DB_DOCUMENTS
			});
			mapBackOfficeDocuments.mockReturnValueOnce(RESPONSE_DOCUMENTS);
			const mockIsMaterialChange = false;

			const result = await fetchBackOfficeDocuments(filters, mockIsMaterialChange);

			expect(mapBackOfficeDocuments).toBeCalledWith(BACK_OFFICE_DB_DOCUMENTS, mockIsMaterialChange);
			expect(result).toEqual({
				count: 1,
				data: RESPONSE_DOCUMENTS
			});
		});
	});

	describe('fetchBackOfficeDocumentFilters', () => {
		it('calls getFilters then passes result to mapper', async () => {
			getFilters.mockResolvedValueOnce(DB_FILTERS);
			mapFilters.mockReturnValueOnce(RESPONSE_FILTERS);
			const mockIsMaterialChange = false;

			const result = await fetchBackOfficeDocumentFilters('EN000001', mockIsMaterialChange);

			expect(mapFilters).toBeCalledWith(DB_FILTERS, mockIsMaterialChange);
			expect(result).toEqual(RESPONSE_FILTERS);
		});
	});

	describe('fetchBackOfficeDocumentsByType', () => {
		describe('when document type is in wrong letter case for BO', () => {
			test.each`
				type                         | expectedResult
				${'RULE_6_LETTER'}           | ${'Rule 6 letter'}
				${'RULE_8_LETTER'}           | ${'Rule 8 letter'}
				${'EXAMINATION_LIBRARY'}     | ${'Exam library'}
				${'DECISION_LETTER_APPROVE'} | ${'DCO decision letter (SoS)(approve)'}
				${'DECISION_LETTER_REFUSE'}  | ${'DCO decision letter (SoS)(refuse)'}
			`('"$type" should map to "$expectedResult"', async ({ type, expectedResult }) => {
				getDocumentsByType.mockResolvedValueOnce(BACK_OFFICE_DB_DOCUMENTS[0]);
				mapBackOfficeDocuments.mockReturnValueOnce(RESPONSE_DOCUMENTS);
				const result = await fetchBackOfficeDocumentsByType({
					caseReference: 'BO CASE REF',
					type: type
				});

				expect(getDocumentsByType).toBeCalledWith({
					caseReference: 'BO CASE REF',
					type: expectedResult
				});
				expect(result).toEqual({ data: RESPONSE_DOCUMENTS[0] });
			});
		});
		it('calls fetchBackOfficeDocumentsByType then passes result to repository', async () => {
			getDocumentsByType.mockResolvedValueOnce(BACK_OFFICE_DB_DOCUMENTS[0]);
			mapBackOfficeDocuments.mockReturnValueOnce(RESPONSE_DOCUMENTS);
			const result = await fetchBackOfficeDocumentsByType({
				caseReference: 'BO CASE REF',
				type: 'RULE_6_LETTER'
			});

			expect(getDocumentsByType).toBeCalledWith({
				caseReference: 'BO CASE REF',
				type: 'Rule 6 letter'
			});
			expect(result).toEqual({ data: RESPONSE_DOCUMENTS[0] });
		});
	});
});
