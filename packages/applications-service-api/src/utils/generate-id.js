const uuid = require('uuid');
const generateId = (prefixLetter) => {
	const uniqueId = uuid.v4().replace(/-/g, '').substring(0, 8).toUpperCase();
	return `${prefixLetter}${uniqueId}`;
};

module.exports = { generateId };
