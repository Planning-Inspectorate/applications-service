const { VIEW } = require('../../../lib/views');

exports.getTelephone = async (req, res) => {
  res.render(VIEW.REGISTER.AGENT.REPRESENTEE_TELEPHONE, {
    telephone: req.session.behalfRegdata.representee.telephone,
  });
};

exports.postTelephone = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors.telephone || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.AGENT.REPRESENTEE_TELEPHONE, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.behalfRegdata.representee.telephone = body.telephone;
  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.AGENT.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.AGENT.TELL_US_ABOUT_PROJECT}`);
  }
};
