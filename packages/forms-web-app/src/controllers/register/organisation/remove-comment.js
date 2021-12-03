const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getRemoveComment = async (req, res) => {
  const index = req.query.index;
  const comment = req.session.comments[index];
  logger.info('------'+index);
  logger.info('------'+JSON.stringify(req.session.comments));
  
  logger.info('------'+comment);
  
  res.render(VIEW.REGISTER.ORGANISATION.REMOVE_COMMENT, {comment: comment, index: index});
};

exports.postRemoveComment = async (req, res) => {
  const { body } = req;
  const { errors = {}, errorSummary = [] } = body;
  if (errors['remove-comment'] || Object.keys(errors).length > 0) {
    res.render(VIEW.REGISTER.ORGANISATION.REMOVE_COMMENT, {
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
  res.redirect(`/${VIEW.REGISTER.ORGANISATION.ADD_ANOTHER_COMMENT}`);

};
