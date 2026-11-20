const {
	getRepresentationsWithPublishedAttachments
} = require('../../../src/utils/get-representations-with-published-attachments');
const {
	getPublishedDocumentIds: getPublishedDocumentIdsBORepository
} = require('../../../src/repositories/document.backoffice.repository');
const {
	getPublishedDocumentIds: getPublishedDocumentIdsNIRepository
} = require('../../../src/repositories/document.ni.repository');
const {
	REPRESENTATION_NI_DATA,
	REPRESENTATIONS_BACKOFFICE_RESPONSE
} = require('../../__data__/representation');

jest.mock('../../../src/repositories/document.ni.repository');
jest.mock('../../../src/repositories/document.backoffice.repository');

describe('getRepresentationsWithPublishedAttachments', () => {
	const mockIsBOApplication = true;

	describe('when case reference is back office', () => {
		it('returns the representation with hasPublishedAttachments set as false if the representation has NO attachments', async () => {
			const mockRepresentations = [
				{
					...REPRESENTATIONS_BACKOFFICE_RESPONSE[0],
					Attachments: ''
				}
			];
			getPublishedDocumentIdsBORepository.mockResolvedValue(['mock-1', 'mock-2']);

			const result = await getRepresentationsWithPublishedAttachments(
				mockRepresentations,
				mockIsBOApplication
			);

			expect(result).toEqual([
				{
					...REPRESENTATIONS_BACKOFFICE_RESPONSE[0],
					Attachments: '',
					hasPublishedAttachments: false
				}
			]);
		});

		it('returns the representation with hasPublishedAttachments set as false if the case has NO published documents', async () => {
			const mockRepresentations = [REPRESENTATIONS_BACKOFFICE_RESPONSE[0]];
			getPublishedDocumentIdsBORepository.mockResolvedValue([]);

			const result = await getRepresentationsWithPublishedAttachments(
				mockRepresentations,
				mockIsBOApplication
			);

			expect(result).toEqual([
				{
					...REPRESENTATIONS_BACKOFFICE_RESPONSE[0],
					hasPublishedAttachments: false
				}
			]);
		});

		it('returns the representation with hasPublishedAttachments set as false if the representation has NO published attachments', async () => {
			const mockRepresentations = [REPRESENTATIONS_BACKOFFICE_RESPONSE[0]];
			getPublishedDocumentIdsBORepository.mockResolvedValue(['mock-1', 'mock-2']);

			const result = await getRepresentationsWithPublishedAttachments(
				mockRepresentations,
				mockIsBOApplication
			);

			expect(result).toEqual([
				{
					...REPRESENTATIONS_BACKOFFICE_RESPONSE[0],
					hasPublishedAttachments: false
				}
			]);
		});

		it('returns the representation with hasPublishedAttachments set as true the representation has any published attachments', async () => {
			const mockRepresentations = [REPRESENTATIONS_BACKOFFICE_RESPONSE[0]];
			getPublishedDocumentIdsBORepository.mockResolvedValue(['1']);

			const result = await getRepresentationsWithPublishedAttachments(
				mockRepresentations,
				mockIsBOApplication
			);

			expect(result).toEqual([
				{
					...REPRESENTATIONS_BACKOFFICE_RESPONSE[0],
					hasPublishedAttachments: true
				}
			]);
		});
	});

	describe('when case reference is ni', () => {
		const mockIsBOApplication = false;

		it('returns the representation with hasPublishedAttachments set as false if the representation has NO attachments', async () => {
			const mockRepresentations = [
				{
					...REPRESENTATION_NI_DATA,
					Attachments: ''
				}
			];
			getPublishedDocumentIdsNIRepository.mockResolvedValue(['mock-1', 'mock-2']);

			const result = await getRepresentationsWithPublishedAttachments(
				mockRepresentations,
				mockIsBOApplication
			);

			expect(result).toEqual([
				{
					...REPRESENTATION_NI_DATA,
					Attachments: '',
					hasPublishedAttachments: false
				}
			]);
		});

		it('returns the representation with hasPublishedAttachments set as false if the case has NO published documents', async () => {
			const mockRepresentations = [REPRESENTATION_NI_DATA];
			getPublishedDocumentIdsNIRepository.mockResolvedValue([]);

			const result = await getRepresentationsWithPublishedAttachments(
				mockRepresentations,
				mockIsBOApplication
			);

			expect(result).toEqual([
				{
					...REPRESENTATION_NI_DATA,
					hasPublishedAttachments: false
				}
			]);
		});

		it('returns the representation with hasPublishedAttachments set as false if the representation has NO published attachments', async () => {
			const mockRepresentations = [REPRESENTATION_NI_DATA];
			getPublishedDocumentIdsNIRepository.mockResolvedValue(['mock-1', 'mock-2']);

			const result = await getRepresentationsWithPublishedAttachments(
				mockRepresentations,
				mockIsBOApplication
			);

			expect(result).toEqual([
				{
					...REPRESENTATION_NI_DATA,
					hasPublishedAttachments: false
				}
			]);
		});

		it('returns the representation with hasPublishedAttachments set as true if the representation has any published attachments', async () => {
			const mockRepresentations = [REPRESENTATION_NI_DATA];
			getPublishedDocumentIdsNIRepository.mockResolvedValue(['WS010006-000002']);

			const result = await getRepresentationsWithPublishedAttachments(
				mockRepresentations,
				mockIsBOApplication
			);

			expect(result).toEqual([
				{
					...REPRESENTATION_NI_DATA,
					hasPublishedAttachments: true
				}
			]);
		});
	});
});
