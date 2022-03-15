const { VIEW } = require('../../../lib/views');
const { nsipProjectLink } = require('../../../lib/nsip-project-link');

exports.getConfirmation = async (req, res) => {
  const { ipRefNo, email } = req.session.mySelfRegdata;
  if (req.session.mode === 'draft') {
    req.session.ipRefNo = ipRefNo;
    res.redirect(`/${VIEW.REGISTER.MYSELF.REGISTRATION_SAVED}`);
  } else {
    res.render(VIEW.REGISTER.MYSELF.REGISTRATION_COMPLETE, {
      ipRefNo,
      email,
      nsipProjectLink: nsipProjectLink(req.session.appData),
    });
  }
};
