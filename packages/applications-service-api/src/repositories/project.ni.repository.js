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

const getAllApplications = async (options = {}) => {
	const { filters, searchTerm } = options;
	let findAllOptions = pick(options, ['offset', 'limit', 'order']);
	findAllOptions.attributes = options.attributes || GET_ALL_APPLICATIONS_DEFAULT_ATTRIBUTES;
	findAllOptions.where = {};

	// filters
	const filterStatements = [];
	if (filters?.region) filterStatements.push({ Region: { [Op.in]: filters.region } });
	if (filters?.stage) filterStatements.push({ Stage: { [Op.in]: filters.stage } });
	if (filters?.sector) {
		const sectorStatements = filters.sector.map((sector) => ({
			Proposal: { [Op.like]: `${sector}%` }
		}));
		filterStatements.push({ [Op.or]: sectorStatements });
	}

	// search
	const searchTermStatements = [];
	if (searchTerm) {
		searchTermStatements.push({ ProjectName: { [Op.like]: `%${searchTerm}%` } });
		searchTermStatements.push({ PromoterName: { [Op.like]: `%${searchTerm}%` } });
	}

	// build where clause
	if (filterStatements.length > 0)
		findAllOptions.where = { ...findAllOptions.where, [Op.and]: filterStatements };
	if (searchTermStatements.length > 0)
		findAllOptions.where = { ...findAllOptions.where, [Op.or]: searchTermStatements };

	const applications = await db.Project.findAll({
		...findAllOptions,
		raw: true
	});

	const count = await db.Project.count({
		where: findAllOptions.where
	});
	return { applications, count };
};

const getAllApplicationsCount = async () => db.Project.count();

module.exports = {
	getApplication,
	getAllApplications,
	getAllApplicationsCount,
	GET_ALL_APPLICATIONS_DEFAULT_ATTRIBUTES
};
