const { keys } = require('../keys');
const { pageTitle } = require('../common-veiw-model');

const pageTitlePrefix = 'What is your address?';
const viewModel = {
	[keys.myself]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.myself]
	},
	[keys.organisation]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.organisation]
	},
	[keys.agent]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.agent]
	}
};

module.exports = {
	viewModel
};
