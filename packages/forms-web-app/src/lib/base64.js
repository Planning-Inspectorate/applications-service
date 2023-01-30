module.exports = {
	toBase64(text) {
		return Buffer.from(text, 'utf-8').toString('base64');
	},
	fromBase64(base64text) {
		return Buffer.from(base64text, 'base64').toString('utf-8');
	}
};
