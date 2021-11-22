const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getAddress = async (req, res) => {
  res.render(VIEW.REGISTER.MYSELF.ADDRESS, {address: req.session.mySelfRegdata['address']});
};

exports.postAddress = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.MYSELF.ADDRESS, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.mySelfRegdata.address['line1'] = body['address-line-1'];
  req.session.mySelfRegdata.address['line2'] = body['address-line-2'];
  req.session.mySelfRegdata.address['line3'] = body['address-line-3'];
  req.session.mySelfRegdata.address['postcode'] = body['address-postcode'];
  req.session.mySelfRegdata.address['country'] = body['address-country'];
  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.MYSELF.EMAIL}`);
  }
};
