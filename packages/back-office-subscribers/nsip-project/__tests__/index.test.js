const subject = require('../index');

describe('nsip-project', () => {
	const project = {
		caseId: 1,
		caseReference: null,
		projectName: 'some case',
		projectDescription: 'some desc',
		publishStatus: 'unpublished',
		sourceSystem: 'ODT',
		applicantIds: ['1'],
		nsipOfficerIds: [],
		nsipAdministrationOfficerIds: [],
		inspectorIds: [],
		interestedPartyIds: []
	};

	describe('index', () => {
		it('invokes log', async () => {
			const mockLog = jest.fn();
			const mockContext = {
				log: mockLog,
				bindingData: {
					enqueuedTimeUtc: 1,
					deliveryCount: 1,
					messageId: 123
				},
				bindings: {
					project: jest.fn()
				}
			};

			await subject(mockContext, project);

			expect(mockContext.bindings.project).toEqual(project);
		});
	});
});
