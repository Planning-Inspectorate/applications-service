const { keys } = require('../keys');
const { pageTitle } = require('../common-veiw-model');

const pageTitlePrefix = 'What is your address?';
const viewModel = {
	[keys.myself]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.myself],
		title: 'What is your address?'
	},
	[keys.organisation]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.organisation],
		title: 'What is your address?'
	},
	[keys.agent]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.agent],
		title: 'UK address details'
	}
};

module.exports = {
	viewModel
};
