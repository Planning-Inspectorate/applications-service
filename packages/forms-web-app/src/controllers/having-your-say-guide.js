const { VIEW } = require('../lib/views');
const { nsipProjectLink } = require('../lib/nsip-project-link');

exports.getHavingYourSayAboutProject = (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.INTERESTED_PARTY);
};

exports.getHavingYourSayPreApp = (_, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_PRE_APPLICATION);
};

exports.getRegisteringToHaveYourSay = (req, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.REGISTER_TO_HAVE_YOUR_SAY, {
    projectName: req.session.projectName,
    nsipProjectLink: req.session.appData ? nsipProjectLink(req.session.appData) : '',
  });
};

exports.getInvolvedInPreliminaryMeeting = (_, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.GET_INVOLVED_PRELIMINARY_MEETING);
};

exports.getHavingYourSayExamination = (_, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.HAVE_SAY_DURING_PROJECT_EXAMINATION);
};

exports.getWhatYouCanDoAfterDecision = (_, res) => {
  res.render(VIEW.INTERESTED_PARTY_GUIDE.AFTER_MAKING_THE_DECISION);
};
