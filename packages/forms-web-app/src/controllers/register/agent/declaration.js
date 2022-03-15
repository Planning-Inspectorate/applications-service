const { VIEW } = require('../../../lib/views');
const {
  postRegistrationData,
  postCommentsData,
} = require('../../../services/registration.service');

exports.getDeclaration = async (req, res) => {
  res.render(VIEW.REGISTER.AGENT.DECLARATION);
};

exports.postDeclaration = async (req, res) => {
  let { ipRefNo } = req.session.behalfRegdata;

  if (!ipRefNo) {
    req.session.behalfRegdata.case_ref = req.session.caseRef;
    req.session.behalfRegdata.mode = req.session.mode;
    const registrationData = JSON.stringify(req.session.behalfRegdata);
    const response = await postRegistrationData(registrationData);
    ipRefNo = response.data;
    req.session.behalfRegdata.ipRefNo = ipRefNo;
  }

  const commentsData = JSON.stringify({ comments: req.session.comment, mode: req.session.mode });
  if (commentsData && Object.keys(JSON.parse(commentsData)).length) {
    await postCommentsData(ipRefNo, commentsData);
  }
  res.redirect(`/${VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE}`);
};
