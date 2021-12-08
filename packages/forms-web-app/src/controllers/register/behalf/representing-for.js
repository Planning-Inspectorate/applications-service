const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getRepresentingFor = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.REPRESENTING_FOR, {representingFor: req.session.behalfRegdata['representing-for']});
};

exports.postRepresentingFor = async (req, res) => {
  const { body } = req;
  const representingFor = body['representing-for'];
  const { errors = {}, errorSummary = [] } = body;
  if (errors['representing-for'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_OVER_18, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.behalfRegdata['representing-for'] = representingFor;

  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_ADDRESS}`);
  }
};
