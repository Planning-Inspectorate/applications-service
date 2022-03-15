const { VIEW } = require('../../../lib/views');
const { nsipProjectLink } = require('../../../lib/nsip-project-link');

exports.getConfirmation = async (req, res) => {
  const { ipRefNo, email } = req.session.behalfRegdata;
  if (req.session.mode === 'draft') {
    req.session.ipRefNo = ipRefNo;
    res.redirect(`/${VIEW.REGISTER.AGENT.REGISTRATION_SAVED}`);
  } else {
    res.render(VIEW.REGISTER.AGENT.REGISTRATION_COMPLETE, {
      ipRefNo,
      email,
      nsipProjectLink: nsipProjectLink(req.session.appData),
    });
  }
};
