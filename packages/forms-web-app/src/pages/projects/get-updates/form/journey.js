import { Journey, Section } from '@planning-inspectorate/dynamic-forms';
import { journeyId, journeyTitle } from './config.js';

export function createJourney(questions, response, req) {
	if (!req.baseUrl.endsWith('/' + journeyId)) {
		throw new Error(`not a valid request for the ${journeyId} journey`);
	}

	return new Journey({
		journeyId: journeyId,
		sections: [new Section(journeyTitle, 'details').addQuestion(questions.test)],
		taskListUrl: 'check-your-answers',
		journeyTemplate: 'layouts/forms-question.njk',
		taskListTemplate: 'layouts/forms-check-your-answers.njk',
		journeyTitle: journeyTitle,
		returnToListing: false,
		makeBaseUrl: () => req.baseUrl,
		initialBackLink: '/',
		response
	});
}
