const { keys } = require('../../../../../../controllers/register/common/keys');
const { pageTitle } = require('../../../../../../controllers/register/common/common-veiw-model');

const pageTitlePrefix = 'Registration complete';

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
