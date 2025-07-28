const {
	getAllAdviceByCaseReference,
	getAdviceById
} = require('../../../src/repositories/advice.backoffice.repository');
const { ADVICE_BACKOFFICE_DATA, GENERAL_ADVICE_BACKOFFICE_DATA } = require('../../__data__/advice');
const config = require('../../../src/lib/config');
const {
	isGeneralAdviceCaseReference
} = require('../../../src/utils/is-general-advice-case-reference');

const mockFindMany = jest.fn();
const mockCount = jest.fn();
const mockFindUnique = jest.fn();
jest.mock('../../../src/lib/prisma', () => ({
	prismaClient: {
		advice: {
			findMany: (query) => mockFindMany(query),
			count: (query) => mockCount(query),
			findUnique: (query) => mockFindUnique(query)
		}
	}
}));
jest.mock('../../../src/utils/is-general-advice-case-reference', () => ({
	isGeneralAdviceCaseReference: jest.fn()
}));

describe('advice.backoffice.repository', () => {
	describe('getAllAdviceByCaseReference', () => {
		describe('when the feature flag is NOT activated and the case reference is NOT a general advice case reference and a search term has been entered', () => {
			beforeAll(() => {
				config.featureFlag.displaySpecificAndGeneralAdvice = false;
				isGeneralAdviceCaseReference.mockReturnValue(false);
				mockFindMany.mockResolvedValue(ADVICE_BACKOFFICE_DATA);
				mockCount.mockResolvedValue(1);
			});
			it('should call the database with the correct parameters', async () => {
				await getAllAdviceByCaseReference('backoffice', 0, 100, 'search Term', [
					{ adviceDate: 'desc' },
					{ adviceId: 'asc' }
				]);
				expect(mockFindMany).toHaveBeenCalledWith({
					where: {
						AND: [
							{ caseReference: 'backoffice' },
							{
								OR: [
									{ AND: [{ from: { contains: 'search' } }, { from: { contains: 'Term' } }] },
									{ AND: [{ agent: { contains: 'search' } }, { agent: { contains: 'Term' } }] },
									{
										AND: [
											{ enquiryDetails: { contains: 'search' } },
											{ enquiryDetails: { contains: 'Term' } }
										]
									},
									{
										AND: [
											{ enquiryDetailsWelsh: { contains: 'search' } },
											{ enquiryDetailsWelsh: { contains: 'Term' } }
										]
									},
									{
										AND: [
											{ adviceDetails: { contains: 'search' } },
											{ adviceDetails: { contains: 'Term' } }
										]
									},
									{
										AND: [
											{ adviceDetailsWelsh: { contains: 'search' } },
											{ adviceDetailsWelsh: { contains: 'Term' } }
										]
									}
								]
							}
						]
					},
					orderBy: [
						{
							adviceDate: 'desc'
						},
						{
							adviceId: 'asc'
						}
					],
					skip: 0,
					take: 100
				});
			});
			it('should return the correct data', async () => {
				const result = await getAllAdviceByCaseReference('backoffice');
				expect(result).toEqual({
					count: 1,
					advice: ADVICE_BACKOFFICE_DATA
				});
			});
		});

		describe('when the feature flag is activated and the case reference is NOT a general advice case reference', () => {
			beforeAll(() => {
				config.featureFlag.displaySpecificAndGeneralAdvice = true;
				isGeneralAdviceCaseReference.mockReturnValue(false);
				mockFindMany.mockResolvedValue(ADVICE_BACKOFFICE_DATA);
				mockCount.mockResolvedValue(1);
			});
			it('should call the database with the correct parameters', async () => {
				await getAllAdviceByCaseReference('backoffice', 0, 100, '', [
					{ adviceDate: 'desc' },
					{ adviceId: 'asc' }
				]);
				expect(mockFindMany).toHaveBeenCalledWith({
					where: {
						AND: [
							{
								caseReference: 'backoffice'
							},
							{
								OR: [
									{ AND: [{ from: { contains: '' } }] },
									{ AND: [{ agent: { contains: '' } }] },
									{
										AND: [{ enquiryDetails: { contains: '' } }]
									},
									{
										AND: [{ enquiryDetailsWelsh: { contains: '' } }]
									},
									{
										AND: [{ adviceDetails: { contains: '' } }]
									},
									{
										AND: [{ adviceDetailsWelsh: { contains: '' } }]
									}
								]
							}
						]
					},
					orderBy: [
						{
							adviceDate: 'desc'
						},
						{
							adviceId: 'asc'
						}
					],
					skip: 0,
					take: 100
				});
			});
			it('should return the correct data', async () => {
				const result = await getAllAdviceByCaseReference('backoffice');
				expect(result).toEqual({
					count: 1,
					advice: ADVICE_BACKOFFICE_DATA
				});
			});
		});

		describe('when the feature flag is NOT activated and the case reference is a general advice case reference', () => {
			beforeAll(() => {
				config.featureFlag.displaySpecificAndGeneralAdvice = false;
				isGeneralAdviceCaseReference.mockReturnValue(true);
				mockFindMany.mockResolvedValue(ADVICE_BACKOFFICE_DATA);
				mockCount.mockResolvedValue(1);
			});
			it('should call the database with the correct parameters', async () => {
				await getAllAdviceByCaseReference('backoffice', 0, 100, '', [
					{ adviceDate: 'desc' },
					{ adviceId: 'asc' }
				]);
				expect(mockFindMany).toHaveBeenCalledWith({
					where: {
						AND: [
							{
								caseReference: 'backoffice'
							},
							{
								OR: [
									{ AND: [{ from: { contains: '' } }] },
									{ AND: [{ agent: { contains: '' } }] },
									{
										AND: [{ enquiryDetails: { contains: '' } }]
									},
									{
										AND: [{ enquiryDetailsWelsh: { contains: '' } }]
									},
									{
										AND: [{ adviceDetails: { contains: '' } }]
									},
									{
										AND: [{ adviceDetailsWelsh: { contains: '' } }]
									}
								]
							}
						]
					},
					orderBy: [
						{
							adviceDate: 'desc'
						},
						{
							adviceId: 'asc'
						}
					],
					skip: 0,
					take: 100
				});
			});
			it('should return the correct data', async () => {
				const result = await getAllAdviceByCaseReference('backoffice');
				expect(result).toEqual({
					count: 1,
					advice: ADVICE_BACKOFFICE_DATA
				});
			});
		});

		describe('when the feature flag is activated and the case reference is a general advice case reference', () => {
			beforeAll(() => {
				config.featureFlag.displaySpecificAndGeneralAdvice = true;
				isGeneralAdviceCaseReference.mockReturnValue(true);
				mockFindMany.mockResolvedValue(GENERAL_ADVICE_BACKOFFICE_DATA);
				mockCount.mockResolvedValue(1);
			});
			it('should call the database with the correct parameters', async () => {
				await getAllAdviceByCaseReference('backoffice', 0, 100, '', [
					{ adviceDate: 'desc' },
					{ adviceId: 'asc' }
				]);
				expect(mockFindMany).toHaveBeenCalledWith({
					where: {
						AND: [
							{
								OR: [
									{ AND: [{ from: { contains: '' } }] },
									{ AND: [{ agent: { contains: '' } }] },
									{
										AND: [{ enquiryDetails: { contains: '' } }]
									},
									{
										AND: [{ enquiryDetailsWelsh: { contains: '' } }]
									},
									{
										AND: [{ adviceDetails: { contains: '' } }]
									},
									{
										AND: [{ adviceDetailsWelsh: { contains: '' } }]
									}
								]
							}
						]
					},
					include: {
						project: {
							select: {
								projectName: true,
								projectNameWelsh: true
							}
						}
					},
					orderBy: [
						{
							adviceDate: 'desc'
						},
						{
							adviceId: 'asc'
						}
					],
					skip: 0,
					take: 100
				});
			});
			it('should return the correct data', async () => {
				const result = await getAllAdviceByCaseReference('backoffice');
				expect(result).toEqual({
					count: 1,
					advice: GENERAL_ADVICE_BACKOFFICE_DATA
				});
			});
		});
	});

	describe('getAdviceById', () => {
		beforeAll(() => {
			mockFindUnique.mockResolvedValue(ADVICE_BACKOFFICE_DATA[0]);
		});
		it('should call the database with the correct parameters', async () => {
			await getAdviceById(1);
			expect(mockFindUnique).toHaveBeenCalledWith({
				where: {
					adviceId: 1
				}
			});
		});
		it('should return the correct data', async () => {
			const result = await getAdviceById(1);
			expect(result).toEqual(ADVICE_BACKOFFICE_DATA[0]);
		});
	});
});
