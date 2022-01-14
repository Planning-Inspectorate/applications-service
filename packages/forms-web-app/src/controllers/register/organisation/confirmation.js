const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');
const {
  postRegistrationData,
  postCommentsData,
} = require('../../../services/registration.service');

exports.getConfirmation = async (req, res) => {
  req.session.orgRegdata['case_ref'] = req.session.caseRef;
  const registrationData = JSON.stringify(req.session.orgRegdata);
  const response = await postRegistrationData(registrationData);
  const ipRefNo = response.data;
  const commentsData = JSON.stringify({ comments: req.session.comment, mode: req.session.mode });
  await postCommentsData(ipRefNo, commentsData);
  const email = req.session.orgRegdata.email;
  delete req.session.comments;
  delete req.session.orgRegdata;
  if (req.session.mode === 'draft') {
    res.render(VIEW.REGISTER.SAVE_CONFIRMATION, { ipRefNo: ipRefNo, email: email });
  } else {
    res.render(VIEW.REGISTER.ORGANISATION.CONFIRMATION, {
      ipRefNo: ipRefNo,
      email: email,
      projectName: req.session.projectName,
      caseRef: req.session.caseRef,
    });
  }
};
