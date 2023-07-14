const crypto = require('crypto');
const config = require('./config');

const { algorithm, secretKey } = config.services.encryption;

const IV_LENGTH = 16;

const encrypt = (value) => {
	const iv = crypto.randomBytes(IV_LENGTH);
	const cipher = crypto.createCipheriv(algorithm, secretKey, iv);
	const encrypted = Buffer.concat([cipher.update(value), cipher.final()]);

	return `${iv.toString('hex')}${encrypted.toString('hex')}`;
};

const decrypt = (value) => {
	const ivLength = crypto.randomBytes(IV_LENGTH).toString('hex').length;
	const iv = value.substring(0, ivLength);
	const encrypted = value.substring(ivLength, value.length);
	const decipher = crypto.createDecipheriv(algorithm, secretKey, Buffer.from(iv, 'hex'));

	const decrypted = Buffer.concat([
		decipher.update(Buffer.from(encrypted, 'hex')),
		decipher.final()
	]);

	return decrypted.toString();
};

module.exports = {
	encrypt,
	decrypt
};
