const { VIEW } = require('../../../lib/views');

exports.getFullName = async (req, res) => {
  res.render(VIEW.REGISTER.MYSELF.FULL_NAME, { fullName: req.session.mySelfRegdata['full-name'] });
};

exports.postFullName = async (req, res) => {
  const { body } = req;

  const { errors = {}, errorSummary = [] } = body;
  if (errors['full-name'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.MYSELF.FULL_NAME, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.mySelfRegdata['full-name'] = body['full-name'];
  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.MYSELF.OVER_18}`);
  }
};
