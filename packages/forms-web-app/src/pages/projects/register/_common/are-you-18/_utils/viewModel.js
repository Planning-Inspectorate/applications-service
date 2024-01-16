const { keys } = require('../../../../../../controllers/register/common/keys');
const { pageTitle } = require('../../../../../../controllers/register/common/common-veiw-model');

const pageTitlePrefix = 'Are you 18 or over?';
const viewModel = {
	[keys.myself]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.myself]
	},
	[keys.organisation]: {
		pageTitle: pageTitlePrefix + pageTitle[keys.organisation]
	}
};

module.exports = {
	viewModel
};
