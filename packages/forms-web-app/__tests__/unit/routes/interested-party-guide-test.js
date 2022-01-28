const { get } = require('./router-mock');
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
    expect(get).toHaveBeenCalledWith('/having-your-say-guide/taking-part-pre-application', getHavingYourSayPreApp);
    expect(get).toHaveBeenCalledWith('/having-your-say-guide/registering-have-your-say', getRegisteringToHaveYourSay);
    expect(get).toHaveBeenCalledWith('/having-your-say-guide/get-involved-preliminary-meetings', getInvolvedInPreliminaryMeeting);
    expect(get).toHaveBeenCalledWith('/having-your-say-guide/have-say-during-project-examination', getHavingYourSayExamination);
    expect(get).toHaveBeenCalledWith('/having-your-say-guide/after-making-the-decision', getWhatYouCanDoAfterDecision);
  });
});
