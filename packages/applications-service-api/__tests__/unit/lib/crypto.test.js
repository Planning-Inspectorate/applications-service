process.env.ENCRYPTION_SECRET_KEY = 'dummy-key-set-before-the-testrun';

const { encrypt, decrypt } = require('../../../src/lib/crypto');

describe('encrypt', () => {
	it('should encrypt a value', async () => {
		const encrypted = encrypt('30000120');
		expect(encrypted).toHaveLength(48);
	});
});

describe('decrypt', () => {
	it('should decrypt a value', async () => {
		const decrypted = decrypt('7470437bb930c59a3e753e48f9067e825542a622c2e3405d');
		expect(decrypted).toEqual('30000120');
	});
});
