const interestedPartyGuideController = require('../../../src/controllers/having-your-say-guide');
const { mockReq, mockRes } = require('../mocks');
const { VIEW } = require('../../../src/lib/views');

describe('controllers/having-your-say-guide', () => {
  let req;
  let res;

  beforeEach(() => {
    req = {
      ...mockReq(),
      session: {
        caseRef: 'EN010009',
        projectName: 'St James Barton Giant Wind Turbine',
      },
    };
    res = mockRes();
    jest.resetAllMocks();
  });

  describe('getHavingYourSayAboutProject', () => {
    it('should call the correct template', async () => {
      await interestedPartyGuideController.getHavingYourSayAboutProject(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.INTERESTED_PARTY_GUIDE.INTERESTED_PARTY);
    });
  });

  describe('getHavingYourSayPreApp', () => {
    it('should call the correct template', async () => {
      await interestedPartyGuideController.getHavingYourSayPreApp(req, res);
      expect(res.render).toHaveBeenCalledWith(VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_PRE_APPLICATION);
    });
  });

  describe('getRegisteringToHaveYourSay', () => {
    it('should call the correct template', async () => {
      await interestedPartyGuideController.getRegisteringToHaveYourSay(req, res);
      expect(res.render).toHaveBeenCalledWith(
        VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY,
        { caseRef: 'EN010009', projectName: 'St James Barton Giant Wind Turbine' }
      );
    });
  });

  describe('getInvolvedInPreliminaryMeeting', () => {
    it('should call the correct template', async () => {
      await interestedPartyGuideController.getInvolvedInPreliminaryMeeting(req, res);
      expect(res.render).toHaveBeenCalledWith(
        VIEW.INTERESTED_PARTY_GUIDE.GET_INVOLVED_PRELIMINARY_MEETINGS
      );
    });
  });

  describe('getHavingYourSayExamination', () => {
    it('should call the correct template', async () => {
      await interestedPartyGuideController.getHavingYourSayExamination(req, res);
      expect(res.render).toHaveBeenCalledWith(
        VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION
      );
    });
  });

  describe('getWhatYouCanDoAfterDecision', () => {
    it('should call the correct template', async () => {
      await interestedPartyGuideController.getWhatYouCanDoAfterDecision(req, res);
      expect(res.render).toHaveBeenCalledWith(
        VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION
      );
    });
  });
});
