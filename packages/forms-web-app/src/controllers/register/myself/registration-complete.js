const { VIEW } = require('../../../lib/views');

exports.getConfirmation = async (req, res) => {
  const { ipRefNo, email } = req.session.mySelfRegdata;
  if (req.session.mode === 'draft') {
    req.session.ipRefNo = ipRefNo;
    res.redirect(`/${VIEW.REGISTER.MYSELF.REGISTRATION_SAVED}`);
  } else {
    res.render(VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE, {
      ipRefNo,
      email,
      projectName: req.session.projectName,
      caseRef: req.session.caseRef,
    });
  }
};
