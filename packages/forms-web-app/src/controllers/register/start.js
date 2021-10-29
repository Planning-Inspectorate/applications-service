const { VIEW } = require('../../lib/views');

exports.getStart = async (req, res) => {
  res.render(VIEW.REGISTER.START);
};
