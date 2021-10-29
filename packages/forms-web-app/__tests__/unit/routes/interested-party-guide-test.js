const { get } = require('./router-mock');
const interestedPartyGuideController = require('../../../src/controllers/interested-party-guide');

describe('routes/interested-party-guide', () => {
  beforeEach(() => {
    // eslint-disable-next-line global-require
    require('../../../src/routes/interested-party-guide');
  });

  afterEach(() => {
    jest.resetAllMocks();
  });

  it('should define the expected routes', () => {
    expect(get).toHaveBeenCalledWith('/interested-party-guide', getHavingYourSayAboutProject);
    expect(get).toHaveBeenCalledWith('/interested-party-guide/index', getHavingYourSayAboutProject);
    expect(get).toHaveBeenCalledWith('/interested-party-guide/have-say-pre-application', getHavingYourSayPreApp);
    expect(get).toHaveBeenCalledWith('/interested-party-guide/register-to-have-your-say', getRegisteringToHaveYourSay);
    expect(get).toHaveBeenCalledWith('/interested-party-guide/get-involved-preliminary-meetings', getInvolvedInPreliminaryMeeting);
    expect(get).toHaveBeenCalledWith('/interested-party-guide/have-say-during-project-examination', getHavingYourSayExamination);
    expect(get).toHaveBeenCalledWith('/interested-party-guide/after-making-the-decision', getWhatYouCanDoAfterDecision);
  });
});
