export const journeyId = 'get-updates-form';
export const journeyTitle = 'Get updates about your project';

export const HOW_OFTEN_OPTIONS = [
	{
		value: 'allUpdates',
		text: 'Each time we update the project (you may get more than one email a day)',
		behaviour: 'exclusive' // WIP: this is not yet supported by dynamic-forms!
	},
	{
		divider: 'or'
	},
	{
		value: 'applicationSubmitted',
		text: 'When the application is submitted'
	},
	{
		value: 'registrationOpen',
		text: 'When you can register to have your say'
	},
	{
		value: 'applicationDecided',
		text: 'When the final decision has been made'
	}
];
