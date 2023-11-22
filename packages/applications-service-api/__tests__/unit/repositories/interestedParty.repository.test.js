const {
	createInterestedParty,
	updateInterestedParty
} = require('../../../src/repositories/interestedParty.ni.repository');

const mockInterestedPartyCreate = jest.fn();
const mockInterestedPartyUpdate = jest.fn();
jest.mock('../../../src/models', () => {
	return {
		InterestedParty: {
			create: (data) => mockInterestedPartyCreate(data),
			update: (id, data) => mockInterestedPartyUpdate(id, data)
		}
	};
});

describe('interestedParty NI repository', () => {
	describe('createInterestedParty', () => {
		describe('when submitting valid data', () => {
			it('should call create and return result', async () => {
				const input = { some: 'data' };
				mockInterestedPartyCreate.mockResolvedValueOnce({
					dataValues: {
						id: 1234,
						...input
					}
				});

				const result = await createInterestedParty(input);

				expect(mockInterestedPartyCreate).toHaveBeenCalledWith(input);
				expect(result).toEqual({
					id: 1234,
					...input
				});
			});

			describe('when database returns an error', () => {
				it('should rethrow the error', async () => {
					const someError = {
						name: 'Some Other Error'
					};

					mockInterestedPartyCreate.mockImplementationOnce(() => {
						throw someError;
					});

					await expect(() => createInterestedParty({})).rejects.toEqual(someError);
				});
			});
		});

		describe('when submitting data with invalid characters', () => {
			it('should throw api error with 400 code and message', async () => {
				const errorMessage =
					"Incorrect string value: '\xF0\x9D\x99\xB1\xF0\x9D...' for column 'mename' at row 1";

				mockInterestedPartyCreate.mockImplementationOnce(() => {
					throw {
						name: 'SequelizeDatabaseError',
						parent: {
							code: 'ER_TRUNCATED_WRONG_VALUE_FOR_FIELD'
						},
						message: errorMessage
					};
				});

				await expect(() => createInterestedParty({})).rejects.toEqual({
					code: 400,
					message: {
						errors: [errorMessage]
					}
				});
			});
		});
	});

	describe('updateInterestedParty', () => {
		describe('when submitting valid data and id', () => {
			it('should invoke update', async () => {
				const id = 1;
				const data = { some: 'data' };

				await updateInterestedParty(id, data);

				expect(mockInterestedPartyUpdate).toHaveBeenCalledWith(data, {
					where: {
						ID: id
					}
				});
			});
		});
	});
});
