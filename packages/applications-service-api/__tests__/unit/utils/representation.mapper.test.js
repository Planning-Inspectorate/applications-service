const { mapBackOfficeRepresentationToApi } = require('../../../src/utils/representation.mapper');
const {
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATION_BACKOFFICE_DATA
} = require('../../__data__/representation');
const { SERVICE_USERS_BACKOFFICE_DATA } = require('../../__data__/serviceUser');
const { BACK_OFFICE_DB_DOCUMENTS } = require('../../__data__/documents');
describe('representation.mapper', () => {
	describe('mapBackOfficeRepresentationToApi', () => {
		const mockRepresented = SERVICE_USERS_BACKOFFICE_DATA[0];
		const mockRepresentative = SERVICE_USERS_BACKOFFICE_DATA[1];
		it('maps the back office representation record to the API format', () => {
			const result = mapBackOfficeRepresentationToApi(
				REPRESENTATION_BACKOFFICE_DATA,
				mockRepresented,
				mockRepresentative,
				BACK_OFFICE_DB_DOCUMENTS
			);

			expect(result).toEqual(REPRESENTATION_BACKOFFICE_RESPONSE);
		});
	});
});
