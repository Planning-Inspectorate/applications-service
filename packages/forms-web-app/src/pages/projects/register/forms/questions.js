import { createQuestions } from '@planning-inspectorate/dynamic-forms/src/questions/create-questions.js';
import { questionClasses } from '@planning-inspectorate/dynamic-forms/src/questions/questions.js';
import {
	COMPONENT_TYPES,
	RequiredValidator,
	EmailValidator,
	StringValidator
} from '@planning-inspectorate/dynamic-forms';
import FullAddressValidator from '../../../../views/forms/custom-components/full-address/full-address-validator.js';
import {
	CUSTOM_COMPONENTS,
	CUSTOM_COMPONENT_CLASSES
} from '../../../../views/forms/custom-components/index.js';
import { REGISTERING_FOR_OPTIONS, WHO_REPRESENTING_OPTIONS } from './config.js';

export function getQuestions() {
	const questions = {
		registeringFor: {
			type: COMPONENT_TYPES.RADIO,
			title: 'Who are you registering for?',
			question: 'Who are you registering for?',
			fieldName: 'registeringFor',
			url: 'registering-for',
			options: REGISTERING_FOR_OPTIONS,
			validators: [new RequiredValidator()]
		},
		fullName: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: 'Full name',
			question: 'What is your full name?',
			fieldName: 'fullName',
			url: 'full-name',
			html: 'forms/html-templates/register/full-name.html',
			validators: [new RequiredValidator('Enter your full name')]
		},
		areYou18: {
			type: COMPONENT_TYPES.BOOLEAN,
			title: 'Are you 18 or over?',
			question: 'Are you 18 or over?',
			fieldName: 'areYou18',
			hint: 'You can still register to have your say if you are under 18, but we will process your personal details in a different way.',
			url: 'are-you-18-over',
			validators: [new RequiredValidator('Select yes if you are 18 or over')]
		},
		email: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: 'Email address',
			question: 'What is your email address?',
			fieldName: 'email',
			url: 'email-address',
			hint: 'We will use your email address to send you information about this project. We will not publish your email address.',
			inputAttributes: { type: 'email', spellcheck: 'false' },
			autocomplete: 'email',
			validators: [
				new EmailValidator('Enter an email address in the correct format, like name@example.com')
			]
		},
		address: {
			type: CUSTOM_COMPONENTS.FULL_ADDRESS,
			title: `Address`,
			question: 'What is your address?',
			fieldName: `address`,
			url: `address`,
			validators: [
				new FullAddressValidator({
					requiredFields: { addressLine1: true, postcode: true, country: true }
				})
			]
		},
		telephoneNumber: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: `Telephone number`,
			question: 'What is your telephone number?',
			fieldName: `telephone`,
			url: `telephone-number`,
			validators: [
				new RequiredValidator('Enter a telephone number'),
				new StringValidator({
					regex: {
						regex: /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
						regexMessage:
							'Enter a telephone number, like 01632 960 001, 07700 900 982 or 44 808 157 0192'
					}
				})
			]
		},
		registrationComments: {
			type: COMPONENT_TYPES.TEXT_ENTRY,
			title: 'Registration comments',
			question: 'What do you want to tell us about this proposed project?',
			fieldName: 'comment',
			url: 'tell-us-about-the-project',
			validators: [
				new RequiredValidator('Enter what you want to tell us about this proposed project')
			]
		},
		organisationName: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: 'What is the name of your organisation or charity?',
			question: 'What is the name of your organisation or charity?',
			fieldName: 'organisationName',
			hint: 'We will publish your organisation name on the website along with your comments about the project.',
			url: 'name-of-organisation-or-charity',
			validators: [new RequiredValidator('Enter your organisation or charity name')]
		},
		jobTitle: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: 'What is your job title or volunteer role?',
			question: 'What is your job title or volunteer role?',
			fieldName: 'jobTitle',
			url: 'what-job-title-or-role',
			validators: [new RequiredValidator('Enter your job title or volunteer role')]
		},
		whoRepresenting: {
			type: COMPONENT_TYPES.RADIO,
			title: 'Who are you representing?',
			question: 'Who are you representing?',
			fieldName: 'whoRepresenting',
			options: WHO_REPRESENTING_OPTIONS,
			url: 'who-representing',
			validators: [new RequiredValidator('Select who you are representing')]
		},
		representingHouseholdName: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: 'What is the name of the household you are representing?',
			question: 'What is the name of the household you are representing?',
			fieldName: 'representedHouseholdName',
			url: 'name-household-representing',
			validators: [new RequiredValidator('Enter the name of the household you are representing')]
		},
		representingPersonName: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: 'What is the full name of the person you are representing?',
			question: 'What is the full name of the person you are representing?',
			fieldName: 'representedPersonName',
			url: 'name-person-representing',
			validators: [new RequiredValidator('Enter the full name of the person you are representing')]
		},
		representingOrganisationName: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: 'What is the full name of the organisation or charity that you are representing?',
			question: 'What is the full name of the organisation or charity that you are representing?',
			fieldName: 'representedOrganisationName',
			url: 'represented-organisation-name',
			validators: [
				new RequiredValidator(
					'Enter the full name of the organisation or charity you are representing'
				)
			]
		},
		representedEmail: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: 'What is their email address?',
			question: 'What is their email address?',
			fieldName: 'representedEmail',
			url: 'represented-email-address',
			inputAttributes: { type: 'email', spellcheck: 'false' },
			autocomplete: 'email',
			validators: [
				new EmailValidator('Enter an email address in the correct format, like name@example.com')
			]
		},
		representedAddress: {
			type: CUSTOM_COMPONENTS.FULL_ADDRESS,
			title: `What is their address?`,
			question: 'What is their address?',
			fieldName: `representedAddress`,
			url: `represented-address`,
			validators: [
				new FullAddressValidator({
					requiredFields: { addressLine1: true, postcode: true, country: true }
				})
			]
		},
		representedTelephone: {
			type: COMPONENT_TYPES.SINGLE_LINE_INPUT,
			title: `What is their telephone number?`,
			question: 'What is their telephone number?',
			fieldName: `representedTelephone`,
			url: `represented-telephone-number`,
			validators: [
				new RequiredValidator('Enter a telephone number'),
				new StringValidator({
					regex: {
						regex: /^\+?\d{1,3}?[-.\s]?\(?\d{1,4}\)?[-.\s]?\d{1,4}[-.\s]?\d{1,9}$/,
						regexMessage:
							'Enter a telephone number, like 01632 960 001, 07700 900 982 or 44 808 157 0192'
					}
				})
			]
		}
	};

	const classes = {
		...questionClasses,
		...CUSTOM_COMPONENT_CLASSES
	};

	return createQuestions(questions, classes, {});
}
