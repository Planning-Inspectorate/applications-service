const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getAddress = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_ADDRESS, {address: req.session.behalfRegdata['address']});
};

exports.postAddress = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.REPRESENTEE_ADDRESS, {
      errors,
      errorSummary,
      address: body
    });
    return;
  }

  req.session.behalfRegdata.address['line1'] = body['line1'];
  req.session.behalfRegdata.address['line2'] = body['line2'];
  req.session.behalfRegdata.address['line3'] = body['line3'];
  req.session.behalfRegdata.address['postcode'] = body['postcode'];
  req.session.behalfRegdata.address['country'] = body['country'];
  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTEE_EMAIL}`);
  }
};
