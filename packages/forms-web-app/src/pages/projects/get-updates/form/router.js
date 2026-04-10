import express from 'express';

import { asyncHandler } from '../../../../utils/async-handler.js';
import { buildGetUpdatesHomePage } from './controller.js';
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

	const getUpdatesHomePage = buildGetUpdatesHomePage();
	const saveController = buildSaveController();

	router.get('/', asyncHandler(getUpdatesHomePage));

	router.get('/:section/:question', getJourneyResponse, getJourney, question);
	router.post(
		'/:section/:question',
		getJourneyResponse,
		getJourney,
		validate,
		validationErrorHandler,
		buildSave(saveDataToSession)
	);

	/* we have two options here for handling the transition from the form back to the existing control flow
	1. we can feature a check your answers page, letting users confirm their answers before confirming and then the email confirmation is sent
	2. we can configure this check your answers route to redirect us straight to the email confirmation page, skipping the check your answers page entirely

	option 2 lets us keep the flow as it is currently, but the check your answers page is a key component of dynamic forms. Bypassing it is a bit "hacky" and is not the intended flow
	option 1 lets us remain consistent with other PINS journeys using dynamic forms but it does alter our current flow.
	I recognise that for a journey this short it seems redundant, but for larger journeys like "have your say" a check your answers page would be more useful

	I have gone for option 1 for now as it is easier to implement
	*/
	router.get('/check-your-answers', getJourneyResponse, getJourney, (req, res) =>
		list(req, res, journeyId, {
			submitButtonText: 'Save and return'
		})
	);

	router.post('/check-your-answers', getJourneyResponse, getJourney, asyncHandler(saveController));

	return router;
}
