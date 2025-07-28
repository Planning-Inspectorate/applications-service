const { notifyBuilder, createNotifyClient } = require('@planning-inspectorate/pins-notify');
const logger = require('../../../src/lib/logger');
const {
	sendIPRegistrationConfirmationEmailToIP,
	sendSubmissionNotification,
	sendSubscriptionCreateNotification
} = require('../../../src/lib/notify');

jest.mock('../../../src/lib/logger', () => ({
	error: jest.fn().mockReturnThis()
}));

jest.mock('../../../src/lib/config', () => ({
	services: {
		notify: {
			templates: {
				IPRegistrationConfirmationEmailToIP: {
					en: 'registration_confirmation_template_id',
					cy: 'registration_confirmation_cy_template_id'
				},
				submissionCompleteEmail: {
					en: 'submission_complete_template_id',
					cy: 'submission_complete_cy_template_id'
				},
				subscriptionCreateEmail: {
					en: 'subscription_create_template_id',
					cy: 'subscription_create_cy_template_id'
				}
			},
			havingYourSayUrl: 'somedomain.example.com/having-your-say-guide',
			subscriptionCreateDomain: 'somedomain.example.com'
		}
	},
	logger: {
		level: 'info'
	}
}));

jest.mock('@planning-inspectorate/pins-notify', () => ({
	createNotifyClient: {
		createNotifyClient: jest.fn().mockReturnThis()
	},
	notifyBuilder: {
		reset: jest.fn().mockReturnThis(),
		setNotifyClient: jest.fn().mockReturnThis(),
		setTemplateId: jest.fn().mockReturnThis(),
		setDestinationEmailAddress: jest.fn().mockReturnThis(),
		setTemplateVariablesFromObject: jest.fn().mockReturnThis(),
		setReference: jest.fn().mockReturnThis(),
		sendEmail: jest.fn()
	}
}));

describe('notify lib', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('sendIPRegistrationConfirmationEmailToIP', () => {
		it('should send an email - en template if no projectNameWelsh provided', async () => {
			const details = {
				email: 'elvin.ali@planninginspectorate.gov.uk',
				projectName: 'St James Barton Giant Wind Turbine',
				ipName: 'David White',
				ipRef: '30000120',
				projectEmail: 'david.white@pins.gsi.gov.uk'
			};
			await sendIPRegistrationConfirmationEmailToIP(details);

			expect(notifyBuilder.reset).toHaveBeenCalled();
			expect(notifyBuilder.setTemplateId).toHaveBeenCalledWith(
				'registration_confirmation_template_id'
			);
			expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith(
				'elvin.ali@planninginspectorate.gov.uk'
			);
			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				'email address': details.email,
				project_name: details.projectName,
				interested_party_name: details.ipName,
				interested_party_ref: details.ipRef,
				having_your_say_url: 'somedomain.example.com/having-your-say-guide',
				project_email: details.projectEmail
			});
			expect(notifyBuilder.setReference).toHaveBeenCalledWith('30000120');
			expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
		});

		it('should send an email - cy template if projectNameWelsh provided', async () => {
			const details = {
				email: 'elvin.ali@planninginspectorate.gov.uk',
				projectName: 'St James Barton Giant Wind Turbine',
				projectNameWelsh: 'A Welsh Project Name',
				ipName: 'David White',
				ipRef: '30000120',
				projectEmail: 'david.white@pins.gsi.gov.uk'
			};
			await sendIPRegistrationConfirmationEmailToIP(details);

			expect(notifyBuilder.reset).toHaveBeenCalled();
			expect(notifyBuilder.setTemplateId).toHaveBeenCalledWith(
				'registration_confirmation_cy_template_id'
			);
			expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith(
				'elvin.ali@planninginspectorate.gov.uk'
			);
			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				'email address': details.email,
				project_name: details.projectName,
				project_name_welsh: details.projectNameWelsh,
				interested_party_name: details.ipName,
				interested_party_ref: details.ipRef,
				having_your_say_url: 'somedomain.example.com/having-your-say-guide',
				project_email: details.projectEmail
			});
			expect(notifyBuilder.setReference).toHaveBeenCalledWith('30000120');
			expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
		});

		it("should use generic project email if one isn't provided", async () => {
			const details = {
				email: 'test@example.com',
				projectName: 'St James Barton Giant Wind Turbine',
				ipName: 'A Person',
				ipRef: '30000120'
			};
			await sendIPRegistrationConfirmationEmailToIP(details);

			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				'email address': details.email,
				project_name: details.projectName,
				interested_party_name: details.ipName,
				interested_party_ref: details.ipRef,
				having_your_say_url: 'somedomain.example.com/having-your-say-guide',
				project_email: 'NIEnquiries@planninginspectorate.gov.uk'
			});
		});

		it('should log errors', async () => {
			const details = {
				email: undefined,
				projectName: 'St James Barton Giant Wind Turbine',
				ipName: 'A Person',
				ipRef: '30000124'
			};
			const error = new Error('problem');

			createNotifyClient.createNotifyClient.mockImplementationOnce(error);

			await sendIPRegistrationConfirmationEmailToIP(details);

			expect(logger.error).toHaveBeenCalledWith(
				{ err: error },
				'Notify service unable to send IP registration confirmation email to interested party ref 30000124.'
			);
		});
	});

	describe('sendSubmissionNotification', () => {
		it('should send an email', async () => {
			const details = {
				email: 'a@example.com',
				submissionId: 1,
				project: {
					name: 'some project',
					email: 'project@example.com'
				}
			};
			await sendSubmissionNotification(details);

			expect(notifyBuilder.reset).toHaveBeenCalled();
			expect(notifyBuilder.setTemplateId).toHaveBeenCalledWith('submission_complete_template_id');
			expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('a@example.com');
			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				'email address': 'a@example.com',
				submission_id: 1,
				project_name: 'some project',
				project_email: 'project@example.com'
			});
			expect(notifyBuilder.setReference).toHaveBeenCalledWith('Submission 1');
			expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
		});

		it('should send an email - Welsh project name provided', async () => {
			const details = {
				email: 'a@example.com',
				submissionId: 1,
				project: {
					name: 'some project',
					welshName: 'some project Welsh name',
					email: 'project@example.com'
				}
			};
			await sendSubmissionNotification(details);

			expect(notifyBuilder.reset).toHaveBeenCalled();
			expect(notifyBuilder.setTemplateId).toHaveBeenCalledWith(
				'submission_complete_cy_template_id'
			);
			expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('a@example.com');
			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				'email address': 'a@example.com',
				submission_id: 1,
				project_name: 'some project',
				project_name_welsh: 'some project Welsh name',
				project_email: 'project@example.com'
			});
			expect(notifyBuilder.setReference).toHaveBeenCalledWith('Submission 1');
			expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
		});

		it("should use generic project email if one isn't provided", async () => {
			const details = {
				email: 'a@example.com',
				submissionId: 1,
				project: {
					name: 'some project',
					email: undefined
				}
			};
			await sendSubmissionNotification(details);

			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				'email address': 'a@example.com',
				submission_id: 1,
				project_name: 'some project',
				project_email: 'NIEnquiries@planninginspectorate.gov.uk'
			});
		});

		it('should log errors', async () => {
			const details = {
				email: 'a@example.com',
				submissionId: 1,
				project: {
					name: 'some project',
					email: 'project@example.com'
				}
			};
			const error = new Error('problem');

			notifyBuilder.setDestinationEmailAddress.mockImplementationOnce(error);

			await sendSubmissionNotification(details);

			expect(logger.error).toHaveBeenCalledWith(
				{ err: error },
				'Notify service unable to send submission notification email for submission ID 1'
			);
		});
	});

	describe('sendSubscriptionCreateNotification', () => {
		it('should send an email - en template if no Welsh name provided', async () => {
			const details = {
				email: 'a@example.com',
				subscriptionDetails: 'some_encrypted_string',
				project: {
					name: 'some project',
					email: 'project@example.com',
					caseReference: 'BC0110001'
				}
			};
			await sendSubscriptionCreateNotification(details);

			expect(notifyBuilder.reset).toHaveBeenCalled();
			expect(notifyBuilder.setTemplateId).toHaveBeenCalledWith('subscription_create_template_id');
			expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('a@example.com');
			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				subscription_url:
					'somedomain.example.com/projects/BC0110001/get-updates/subscribed?subscriptionDetails=some_encrypted_string',
				project_name: 'some project',
				project_email: 'project@example.com'
			});
			expect(notifyBuilder.setReference).toHaveBeenCalledWith(
				'Subscription BC0110001 a@example.com'
			);
			expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
		});

		it('should send an email - cy template if Welsh name provided', async () => {
			const details = {
				email: 'a@example.com',
				subscriptionDetails: 'some_encrypted_string',
				project: {
					name: 'some project',
					welshName: 'Welsh project name',
					email: 'project@example.com',
					caseReference: 'BC0110001'
				}
			};
			await sendSubscriptionCreateNotification(details);

			expect(notifyBuilder.reset).toHaveBeenCalled();
			expect(notifyBuilder.setTemplateId).toHaveBeenCalledWith(
				'subscription_create_cy_template_id'
			);
			expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith('a@example.com');
			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				subscription_url:
					'somedomain.example.com/projects/BC0110001/get-updates/subscribed?subscriptionDetails=some_encrypted_string',
				project_name: 'some project',
				project_email: 'project@example.com',
				project_name_welsh: 'Welsh project name'
			});
			expect(notifyBuilder.setReference).toHaveBeenCalledWith(
				'Subscription BC0110001 a@example.com'
			);
			expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
		});

		it('should log errors', async () => {
			const details = {
				email: 'a@example.com',
				subscriptionDetails: 'some_encrypted_string',
				project: {
					name: 'some project',
					email: 'project@example.com',
					caseReference: 'BC0110001'
				}
			};

			const error = new Error('problem');

			notifyBuilder.sendEmail.mockImplementationOnce(error);

			await sendSubscriptionCreateNotification(details);

			expect(logger.error).toHaveBeenCalledWith(
				{ err: error },
				'Notify service unable to send subscription create email for case reference BC0110001'
			);
		});
	});
});
