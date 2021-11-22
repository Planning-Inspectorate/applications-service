const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getOver18 = async (req, res) => {
  res.render(VIEW.REGISTER.MYSELF.OVER_18, {over18: req.session.registrationData['over-18']});
};

exports.postOver18 = async (req, res) => {
  const { body } = req;
  const over18 = body['over-18'];
  const { errors = {}, errorSummary = [] } = body;
  if (errors['full-name'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.MYSELF.OVER_18, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.registrationData['over-18'] = over18;
  
  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.MYSELF.ADDRESS}`);
  }
};
