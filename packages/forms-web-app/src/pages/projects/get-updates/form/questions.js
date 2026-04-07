import { createQuestions } from '@planning-inspectorate/dynamic-forms/src/questions/create-questions.js';
import { questionClasses } from '@planning-inspectorate/dynamic-forms/src/questions/questions.js';
import RequiredValidator from '@planning-inspectorate/dynamic-forms/src/validator/required-validator.js';
import { COMPONENT_TYPES } from '@planning-inspectorate/dynamic-forms';

export function getQuestions() {
	const questions = {
		test: {
			type: COMPONENT_TYPES.BOOLEAN,
			title: 'test',
			question: 'Could the project test?',
			fieldName: 'test',
			url: 'test-url',
			validators: [new RequiredValidator('test')]
		}
	};

	return createQuestions(questions, questionClasses, {});
}
