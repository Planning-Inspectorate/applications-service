const { VIEW } = require('../../../lib/views');

exports.getAddress = async (req, res) => {
  res.render(VIEW.REGISTER.BEHALF.ADDRESS, {
    address: req.session.behalfRegdata.representor.address,
  });
};

exports.postAddress = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.BEHALF.ADDRESS, {
      errors,
      errorSummary,
      address: body,
    });
    return;
  }

  req.session.behalfRegdata.representor.address.line1 = body.line1;
  req.session.behalfRegdata.representor.address.line2 = body.line2;
  req.session.behalfRegdata.representor.address.line3 = body.line3;
  req.session.behalfRegdata.representor.address.postcode = body.postcode;
  req.session.behalfRegdata.representor.address.country = body.country;
  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.BEHALF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.BEHALF.REPRESENTING_FOR}`);
  }
};
