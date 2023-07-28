const subject = require('../index');

describe('nsip-project', () => {
	const message = {
		caseId: 1,
		caseReference: 'ABC',
		projectName: 'some case',
		projectDescription: 'some desc',
		publishStatus: 'published',
		sourceSystem: 'ODT',
		applicantIds: ['1'],
		nsipOfficerIds: [],
		nsipAdministrationOfficerIds: [],
		inspectorIds: [],
		interestedPartyIds: [],
		regions: ['a', 'b']
	};

	const project = {
		caseId: 1,
		caseReference: 'ABC',
		projectName: 'some case',
		projectDescription: 'some desc',
		publishStatus: 'published',
		sourceSystem: 'ODT',
		regions: 'a,b'
	};

	beforeAll(() => jest.useFakeTimers());
	afterAll(() => jest.useRealTimers());

	describe('index', () => {
		it('assigns project data to binding in correct format', async () => {
			const dateNow = new Date();
			jest.setSystemTime(dateNow);

			const mockContext = {
				log: jest.fn(),
				bindingData: {
					enqueuedTimeUtc: 1,
					deliveryCount: 1,
					messageId: 123
				},
				bindings: {
					project: jest.fn()
				}
			};

			await subject(mockContext, message);

			const expectedProject = {
				...project,
				modifiedAt: dateNow
			};

			expect(mockContext.bindings.project).toEqual(expectedProject);
			expect(mockContext.log).toBeCalledWith(
				`invoking nsip-project function with message: ${JSON.stringify(message)}`
			);
		});
	});
});
