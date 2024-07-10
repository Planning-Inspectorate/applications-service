const {
	mapRepresentationToApi,
	mapRepresentationsToApi
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
	describe('mapRepresentationToApi', () => {
		it('maps the representation record to the API format', () => {
			const mockRepresentation = {
				...REPRESENTATION_BACKOFFICE_DATA,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: SERVICE_USERS_BACKOFFICE_DATA[1]
			};
			const result = mapRepresentationToApi(mockRepresentation, BACK_OFFICE_DB_DOCUMENTS);

			expect(result).toEqual(REPRESENTATION_BACKOFFICE_RESPONSE);
		});
		it('representative is null', () => {
			const mockRepresented = {
				...REPRESENTATION_BACKOFFICE_DATA,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: null
			};
			const result = mapRepresentationToApi(mockRepresented, BACK_OFFICE_DB_DOCUMENTS);
			expect(result).toEqual({
				...REPRESENTATION_BACKOFFICE_RESPONSE,
				Representative: ''
			});
		});
	});
	describe('mapRepresentationsToApi', () => {
		it('maps the representation records to the API format', () => {
			const mockRepresented = REPRESENTATIONS_BACKOFFICE_DATA.map((representation) => ({
				...representation,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: SERVICE_USERS_BACKOFFICE_DATA[1]
			}));
			const result = mapRepresentationsToApi(mockRepresented);

			expect(result).toEqual(REPRESENTATIONS_BACKOFFICE_RESPONSE);
		});
	});
});
