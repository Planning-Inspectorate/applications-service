const db = require('../models');
const { Op } = require('sequelize');
const { pick } = require('lodash');

const GET_ALL_APPLICATIONS_DEFAULT_ATTRIBUTES = [
	'AnticipatedDateOfSubmission',
	'AnticipatedGridRefEasting',
	'AnticipatedGridRefNorthing',
	'AnticipatedSubmissionDateNonSpecific',
	'ApplicantEmailAddress',
	'ApplicantPhoneNumber',
	'CaseReference',
	'ConfirmedDateOfDecision',
	'ConfirmedStartOfExamination',
	'DateOfDCOAcceptance_NonAcceptance',
	'DateOfDCOSubmission',
	'dateOfNonAcceptance',
	'DateOfPreliminaryMeeting',
	'DateOfRecommendations',
	'DateOfRelevantRepresentationClose',
	'DateOfRepresentationPeriodOpen',
	'DateProjectWithdrawn',
	'DateRRepAppearOnWebsite',
	'DateTimeExaminationEnds',
	'LatLong',
	'MapZoomLevel',
	'ProjectEmailAddress',
	'ProjectLocation',
	'ProjectName',
	'PromoterFirstName',
	'PromoterLastName',
	'PromoterName',
	'Proposal',
	'Region',
	'sourceSystem',
	'Stage',
	'Stage4ExtensiontoExamCloseDate',
	'Stage5ExtensiontoDecisionDeadline',
	'stage5ExtensionToRecommendationDeadline',
	'Summary',
	'WebAddress'
];

const getApplication = async (id) => db.Project.findOne({ where: { CaseReference: id } });

const getAllApplications = async (options) => {
	const { filters } = options;

	const statements = [];
	if (filters?.region) statements.push({ Region: { [Op.in]: filters.region } });
	if (filters?.stage) statements.push({ Stage: { [Op.in]: filters.stage } });
	if (filters?.sector) {
		const sectorStatements = filters.sector.map((sector) => ({
			Proposal: { [Op.like]: `${sector}%` }
		}));
		statements.push({ [Op.or]: sectorStatements });
	}

	let findAllOptions = pick(options, ['offset', 'limit', 'order']);
	if (statements.length > 0) findAllOptions.where = { [Op.and]: statements };
	findAllOptions.attributes = options.attributes || GET_ALL_APPLICATIONS_DEFAULT_ATTRIBUTES;

	return db.Project.findAll({
		...findAllOptions,
		raw: true
	});
};

const getAllApplicationsCount = async () => db.Project.count();

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsCount,
	GET_ALL_APPLICATIONS_DEFAULT_ATTRIBUTES
};
