const { VIEW } = require('../../../lib/views');

exports.getEmail = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.EMAIL, { email: req.session.behalfRegdata.representor.email });
};

exports.postEmail = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors.email || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.EMAIL, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.behalfRegdata.representor.email = body.email;

  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.BEHALF.TELEPHONE}`);
  }
};
