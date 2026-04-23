import { Journey, Section, whenQuestionHasAnswer } from '@planning-inspectorate/dynamic-forms';
import {
	questionHasAnswer,
	questionArrayMeetsCondition
} from '@planning-inspectorate/dynamic-forms/src/components/utils/question-has-answer.js';
import { journeyId, journeyTitle } from './config.js';

export function createJourney(questions, response, req) {
	if (!req.baseUrl.endsWith('/' + journeyId)) {
		throw new Error(`not a valid request for the ${journeyId} journey`);
	}

	return new Journey({
		journeyId: journeyId,
		sections: [
			new Section('Personal details', 'details')
				.addQuestion(questions.registeringFor)
				.addQuestion(questions.fullName)
				.addQuestion(questions.areYou18)
				.withCondition(
					questionArrayMeetsCondition(response, { fieldName: 'registeringFor' }, (answer) =>
						['myself', 'organisation'].includes(answer)
					)
				)
				.startMultiQuestionCondition('organisationInfo', (response) =>
					questionHasAnswer(response, questions.registeringFor, 'organisation')
				)
				.addQuestion(questions.organisationName)
				.addQuestion(questions.jobTitle)
				.endMultiQuestionCondition('organisationInfo')
				.addQuestion(questions.email)
				.addQuestion(questions.address)
				.addQuestion(questions.telephoneNumber)
				.startMultiQuestionCondition('agentInfo', (response) =>
					questionHasAnswer(response, questions.registeringFor, 'agent')
				)
				.addQuestion(questions.whoRepresenting)
				.addQuestion(questions.representingPersonName)
				.withCondition(whenQuestionHasAnswer(questions.whoRepresenting, 'person'))
				.addQuestion(questions.representingOrganisationName)
				.withCondition(whenQuestionHasAnswer(questions.whoRepresenting, 'organisation'))
				.addQuestion(questions.representingHouseholdName)
				.withCondition(whenQuestionHasAnswer(questions.whoRepresenting, 'household'))
				.addQuestion(questions.representedEmail)
				.addQuestion(questions.representedAddress)
				.addQuestion(questions.representedTelephone)
				.endMultiQuestionCondition('agentInfo')
				.addQuestion(questions.registrationComments)
		],
		taskListUrl: 'check-your-answers',
		journeyTemplate: 'layouts/forms/forms-question.njk',
		taskListTemplate: 'layouts/forms/forms-check-your-answers.njk',
		journeyTitle: journeyTitle,
		returnToListing: false,
		makeBaseUrl: () => req.baseUrl,
		initialBackLink: '/',
		response
	});
}
