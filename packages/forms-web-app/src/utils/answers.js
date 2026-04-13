export function getAnswersFromRes(res) {
	if (!res.locals || !res.locals.journeyResponse) {
		throw new Error('journey response required');
	}
	const journeyResponse = res.locals.journeyResponse;
	const answers = journeyResponse.answers;
	if (typeof answers !== 'object') {
		throw new Error('answers should be an object');
	}
	return answers;
}
