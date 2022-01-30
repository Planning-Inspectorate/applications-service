const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getEmail = async (req, res) => {
  res.render(VIEW.REGISTER.MYSELF.EMAIL_ADDRESS, { email: req.session.mySelfRegdata['email'] });
};

exports.postEmail = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['email'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.MYSELF.EMAIL_ADDRESS, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.mySelfRegdata['email'] = body['email'];

  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.MYSELF.ADDRESS}`);
  }
};
