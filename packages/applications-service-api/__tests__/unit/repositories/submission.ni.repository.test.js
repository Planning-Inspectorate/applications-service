const {
	getSubmission,
	createSubmission,
	updateSubmission,
	updateSubmissionsBySubmissionId
} = require('../../../src/repositories/submission.ni.repository');

const mockCreate = jest.fn();
const mockUpdate = jest.fn();
const mockFindOne = jest.fn();
jest.mock('../../../src/models', () => {
	return {
		Submission: {
			create: (attributes) => mockCreate(attributes),
			update: (attributes, conditions) => mockUpdate(attributes, conditions),
			findOne: (attributes) => mockFindOne(attributes)
		}
	};
});

describe('submission ni repository', () => {
	describe('getSubmission', () => {
		it('invokes db method correctly', async () => {
			await getSubmission(123);

			expect(mockFindOne).toHaveBeenCalledWith({ where: { id: 123 } });
		});
	});

	describe('createSubmission', () => {
		it('invokes db method correctly', async () => {
			mockCreate.mockResolvedValueOnce({
				dataValues: {
					id: 123,
					name: 'foo'
				}
			});

			const result = await createSubmission({ name: 'foo' });

			expect(mockCreate).toHaveBeenCalledWith({ name: 'foo' });
			expect(result).toEqual({
				id: 123,
				name: 'foo'
			});
		});
	});

	describe('updateSubmission', () => {
		it('invokes db method correctly', async () => {
			await updateSubmission(123, { name: 'foo' });

			expect(mockUpdate).toHaveBeenCalledWith({ name: 'foo' }, { where: { id: 123 } });
		});
	});

	describe('updateSubmissionsBySubmissionId', () => {
		it('invokes db method correctly', async () => {
			await updateSubmissionsBySubmissionId(123, { name: 'foo' });

			expect(mockUpdate).toHaveBeenCalledWith({ name: 'foo' }, { where: { submissionId: 123 } });
		});
	});
});
