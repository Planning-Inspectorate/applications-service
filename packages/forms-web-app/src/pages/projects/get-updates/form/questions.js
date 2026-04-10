import { createQuestions } from '@planning-inspectorate/dynamic-forms/src/questions/create-questions.js';
import { questionClasses } from '@planning-inspectorate/dynamic-forms/src/questions/questions.js';
import EmailValidator from '@planning-inspectorate/dynamic-forms/src/validator/email-validator.js';
import { COMPONENT_TYPES, RequiredValidator } from '@planning-inspectorate/dynamic-forms';
import {
	CUSTOM_COMPONENTS,
	CUSTOM_COMPONENT_CLASSES
} from '../../../../views/forms/custom-components/index.js';
import { HOW_OFTEN_OPTIONS } from './config.js';

export function getQuestions() {
	const questions = {
		email: {
			type: CUSTOM_COMPONENTS.INVERTED_HTML_SINGLE_LINE_INPUT,
			title: 'Email address',
			question: 'What is your email address?',
			fieldName: 'email',
			html: 'forms/html-templates/get-updates/email.html',
			url: 'email',
			inputAttributes: { type: 'email', spellcheck: 'false' },
			autocomplete: 'email',
			validators: [new EmailValidator()]
		},
		howOften: {
			type: COMPONENT_TYPES.CHECKBOX,
			title: 'How often',
			question: 'How often do you want to get emails about the project?',
			fieldName: 'howOften',
			url: 'how-often',
			options: HOW_OFTEN_OPTIONS,
			validators: [new RequiredValidator()]
		}
	};

	const classes = {
		...questionClasses,
		...CUSTOM_COMPONENT_CLASSES
	};

	return createQuestions(questions, classes, {});
}
