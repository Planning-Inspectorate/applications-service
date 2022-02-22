const { VIEW } = require('../../../lib/views');
const {
  postRegistrationData,
  postCommentsData,
} = require('../../../services/registration.service');

exports.getConfirmation = async (req, res) => {
  req.session.mySelfRegdata.case_ref = req.session.caseRef;
  const registrationData = JSON.stringify(req.session.mySelfRegdata);

  let { ipRefNo } = req.session.mySelfRegdata;

  if (!ipRefNo) {
    const response = await postRegistrationData(registrationData);
    ipRefNo = response.data;
  }
  const commentsData = JSON.stringify({ comments: req.session.comment, mode: req.session.mode });
  if (commentsData) await postCommentsData(ipRefNo, commentsData);
  const { email } = req.session.mySelfRegdata;
  delete req.session.comment;
  delete req.session.typeOfParty;
  delete req.session.mySelfRegdata;
  if (req.session.mode === 'draft') {
    res.render(VIEW.REGISTER.SAVE_CONFIRMATION, { ipRefNo, email });
  } else {
    res.render(VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE, {
      ipRefNo,
      email,
      projectName: req.session.projectName,
      caseRef: req.session.caseRef,
    });
  }
};
