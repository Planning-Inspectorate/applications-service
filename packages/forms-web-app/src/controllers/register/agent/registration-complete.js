const { VIEW } = require('../../../lib/views');

exports.getConfirmation = async (req, res) => {
  const { ipRefNo, representor } = req.session.behalfRegdata;
  const { email } = representor;
  if (req.session.mode === 'draft') {
    req.session.ipRefNo = ipRefNo;
    res.redirect(`/${VIEW.REGISTER.AGENT.REGISTRATION_SAVED}`);
  } else {
    res.render(VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE, {
      ipRefNo,
      email,
      projectName: req.session.projectName,
      caseRef: req.session.caseRef,
    });
  }
};
