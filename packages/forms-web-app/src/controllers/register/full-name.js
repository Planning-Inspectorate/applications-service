const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

exports.getFullName = async (req, res) => {
  res.render(VIEW.REGISTER.FULL_NAME);
};

exports.postFullName = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['full-name'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.FULL_NAME, {
      errors,
      errorSummary,
    });
    return;
  }
  res.redirect(`/${VIEW.REGISTER.TEST2}`);
};
