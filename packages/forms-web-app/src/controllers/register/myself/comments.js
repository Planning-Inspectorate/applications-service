const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getComments = async (req, res) => {
  res.render(VIEW.REGISTER.MYSELF.COMMENTS, {comments: req.session.registrationData['comments']});
};

exports.postComments = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['comments'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.MYSELF.COMMENTS, {
      errors,
      errorSummary,
    });
    return;
  }

  req.session.registrationData['comments'] = body['comments'];

  if (req.query.mode === 'edit') {
    res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`); //TODO change
  }
  
};
