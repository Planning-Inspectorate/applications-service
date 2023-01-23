const { keys } = require('../keys');

const viewModel = {
	[keys.myself]: {
		titleTag:
			'What is your email address? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning'
	},
	[keys.organisation]: {
		titleTag:
			'What is your email address? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
	},
	[keys.agent]: {
		titleTag:
			'What is your email address? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
	}
};

module.exports = {
	viewModel
};
