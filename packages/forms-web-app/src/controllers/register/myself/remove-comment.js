const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getRemoveComment = async (req, res) => {
  const index = req.query.index;
  const comment = req.session.comments[index];
  res.render(VIEW.REGISTER.MYSELF.REMOVE_COMMENT, {comment: comment, index: index});
};

exports.postRemoveComment = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['remove-comment'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.MYSELF.REMOVE_COMMENT, {
      errors,
      errorSummary,
    });
    return;
  }
  const removeComment = body['remove-comment'];
  if (removeComment === 'yes'){
    const index = body['index'];
    req.session.comments.splice(index, 1);
  }
  if (req.query.src === 'add'){
    res.redirect(`/${VIEW.REGISTER.MYSELF.ADD_ANOTHER_COMMENT}`);
  } else {
    res.redirect(`/${VIEW.REGISTER.MYSELF.CHECK_YOUR_ANSWERS}`);
  }
};
