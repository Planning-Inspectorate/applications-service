const { VIEW } = require('../lib/views');

exports.getHavingYourSayAboutProject = (_, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.INTERESTED_PARTY);
};

exports.getHavingYourSayPreApp = (_, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_PRE_APPLICATION);
};

exports.getRegisteringToHaveYourSay = (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY, {
    projectName: req.session.projectName,
    caseRef: req.session.caseRef,
  });
};

exports.getInvolvedInPreliminaryMeeting = (_, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.GET_INVOLVED_PRELIMINARY_MEETINGS);
};

exports.getHavingYourSayExamination = (_, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION);
};

exports.getWhatYouCanDoAfterDecision = (_, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION);
};
