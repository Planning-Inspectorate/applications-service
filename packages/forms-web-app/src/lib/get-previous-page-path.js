const config = require('../config');

module.exports = (req) => {
  const referer = req.get('Referer');

  if (!referer || !referer.startsWith(config.server.host)) {
    return '/';
  }

  return referer.replace(config.server.host, '');
};
