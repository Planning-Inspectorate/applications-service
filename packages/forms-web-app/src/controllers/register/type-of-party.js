const logger = require('../../lib/logger');
const { VIEW } = require('../../lib/views');

exports.getTypeOfParty = async (req, res) => {
  res.render(VIEW.REGISTER.TYPE_OF_PARTY);
};