const { updateLangQuery } = require('./update-lang-query');

describe('updateLangQuery', () => {
	it('adds lang param if no query string exists', () => {
		expect(updateLangQuery('http://localhost:9004/register-of-advice', 'cy')).toBe(
			'http://localhost:9004/register-of-advice?lang=cy'
		);
	});

	it('updates lang param if it exists', () => {
		expect(
			updateLangQuery('http://localhost:9004/register-of-advice?search=abc&lang=en', 'cy')
		).toBe('http://localhost:9004/register-of-advice?search=abc&lang=cy');
	});

	it('adds lang param if other params exist', () => {
		expect(updateLangQuery('http://localhost:9004/register-of-advice?search=abc', 'cy')).toBe(
			'http://localhost:9004/register-of-advice?search=abc&lang=cy'
		);
	});

	it('returns undefined if urlString is undefined', () => {
		expect(updateLangQuery(undefined, 'cy')).toBeUndefined();
	});
});
