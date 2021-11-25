const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');
const { postSelfRegistrationData, postCommentsData } = require('../../../services/registration.service');

exports.getConfirmation = async (req, res) => {
  req.session.mySelfRegdata['case_ref'] = req.session.caseRef;
  const registrationData = JSON.stringify(req.session.mySelfRegdata);
  const ipRefNo = await postSelfRegistrationData(registrationData);
  const commentsData = JSON.stringify({comments: req.session.comments});
  await postCommentsData(ipRefNo, commentsData);
  res.render(VIEW.REGISTER.MYSELF.CONFIRMATION, {ipRefNo: ipRefNo, email: req.session.mySelfRegdata.email, projectName: req.session.projectName, claimRef: req.session.claimRef});
};
