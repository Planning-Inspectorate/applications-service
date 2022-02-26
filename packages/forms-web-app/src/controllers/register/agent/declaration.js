const { VIEW } = require('../../../lib/views');

exports.getDeclaration = async (req, res) => {
  res.render(VIEW.REGISTER.AGENT.DECLARATION);
};

exports.postDeclaration = async (req, res) => {
  res.redirect(`/${VIEW.REGISTER.AGENT.CONFIRMATION}`);
};
