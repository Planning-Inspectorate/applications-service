const logger = require('./logger');
const NotifyBuilder = require('./notify-builder');
const { createNotifyClient } = require('./notify-factory');

jest.mock('./logger', () => ({
	debug: jest.fn(),
	info: jest.fn(),
	error: jest.fn()
}));

const mockCreateNotifyClient = {
	prepareUpload: jest.fn(),
	sendEmail: jest.fn()
};

jest.mock('./notify-factory', () => ({
	createNotifyClient: () => mockCreateNotifyClient
}));

describe('lib/notify/notify-builder', () => {
	afterEach(() => {
		jest.clearAllMocks();
	});

	describe('NotifyBuilder', () => {
		let templateId;
		let destinationEmail;
		let reference;
		let templatePersonalisation;
		let emailReplyToId;

		beforeEach(() => {
			templateId = '123-abc';
			destinationEmail = 'a@b.com';
			reference = 'xyz/123/abc';
			templatePersonalisation = { x: 'y', a: 'b' };
			emailReplyToId = '000';

			NotifyBuilder.reset();
		});

		describe('getNotifyClient', () => {
			test('sets the client implicitly if not explicitly provided', async () => {
				await NotifyBuilder.setTemplateId(templateId)
					.setReference('abc/123')
					.setDestinationEmailAddress(destinationEmail)
					.sendEmail();

				expect(logger.info.mock.calls).toEqual([
					['Resetting the notify client'],
					[`Sending email via Notify`],
					['Notify client was not set. Creating...']
				]);

				expect(logger.debug.mock.calls).toEqual([
					[{ templateId: '123-abc' }, 'Setting template ID'],
					[{ reference: 'abc/123' }, 'Setting reference'],
					[{ destinationEmail: 'a@b.com' }, 'Setting destination email address'],
					[{ notifyClient: mockCreateNotifyClient }, 'Setting notify client'],
					[
						{
							notifyClient: mockCreateNotifyClient,
							templateId: '123-abc',
							destinationEmail: 'a@b.com',
							templatePersonalisation: 'Has 0 value(s) set.',
							emailReplyToId: ''
						}
					]
				]);
			});

			test('can build and send an email', async () => {
				const client = createNotifyClient();

				await NotifyBuilder.setNotifyClient(client)
					.setTemplateId(templateId)
					.setReference('abc/123')
					.setDestinationEmailAddress(destinationEmail)
					.setTemplateVariablesFromObject(templatePersonalisation)
					.sendEmail();

				expect(logger.info.mock.calls).toEqual([
					['Resetting the notify client'],
					[`Sending email via Notify`]
				]);

				expect(logger.debug.mock.calls).toEqual([
					[{ notifyClient: client }, 'Setting notify client'],
					[{ templateId: '123-abc' }, 'Setting template ID'],
					[{ reference: 'abc/123' }, 'Setting reference'],
					[{ destinationEmail: 'a@b.com' }, 'Setting destination email address'],
					['Setting template variables from object.'],
					[{ key: 'x', value: 'redacted' }, 'Setting template personalisation variable.'],
					[{ key: 'a', value: 'redacted' }, 'Setting template personalisation variable.'],
					[
						{
							notifyClient: client,
							templateId: '123-abc',
							destinationEmail: 'a@b.com',
							templatePersonalisation: 'Has 2 value(s) set.',
							emailReplyToId: ''
						}
					]
				]);

				expect(client.sendEmail).toHaveBeenCalledWith(templateId, destinationEmail, {
					personalisation: templatePersonalisation,
					reference: 'abc/123'
				});
			});
		});

		describe('sendEmail', () => {
			describe('guards', () => {
				test('logs and throws if template id is not set', async () => {
					const error = new Error('Notify: Template ID must be set before an email can be sent.');
					try {
						await NotifyBuilder.sendEmail();
					} catch (e) {
						expect(logger.error).toHaveBeenCalledWith({ err: e }, 'Notify: error sending email');
						expect(e).toEqual(error);
					}
				});

				test('logs and throws if destination email address is not set', async () => {
					const error = new Error(
						'Notify: A destination email address must be set before an email can be sent.'
					);
					try {
						await NotifyBuilder.setTemplateId('123').sendEmail();
					} catch (e) {
						expect(logger.error).toHaveBeenCalledWith(
							{ err: error },
							'Notify: error sending email'
						);
						expect(e).toEqual(error);
					}
				});

				test('logs and throws if reference is not set', async () => {
					const error = new Error('Notify: A reference must be set before an email can be sent.');
					try {
						await NotifyBuilder.setTemplateId('123')
							.setDestinationEmailAddress('abc@example.com')
							.sendEmail();
					} catch (e) {
						expect(logger.error).toHaveBeenCalledWith(
							{ err: error },
							'Notify: error sending email'
						);
						expect(e).toEqual(error);
					}
				});
			});
		});

		describe('addFileToTemplateVariables', () => {
			test('prepares the upload', () => {
				const fileValue = 'File object, or Buffer value goes here.';
				NotifyBuilder.setNotifyClient(mockCreateNotifyClient).addFileToTemplateVariables(
					'file key',
					fileValue
				);
				expect(mockCreateNotifyClient.prepareUpload).toHaveBeenCalledWith(fileValue);
			});
		});

		describe('setTemplateVariable', () => {
			test('with redact', () => {
				NotifyBuilder.setTemplateVariable('a key', 'a value');

				expect(logger.debug.mock.calls).toEqual([
					[
						{
							key: 'a key',
							value: 'redacted'
						},
						'Setting template personalisation variable.'
					]
				]);
			});

			test('without redact', () => {
				NotifyBuilder.setTemplateVariable('a key', 'a value', false);

				expect(logger.debug.mock.calls).toEqual([
					[
						{
							key: 'a key',
							value: 'a value'
						},
						'Setting template personalisation variable.'
					]
				]);
			});
		});

		describe('err - logs and throws', () => {
			[
				{
					description: 'err.response',
					setUp: () => {
						mockCreateNotifyClient.sendEmail.mockRejectedValue({
							response: {
								data: 'some bad response',
								status: 500,
								headers: {
									a: 'b'
								}
							},
							message: 'everything went badly'
						});
					},
					expectation: () => {
						expect(logger.error).toHaveBeenCalledWith(
							{
								message: 'everything went badly',
								data: 'some bad response',
								status: 500,
								headers: {
									a: 'b'
								}
							},
							`Notify: error sending email - response`
						);
					},
					error: {
						response: {
							data: 'some bad response',
							status: 500,
							headers: {
								a: 'b'
							}
						},
						message: 'everything went badly'
					}
				},
				{
					description: 'err.request',
					setUp: () => {
						mockCreateNotifyClient.sendEmail.mockRejectedValue({
							request: {
								a: 'b'
							},
							message: 'something bad in request'
						});
					},
					expectation: () => {
						expect(logger.error).toHaveBeenCalledWith(
							{
								message: 'something bad in request',
								request: {
									a: 'b'
								}
							},
							`Notify: error sending email - request`
						);
					},
					error: {
						request: {
							a: 'b'
						},
						message: 'something bad in request'
					}
				},
				{
					description: 'else',
					setUp: () => {
						mockCreateNotifyClient.sendEmail.mockRejectedValue({
							message: 'something else'
						});
					},
					expectation: () => {
						expect(logger.error).toHaveBeenCalledWith(
							{
								err: {
									message: 'something else'
								}
							},
							`Notify: error sending email`
						);
					},
					error: { message: 'something else' }
				}
			].forEach(({ description, setUp, expectation, error }) => {
				test(description, async () => {
					setUp();

					try {
						await NotifyBuilder.setNotifyClient(mockCreateNotifyClient)
							.setTemplateId(templateId)
							.setReference(reference)
							.setDestinationEmailAddress(destinationEmail)
							.setTemplateVariablesFromObject(templatePersonalisation)
							.setEmailReplyToId(emailReplyToId)
							.sendEmail();
					} catch (err) {
						expect(mockCreateNotifyClient.sendEmail).toHaveBeenCalledWith(
							templateId,
							destinationEmail,
							{
								personalisation: templatePersonalisation,
								reference,
								emailReplyToId
							}
						);

						expectation();

						expect(err).toEqual(error);
					}
				});
			});
		});
	});
});
