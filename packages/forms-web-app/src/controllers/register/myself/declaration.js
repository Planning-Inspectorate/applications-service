const logger = require('../../../lib/logger');
const { VIEW } = require('../../../lib/views');

exports.getDeclaration = async (req, res) => {
  res.render(VIEW.REGISTER.MYSELF.DECLARATION);
};

exports.postDeclaration = async (req, res) => {
  res.redirect(`/${VIEW.REGISTER.MYSELF.CONFIRMATION}`);
};
