const {
	mapBackOfficeRepresentationToApi,
	mapBackOfficeRepresentationsToApi
} = require('../../../src/utils/representation.mapper');
const {
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATIONS_BACKOFFICE_DATA,
	REPRESENTATIONS_BACKOFFICE_RESPONSE
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
		it('representative is null', () => {
			const result = mapBackOfficeRepresentationToApi(
				REPRESENTATION_BACKOFFICE_DATA,
				mockRepresented,
				null,
				BACK_OFFICE_DB_DOCUMENTS
			);
			expect(result).toEqual({
				...REPRESENTATION_BACKOFFICE_RESPONSE,
				Representative: ''
			});
		});
	});
	describe('mapBackOfficeRepresentationsToApi', () => {
		it('maps the back office representation records to the API format', () => {
			const mockRepresented = REPRESENTATIONS_BACKOFFICE_DATA.map((representation) => ({
				representation,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: SERVICE_USERS_BACKOFFICE_DATA[1]
			}));
			const result = mapBackOfficeRepresentationsToApi(mockRepresented);

			expect(result).toEqual(REPRESENTATIONS_BACKOFFICE_RESPONSE);
		});
	});
});
