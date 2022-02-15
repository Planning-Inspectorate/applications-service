/* eslint-disable no-undef */
const { get } = require('./router-mock');
// eslint-disable-next-line no-unused-vars
const interestedPartyGuideController = require('../../../src/controllers/having-your-say-guide');

describe('routes/having-your-say-guide', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../src/routes/having-your-say-guide');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith('/having-your-say-guide', getHavingYourSayAboutProject);
    expect(get).toHaveBeenCalledWith('/having-your-say-guide/index', getHavingYourSayAboutProject);
    expect(get).toHaveBeenCalledWith(
      '/having-your-say-guide/taking-part-pre-application',
      getHavingYourSayPreApp
    );
    expect(get).toHaveBeenCalledWith(
      '/having-your-say-guide/registering-have-your-say',
      getRegisteringToHaveYourSay
    );
    expect(get).toHaveBeenCalledWith(
      '/having-your-say-guide/get-involved-preliminary-meeting',
      getInvolvedInPreliminaryMeeting
    );
    expect(get).toHaveBeenCalledWith(
      '/having-your-say-guide/have-your-say-examination',
      getHavingYourSayExamination
    );
    expect(get).toHaveBeenCalledWith(
      '/having-your-say-guide/what-happens-after-decision',
      getWhatYouCanDoAfterDecision
    );
  });
});
