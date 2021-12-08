const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getRepresentingFor = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.REPRESENTING_FOR, {representing: req.session.behalfRegdata['representing']});
};

exports.postRepresentingFor = async (req, res) => {
  const { body } = req;
  const representing = body['representing'];
  const { errors = {}, errorSummary = [] } = body;
  if (errors['representing'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_OVER_18, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.behalfRegdata['representing'] = representing;

  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_ADDRESS}`);
  }
};
