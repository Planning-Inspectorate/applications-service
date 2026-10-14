const publishExaminationLibrary = require('../index');
const axios = require('axios');

const mockUpdateMany = jest.fn();

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		$transaction: jest.fn(async (callback) =>
			callback({
				document: {
					updateMany: mockUpdateMany
				}
			})
		)
	}
}));

jest.mock('axios', () => ({
	delete: jest.fn()
}));

const mockContext = {
	log: jest.fn()
};

const mockMessage = {
	caseReference: 'EN010120',
	examinationDocuments: [
		{
			documentGuid: 'guid-123',
			documentExaminationReference: 'APP-001',
			categoryCode: 'APP',
			categoryName: 'Application Documents'
		},
		{
			documentGuid: 'guid-456',
			documentExaminationReference: 'APP-002',
			categoryCode: 'APP',
			categoryName: 'Application Documents'
		}
	]
};

describe('nsip-examination-library', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		mockUpdateMany.mockResolvedValue({ count: 1 });
		axios.delete.mockResolvedValue({ status: 200 });

		process.env.APPLICATIONS_SERVICE_API_URL = 'https://example.org';
	});

	it('updates existing documents with examination library metadata', async () => {
		await publishExaminationLibrary(mockContext, mockMessage);

		expect(mockUpdateMany).toHaveBeenCalledTimes(2);

		expect(mockUpdateMany).toHaveBeenNthCalledWith(1, {
			where: {
				documentId: 'guid-123',
				caseRef: 'EN010120'
			},
			data: {
				examinationRefNo: 'APP-001',
				examinationCategoryCode: 'APP',
				examinationCategoryName: 'Application Documents',
				examinationCategoryPublishedStatus: 'published',
				modifiedAt: expect.any(Date)
			}
		});

		expect(mockUpdateMany).toHaveBeenNthCalledWith(2, {
			where: {
				documentId: 'guid-456',
				caseRef: 'EN010120'
			},
			data: {
				examinationRefNo: 'APP-002',
				examinationCategoryCode: 'APP',
				examinationCategoryName: 'Application Documents',
				examinationCategoryPublishedStatus: 'published',
				modifiedAt: expect.any(Date)
			}
		});
	});

	it('throws an error if caseReference is missing', async () => {
		await expect(
			publishExaminationLibrary(mockContext, {
				examinationDocuments: mockMessage.examinationDocuments
			})
		).rejects.toThrow('Invalid examination library publish message');

		expect(mockUpdateMany).not.toHaveBeenCalled();
	});

	it('throws an error if examinationDocuments is empty', async () => {
		await expect(
			publishExaminationLibrary(mockContext, {
				caseReference: 'EN010120',
				examinationDocuments: []
			})
		).rejects.toThrow('Invalid examination library publish message');

		expect(mockUpdateMany).not.toHaveBeenCalled();
	});

	it('throws an error if document properties are missing', async () => {
		await expect(
			publishExaminationLibrary(mockContext, {
				caseReference: 'EN010120',
				examinationDocuments: [{ documentGuid: 'guid-123' }]
			})
		).rejects.toThrow('Missing required examination library document properties');

		expect(mockUpdateMany).not.toHaveBeenCalled();
	});

	it('throws an error if a document is not found in FO', async () => {
		mockUpdateMany.mockResolvedValueOnce({ count: 0 });

		await expect(publishExaminationLibrary(mockContext, mockMessage)).rejects.toThrow(
			'Document guid-123 not found'
		);

		expect(axios.delete).not.toHaveBeenCalled();
	});

	it('clears the document cache after publishing', async () => {
		await publishExaminationLibrary(mockContext, mockMessage);

		expect(axios.delete).toHaveBeenCalledWith(
			'https://example.org/api/v1/cache/clear?pattern=cache:EN010120:docs*'
		);
	});

	it('does not clear the cache if a database update fails', async () => {
		mockUpdateMany.mockRejectedValueOnce(new Error('Database error'));

		await expect(publishExaminationLibrary(mockContext, mockMessage)).rejects.toThrow(
			'Database error'
		);

		expect(axios.delete).not.toHaveBeenCalled();
	});
});
