const { VIEW } = require('../../../lib/views');
const {
  postRegistrationData,
  postCommentsData,
} = require('../../../services/registration.service');

exports.getConfirmation = async (req, res) => {
  req.session.behalfRegdata.case_ref = req.session.caseRef;
  const registrationData = JSON.stringify(req.session.behalfRegdata);
  const response = await postRegistrationData(registrationData);
  const ipRefNo = response.data;
  const commentsData = JSON.stringify({ comments: req.session.comment, mode: req.session.mode });
  await postCommentsData(ipRefNo, commentsData);
  const { email } = req.session.behalfRegdata.representor;
  delete req.session.comment;
  delete req.session.behalfRegdata;
  delete req.session.typeOfParty;
  if (req.session.mode === 'draft') {
    res.render(VIEW.REGISTER.SAVE_CONFIRMATION, { ipRefNo, email });
  } else {
    res.render(VIEW.REGISTER.BEHALF.CONFIRMATION, {
      ipRefNo,
      email,
      projectName: req.session.projectName,
      caseRef: req.session.caseRef,
    });
  }
};
