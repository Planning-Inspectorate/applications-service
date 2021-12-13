const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');
const { postRegistrationData, postCommentsData } = require('../../../services/registration.service');

exports.getConfirmation = async (req, res) => {
  req.session.behalfRegdata['case_ref'] = req.session.caseRef;
  const registrationData = JSON.stringify(req.session.behalfRegdata);
  const response = await postRegistrationData(registrationData);
  const ipRefNo = response.data;
  const commentsData = JSON.stringify({comments: req.session.comments});
  await postCommentsData(ipRefNo, commentsData);
  const email = req.session.behalfRegdata.representor.email;
  delete req.session.comments;
  delete req.session.behalfRegdata;
  res.render(VIEW.REGISTER.BEHALF.CONFIRMATION, {ipRefNo: ipRefNo, email: email, projectName: req.session.projectName, caseRef: req.session.caseRef});
};
