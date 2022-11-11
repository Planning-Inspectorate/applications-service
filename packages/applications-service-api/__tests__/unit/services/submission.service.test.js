const { createSubmission, updateSubmission } = require('../../../src/services/submission.service');

const mockCreate = jest.fn();
const mockUpdate = jest.fn();

jest.mock('../../../src/models', () => {
	return {
		Submission: {
			create: (attributes) => mockCreate(attributes),
			update: (attributes, conditions) => mockUpdate(attributes, conditions)
		}
	};
});

describe('submission service', () => {
	describe('createSubmission', () => {
		it('calls create with submissionId if one is provided', async () => {
			const attributes = {
				name: 'Foo',
				submissionId: 123
			};
			mockCreate.mockResolvedValueOnce({
				dataValues: attributes
			});

			await createSubmission(attributes);

			expect(mockCreate).toBeCalledWith(attributes);
			expect(mockUpdate).not.toBeCalled();
		});

		it('calls create then update if no submissionId is provided', async () => {
			const attributes = {
				name: 'Foo'
			};

			mockCreate.mockResolvedValueOnce({
				dataValues: {
					...attributes,
					id: 1
				}
			});

			await createSubmission(attributes);

			expect(mockCreate).toBeCalledWith({
				...attributes,
				submissionId: 0 // dummy submission id to satisfy non-null requirement in ni db
			});
			expect(mockUpdate).toBeCalledWith(
				{
					submissionId: 1
				},
				{
					where: {
						id: 1
					}
				}
			);
		});

		it('returns apierror if db create fails with ER_TRUNCATED_WRONG_VALUE_FOR_FIELD encoding/collation error', async () => {
			mockCreate.mockRejectedValueOnce({
				name: 'SequelizeDatabaseError',
				parent: {
					code: 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'
				},
				message: 'some error'
			});

			// utf8 value unsupported by db
			await expect(createSubmission({ representation: '🐦‍⬛' })).rejects.toEqual({
				code: 400,
				message: {
					errors: ['some error']
				}
			});
		});
	});

	describe('updateSubmission', () => {
		it('calls update with file attributes if they are provided', async () => {
			await updateSubmission({
				id: 1,
				file: {
					originalName: 'original-name',
					name: 'name',
					size: 1,
					md5: 'eff3bb63d2814c169b750132e3e5b523'
				}
			});

			expect(mockUpdate).toBeCalledWith(
				{
					filenameOriginal: 'original-name',
					filename: 'name',
					fileSize: 1,
					fileMD5: 'eff3bb63d2814c169b750132e3e5b523'
				},
				{
					where: {
						id: 1
					}
				}
			);
		});

		it('calls update with submissionId if it is provided', async () => {
			await updateSubmission({
				id: 1,
				submissionId: 123
			});

			expect(mockUpdate).toBeCalledWith(
				{
					submissionId: 123
				},
				{
					where: {
						id: 1
					}
				}
			);
		});

		it('does not call update with attributes other than file and submissionId', async () => {
			await updateSubmission({
				id: 1,
				ignoreme: 'hello'
			});

			expect(mockUpdate).not.toBeCalledWith(
				{
					ignoreme: 'hello'
				},
				{
					where: {
						id: 1
					}
				}
			);
		});
	});
});
