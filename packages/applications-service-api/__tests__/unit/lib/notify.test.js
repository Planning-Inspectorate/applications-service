const { notifyBuilder } = require('@planning-inspectorate/pins-notify');
const { sendIPRegistrationConfirmationEmailToIP } = require('../../../src/lib/notify');

const config = require('.../../../src/lib/config');

jest.mock('@planning-inspectorate/pins-notify', () => ({
  createNotifyClient: {
    createNotifyClient: jest.fn().mockReturnThis(),
  },
  notifyBuilder: {
    reset: jest.fn().mockReturnThis(),
    setNotifyClient: jest.fn().mockReturnThis(),
    setTemplateId: jest.fn().mockReturnThis(),
    setDestinationEmailAddress: jest.fn().mockReturnThis(),
    setTemplateVariablesFromObject: jest.fn().mockReturnThis(),
    setReference: jest.fn().mockReturnThis(),
    sendEmail: jest.fn(),
  },
}));

describe('sendIPRegistrationConfirmationEmailToIP', () => {
  it('should send an email', async () => {
    const details = {
      email: 'elvin.ali@planninginspectorate.gov.uk',
      projectName: 'St James Barton Giant Wind Turbine',
      ipName: 'David White',
      ipRef: '30000120',
    };
    await sendIPRegistrationConfirmationEmailToIP(details);

    expect(notifyBuilder.reset).toHaveBeenCalled();
    expect(notifyBuilder.setTemplateId).toHaveBeenCalledWith(
      config.services.notify.templates.IPRegistrationConfirmationEmailToIP
    );
    expect(notifyBuilder.setDestinationEmailAddress).toHaveBeenCalledWith(
      'elvin.ali@planninginspectorate.gov.uk'
    );
    expect(notifyBuilder.setTemplateVariablesFromObject).toHaveBeenCalledWith({
      'email address': details.email,
      project_name: details.projectName,
      interested_party_name: details.ipName,
      interested_party_ref: details.ipRef,
      preliminary_meeting_url: 'https://applications-service-web-app.azurewebsites.net/',
      having_your_say_url: 'https://applications-service-web-app.azurewebsites.net/',
    });
    expect(notifyBuilder.setReference).toHaveBeenCalledWith('30000120');
    expect(notifyBuilder.sendEmail).toHaveBeenCalledTimes(1);
  });
});
