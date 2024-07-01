const { keys } = require('./keys');

const commonPageTitle =
	'- Register to have your say about a national infrastructure project - National Infrastructure Planning';

const pageTitle = {
	[keys.myself]: ` - Registering for myself ${commonPageTitle}`,
	[keys.organisation]: ` - Registering for an organisation ${commonPageTitle}`,
	[keys.agent]: ` - Registering on behalf of someone else ${commonPageTitle}`
};
module.exports = {
	pageTitle
};
