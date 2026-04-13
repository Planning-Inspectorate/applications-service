import express from 'express';

import { asyncHandler } from '../../../../utils/async-handler.js';
import { buildRegisterToHaveYourSayHomePage } from './controller.js';
import { createJourney } from './journey.js';
import { journeyId } from './config.js';
import { getQuestions } from './questions.js';
import { buildSaveController } from './save.js';

import { buildGetJourney } from '@planning-inspectorate/dynamic-forms/src/middleware/build-get-journey.js';
import {
	buildGetJourneyResponseFromSession,
	saveDataToSession
} from '@planning-inspectorate/dynamic-forms/src/lib/session-answer-store.js';
import { list, question, buildSave } from '@planning-inspectorate/dynamic-forms/src/controller.js';
import validate from '@planning-inspectorate/dynamic-forms/src/validator/validator.js';
import { validationErrorHandler } from '@planning-inspectorate/dynamic-forms/src/validator/validation-error-handler.js';

export function createRoutes() {
	const router = express.Router();

	const questions = getQuestions();
	const getJourney = buildGetJourney((req, journeyResponse) =>
		createJourney(questions, journeyResponse, req)
	);
	const getJourneyResponse = buildGetJourneyResponseFromSession(journeyId);

	const registerToHaveYourSayHomePage = buildRegisterToHaveYourSayHomePage();
	const saveController = buildSaveController();

	router.get('/', asyncHandler(registerToHaveYourSayHomePage));

	router.get('/:section/:question', getJourneyResponse, getJourney, question);
	router.post(
		'/:section/:question',
		getJourneyResponse,
		getJourney,
		validate,
		validationErrorHandler,
		buildSave(saveDataToSession)
	);

	router.get('/check-your-answers', getJourneyResponse, getJourney, (req, res) =>
		list(req, res, journeyId, {
			submitButtonText: 'Save and return'
		})
	);

	router.post('/check-your-answers', getJourneyResponse, getJourney, asyncHandler(saveController));

	return router;
}
