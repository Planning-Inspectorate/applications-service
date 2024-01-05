const {
	mapBackOfficeRepresentationToApi,
	mapBackOfficeRepresentationsToApi,
	mapNIRepresentationToApi
} = require('../../../src/utils/representation.mapper');
const {
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATIONS_BACKOFFICE_DATA,
	REPRESENTATION_NI_DATA,
	REPRESENTATIONS_BACKOFFICE_RESPONSE
} = require('../../__data__/representation');
const { SERVICE_USERS_BACKOFFICE_DATA } = require('../../__data__/serviceUser');
const {
	BACK_OFFICE_DB_DOCUMENTS,
	DB_DOCUMENTS: NI_DB_DOCUMENTS
} = require('../../__data__/documents');
const config = require('../../../src/lib/config');

describe('representation.mapper', () => {
	describe('mapBackOfficeRepresentationToApi', () => {
		it('maps the back office representation record to the API format', () => {
			const mockRepresentation = {
				...REPRESENTATION_BACKOFFICE_DATA,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: SERVICE_USERS_BACKOFFICE_DATA[1]
			};
			const result = mapBackOfficeRepresentationToApi(mockRepresentation, BACK_OFFICE_DB_DOCUMENTS);

			expect(result).toEqual(REPRESENTATION_BACKOFFICE_RESPONSE);
		});
		it('representative is null', () => {
			const mockRepresented = {
				...REPRESENTATION_BACKOFFICE_DATA,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: null
			};
			const result = mapBackOfficeRepresentationToApi(mockRepresented, BACK_OFFICE_DB_DOCUMENTS);
			expect(result).toEqual({
				...REPRESENTATION_BACKOFFICE_RESPONSE,
				Representative: ''
			});
		});
	});
	describe('mapBackOfficeRepresentationsToApi', () => {
		it('maps the back office representation records to the API format', () => {
			const mockRepresented = REPRESENTATIONS_BACKOFFICE_DATA.map((representation) => ({
				...representation,
				represented: SERVICE_USERS_BACKOFFICE_DATA[0],
				representative: SERVICE_USERS_BACKOFFICE_DATA[1]
			}));
			const result = mapBackOfficeRepresentationsToApi(mockRepresented);

			expect(result).toEqual(REPRESENTATIONS_BACKOFFICE_RESPONSE);
		});
	});
	describe('mapNIRepresentationToApi', () => {
		it('maps the NI representation record to the API format', () => {
			const result = mapNIRepresentationToApi(REPRESENTATION_NI_DATA[0], NI_DB_DOCUMENTS);
			expect(result).toEqual({
				...REPRESENTATION_NI_DATA[0],
				attachments: NI_DB_DOCUMENTS.map((doc) => ({
					...doc,
					path: `${config.documentsHost}${doc.path}`
				}))
			});
		});
	});
});
