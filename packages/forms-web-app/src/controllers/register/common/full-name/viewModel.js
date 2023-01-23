const { keys } = require('../keys');

const viewModel = {
	[keys.myself]: {
		titleTag:
			'What is your full name? - Registering for myself - Register to have your say about a national infrastructure project - National Infrastructure Planning',
		hint: `<p>We will publish this on the website along with your comments about the project.</p>
                <p>You must register as an individual. If your partner wants to register, they will have to fill in a separate form with their details.</p>`
	},
	[keys.organisation]: {
		titleTag:
			'What is your full name? - Registering for an organisation - Register to have your say about a national infrastructure project - National Infrastructure Planning'
	},
	[keys.agent]: {
		titleTag:
			'What is your full name? - Registering on behalf of someone else - Register to have your say about a national infrastructure project - National Infrastructure Planning'
	}
};

module.exports = {
	viewModel
};
