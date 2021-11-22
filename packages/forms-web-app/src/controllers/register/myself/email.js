const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getEmail = async (req, res) => {
  res.render(VIEW.REGISTER.MYSELF.EMAIL, {email: req.session.registrationData['email']});
};

exports.postEmail = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['email'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.MYSELF.EMAIL, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.registrationData['email'] = body['email'];
  res.redirect(`/${VIEW.REGISTER.MYSELF.TELEPHONE}`);
};
