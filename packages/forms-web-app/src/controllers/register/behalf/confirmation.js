const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');
const { postSelfRegistrationData, postCommentsData } = require('../../../services/registration.service');

exports.getConfirmation = async (req, res) => {
  req.session.orgRegdata['case_ref'] = req.session.caseRef;
  const registrationData = JSON.stringify(req.session.orgRegdata);
  const response = await postSelfRegistrationData(registrationData);
  const ipRefNo = response.data;
  const commentsData = JSON.stringify({comments: req.session.comments});
  await postCommentsData(ipRefNo, commentsData);
  const email = req.session.orgRegdata.email;
  delete req.session.comments;
  delete req.session.orgRegdata;
  res.render(VIEW.REGISTER.BEHALF.CONFIRMATION, {ipRefNo: ipRefNo, email: email, projectName: req.session.projectName, caseRef: req.session.caseRef});
};
