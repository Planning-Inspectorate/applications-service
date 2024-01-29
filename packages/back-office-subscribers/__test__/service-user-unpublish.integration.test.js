const sendServiceUserUnpublishMessage = require('../nsip-service-user-unpublish');
const {
	deleteServiceUser,
	getServiceUser,
	createServiceUser,
	createProject,
	getProject,
	deleteProject
} = require('./test-utils');
const mockServiceUserId = '123';
const mockCaseReference = 'ABC';
describe('nsip-service-user-unpublish integration', () => {
	// exit if not running locally
	if (process.env.ENV !== 'LOCAL') {
		console.log('skipping integration tests');
		throw new Error('Test suite not running locally: skipping integration tests');
	}
	const mockContext = {
		log: jest.fn()
	};

	beforeEach(async () => {
		await deleteServiceUser(mockServiceUserId);
		await deleteProject(mockCaseReference);
	});
	describe('when message does not contain serviceUserId', () => {
		it('should skip unpublish and log', async () => {
			// Act
			await sendServiceUserUnpublishMessage(mockContext, {});
			// Assert
			expect(mockContext.log).toHaveBeenCalledWith(
				'skipping unpublish as serviceUserId is missing'
			);
		});
		describe('when message contains serviceUserId', () => {
			it('should unpublish service user', async () => {
				// Arrange
				await createServiceUser(mockServiceUserId);
				expect(await getServiceUser(mockServiceUserId)).not.toBeNull();
				// Act
				await sendServiceUserUnpublishMessage(mockContext, { id: mockServiceUserId });
				// Assert
				const serviceUser = await getServiceUser(mockServiceUserId);
				expect(serviceUser).toBeNull();
				expect(mockContext.log).toHaveBeenCalledWith(
					`unpublished service user with serviceUserId ${mockServiceUserId}`
				);
			});
			it('should disconnect service user from project', async () => {
				// Arrange
				await createServiceUser(mockServiceUserId);
				await createProject(mockCaseReference, mockServiceUserId);
				expect(await getServiceUser(mockServiceUserId)).not.toBeNull();
				expect((await getProject(mockCaseReference)).applicantId).toBe(mockServiceUserId);
				// Act
				await sendServiceUserUnpublishMessage(mockContext, { id: mockServiceUserId });
				// Assert
				expect(await getServiceUser(mockServiceUserId)).toBeNull();
				const project = await getProject(mockCaseReference);
				expect(project).not.toBeNull();
				expect(project.applicantId).toBeNull();
				expect(mockContext.log).toHaveBeenCalledWith(
					`unpublished service user with serviceUserId ${mockServiceUserId}`
				);
			});
			it('should not throw if service user does not exist', async () => {
				// Arrange
				expect(await getServiceUser(mockServiceUserId)).toBeNull();
				// Act
				await sendServiceUserUnpublishMessage(mockContext, { id: mockServiceUserId });
				// Assert
				expect(mockContext.log).toHaveBeenCalledWith(
					`unpublished service user with serviceUserId ${mockServiceUserId}`
				);
			});
		});
	});
});
