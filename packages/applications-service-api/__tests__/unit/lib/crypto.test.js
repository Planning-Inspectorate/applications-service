const { encrypt, decrypt } = require('../../../src/lib/crypto');

describe('encrypt', () => {
	it('should encrypt a value', async () => {
		const encrypted = encrypt('30000120');
		expect(encrypted).toHaveLength(48);
	});
});

describe('decrypt', () => {
	it('should decrypt a value', async () => {
		const decrypted = decrypt('3e2895fd6c43c5b24626168d6366c07da167af7dd0b337a3');
		expect(decrypted).toEqual('30000120');
	});
});
