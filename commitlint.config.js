module.exports = {
	extends: ['@commitlint/config-conventional'],
	// ignore commits from dependabot
	ignores: [(commit) => commit.includes('dependabot')]
};
