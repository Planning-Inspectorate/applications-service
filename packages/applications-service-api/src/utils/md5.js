const crypto = require('crypto');

const md5 = (buffer) => crypto.createHash('md5').update(buffer).digest('hex');

module.exports = {
	md5
};
