const unpublishExaminationLibrary = require('../index');
const axios = require('axios');
const { prismaClient } = require('../../lib/prisma');

jest.mock('../../lib/prisma', () => ({
	prismaClient: {
		document: {
			updateMany: jest.fn()
		}
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
	categories: ['APP', 'AoC']
};

describe('nsip-examination-library-unpublish', () => {
	beforeEach(() => {
		jest.clearAllMocks();

		prismaClient.document.updateMany.mockResolvedValue({ count: 5 });
		axios.delete.mockResolvedValue({ data: { success: true } });

		process.env.APPLICATIONS_SERVICE_API_URL = 'https://example.org';
	});

	it('unpublishes documents across different examination library categories', async () => {
		const message = {
			caseReference: 'EN010120',
			categories: ['APP', 'AoC']
		};

		// Simulate four matching published documents being updated
		prismaClient.document.updateMany.mockResolvedValueOnce({ count: 4 });

		await unpublishExaminationLibrary(mockContext, message);

		expect(prismaClient.document.updateMany).toHaveBeenCalledTimes(1);

		expect(prismaClient.document.updateMany).toHaveBeenCalledWith({
			where: {
				caseRef: 'EN010120',
				examinationCategoryCode: {
					in: ['APP', 'AoC']
				},
				examinationCategoryPublishedStatus: 'published'
			},
			data: {
				examinationCategoryPublishedStatus: 'unpublished',
				modifiedAt: expect.any(Date)
			}
		});

		expect(mockContext.log).toHaveBeenCalledWith(
			'Unpublished 4 examination library documents for caseRef EN010120'
		);
	});

	it('throws an error if caseReference is missing', async () => {
		await expect(
			unpublishExaminationLibrary(mockContext, {
				categories: ['APP']
			})
		).rejects.toThrow('Invalid examination library unpublish message');

		expect(prismaClient.document.updateMany).not.toHaveBeenCalled();
	});

	it('throws an error if categories is empty', async () => {
		await expect(
			unpublishExaminationLibrary(mockContext, {
				caseReference: 'EN010120',
				categories: []
			})
		).rejects.toThrow('Invalid examination library unpublish message');

		expect(prismaClient.document.updateMany).not.toHaveBeenCalled();
	});

	it('throws an error if a category code is missing', async () => {
		await expect(
			unpublishExaminationLibrary(mockContext, {
				caseReference: 'EN010120',
				categories: ['APP', '']
			})
		).rejects.toThrow('Missing required examination library category code');

		expect(prismaClient.document.updateMany).not.toHaveBeenCalled();
	});

	it('clears the document cache after unpublishing', async () => {
		await unpublishExaminationLibrary(mockContext, mockMessage);

		expect(axios.delete).toHaveBeenCalledWith(
			'https://example.org/api/v1/cache/clear?pattern=cache:EN010120:docs*'
		);
	});

	it('does not clear the cache if the database update fails', async () => {
		prismaClient.document.updateMany.mockRejectedValueOnce(new Error('Database error'));

		await expect(unpublishExaminationLibrary(mockContext, mockMessage)).rejects.toThrow(
			'Database error'
		);

		expect(axios.delete).not.toHaveBeenCalled();
	});
});
