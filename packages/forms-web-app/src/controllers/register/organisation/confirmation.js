const { VIEW } = require('../../../lib/views');

exports.getConfirmation = async (req, res) => {
  const { ipRefNo, email } = req.session.orgRegdata;
  if (req.session.mode === 'draft') {
    req.session.ipRefNo = ipRefNo;
    res.redirect(`/${VIEW.REGISTER.ORGANISATION.REGISTRATION_SAVED}`);
  } else {
    res.render(VIEW.REGISTER.ORGANISATION.CONFIRMATION, {
      ipRefNo,
      email,
      projectName: req.session.projectName,
      caseRef: req.session.caseRef,
    });
  }
};
