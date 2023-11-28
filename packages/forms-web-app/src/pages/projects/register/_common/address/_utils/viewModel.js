const { keys } = require('../../../../../../controllers/register/common/keys');
const { pageTitle } = require('../../../../../../controllers/register/common/common-veiw-model');

const pageTitlePrefix = 'What is your address?';
const viewModel = {
	[keys.myself]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.myself],
		title: pageTitlePrefix
	},
	[keys.organisation]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.organisation],
		title: pageTitlePrefix
	},
	[keys.agent]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.agent],
		title: pageTitlePrefix
	}
};

module.exports = {
	viewModel
};
