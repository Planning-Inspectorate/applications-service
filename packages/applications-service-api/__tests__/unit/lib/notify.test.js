const { notifyBuilder } = require('@planning-inspectorate/pins-notify');
const {
	sendIPRegistrationConfirmationEmailToIP,
	sendMagicLinkToIP,
	sendSubmissionNotification,
	sendSubscriptionCreateNotification
} = require('../../../src/lib/notify');

jest.mock('../../../src/lib/config', () => ({
	services: {
		notify: {
			templates: {
				IPRegistrationConfirmationEmailToIP: {
					en: 'registration_confirmation_template_id',
					cy: 'registration_confirmation_cy_template_id'
				},
				MagicLinkEmail: 'magic_link_template_id',
				submissionCompleteEmail: 'submission_complete_template_id',
				subscriptionCreateEmail: {
					en: 'subscription_create_template_id',
					cy: 'subscription_create_cy_template_id'
				}
			},
			havingYourSayUrl: 'somedomain.example.com/having-your-say-guide',
			magicLinkDomain: 'somedomain.example.com',
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
	});

	describe('sendMagicLinkToIP', () => {
		it('should send an email', async () => {
			const details = {
				email: 'elvin.ali@planninginspectorate.gov.uk',
				ipName: 'David White',
				projectName: 'St James Barton Giant Wind Turbine',
				repCloseDate: '2024-08-01',
				ipRef: '30000120'
			};
			await sendMagicLinkToIP(details);

			expect(notifyBuilder.reset).toHaveBeenCalled();
			expect(notifyBuilder.setTemplateId).toHaveBeenCalledWith('magic_link_template_id');
			expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith(
				'elvin.ali@planninginspectorate.gov.uk'
			);
			expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
				'email address': details.email,
				interested_party_name: details.ipName,
				ProjectName: details.projectName,
				DateOfRelevantRepresentationClose: `${details.repCloseDate} at 11:59pm GMT`,
				'magic link': `somedomain.example.com/interested-party/confirm-your-email?token=${details.token}`,
				interested_party_number: details.ipRef
			});
			expect(notifyBuilder.setReference).toHaveBeenCalledWith('30000120');
			expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
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
	});
});
