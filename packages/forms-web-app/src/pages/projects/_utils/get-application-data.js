const { getProjectData } = require('../../../lib/application-api-wrapper');
const { NotFoundError } = require('../../../lib/errors');
const { projectInfoProjectStages } = require('../../../utils/project-stages');
const dayjs = require('dayjs');
const { preserveLinebreaks } = require('../../../lib/preserve-line-breaks');
const { isLangWelsh } = require('../../_utils/is-lang-welsh');

const badDateToNull = (date) => (date === '0000-00-00' ? null : date);

const add28DaysToDate = (date) => (date ? dayjs(date).add(28, 'days').toISOString() : null);

const getApplicationData = async (case_ref, lang = 'en') => {
	const { data, resp_code } = await getProjectData(case_ref);

	if (resp_code === 404) {
		throw new NotFoundError(`Project with reference ${case_ref}`);
	}

	if (resp_code !== 200) {
		throw new Error('Application response status not 200');
	}

	const status = {
		number: data.Stage,
		text: projectInfoProjectStages[data.Stage] || ''
	};

	const DateOfDCOSubmission = badDateToNull(data.DateOfDCOSubmission);

	const translatedField = (englishField, welshField) => {
		if (data.Region === 'Wales' && isLangWelsh(lang) && data[welshField]) {
			return data[welshField];
		}

		return data[englishField];
	};

	return {
		projectName: translatedField('ProjectName', 'ProjectNameWelsh'),
		promoterName: data.PromoterName,
		caseRef: data.CaseReference,
		proposal: data.Proposal,
		summary: preserveLinebreaks(translatedField('Summary', 'SummaryWelsh')),
		confirmedDateOfDecision: badDateToNull(data.ConfirmedDateOfDecision),
		webAddress: data.WebAddress,
		dateOfNonAcceptance: badDateToNull(data.dateOfNonAcceptance),
		status,
		anticipatedSubmissionDateNonSpecific: data.AnticipatedSubmissionDateNonSpecific,
		contactEmailAddress: data.ProjectEmailAddress,
		DateOfDCOSubmission: add28DaysToDate(DateOfDCOSubmission),
		DateOfRepresentationPeriodOpen: badDateToNull(data.DateOfRepresentationPeriodOpen),
		DateOfRelevantRepresentationClose: badDateToNull(data.DateOfRelevantRepresentationClose),
		DateOfReOpenRelevantRepresentationStart: badDateToNull(
			data.DateOfReOpenRelevantRepresentationStart
		),
		DateOfReOpenRelevantRepresentationClose: badDateToNull(
			data.DateOfReOpenRelevantRepresentationStart
		),
		DateRRepAppearOnWebsite: badDateToNull(data.DateRRepAppearOnWebsite),
		DateOfPreliminaryMeeting: badDateToNull(data.DateOfPreliminaryMeeting),
		dateTimeExaminationEnds: badDateToNull(data.DateTimeExaminationEnds),
		stage5ExtensionToRecommendationDeadline: badDateToNull(
			data.stage5ExtensionToRecommendationDeadline
		),
		dateOfRecommendations: badDateToNull(data.DateOfRecommendations),
		stage5ExtensionToDecisionDeadline: badDateToNull(data.Stage5ExtensiontoDecisionDeadline),
		longLat: data.LongLat,
		mapZoomLevel: data.MapZoomLevel,
		projectLocation: translatedField('ProjectLocation', 'ProjectLocationWelsh'),
		isMaterialChange: data.isMaterialChange
	};
};

module.exports = {
	getApplicationData
};
