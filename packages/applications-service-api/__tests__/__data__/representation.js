const { SERVICE_USERS_BACKOFFICE_DATA } = require('./serviceUser');
const REPRESENTATION_NI_DATA = [
	{
		ID: 2,
		ProjectName: 'SPT Feb 2020',
		CaseReference: 'EN010009',
		DataID: null,
		UniqueReference: 'WS010006-34601',
		WebReference: null,
		PersonalName: 'Test (Test)',
		Representative: null,
		IndvdlOnBhalfName: null,
		OrgOnBhalfName: null,
		AgentOrgOnBhalfContactName: null,
		RepFrom: 'Members of the Public/Businesses',
		InterestInLand: null,
		SpecifyOther: null,
		CompulsoryAcquisitionHearing: null,
		RepresentationOriginal: null,
		RepresentationRedacted: 'Some comments',
		RelevantOrNot: null,
		SubmitFurtherWrittenReps: null,
		PreliminaryMeeting: null,
		OpenFloorHearings: null,
		IssuesSpecificHearings: null,
		DateRrepReceived: '2020-02-19T00:00:00.000Z',
		DoNotPublish: null,
		Attachments: 'WS010006-000002'
	}
];

const REPRESENTED_BACKOFFICE_DATA = SERVICE_USERS_BACKOFFICE_DATA[0];
const REPRESENTATIVE_BACKOFFICE_DATA = SERVICE_USERS_BACKOFFICE_DATA[1];

const REPRESENTATION_BACKOFFICE_DATA = {
	id: 1,
	representationId: 1,
	caseReference: 'BC010001',
	caseId: 1,
	referenceId: 'TR010109-34671',
	status: 'Open',
	dateReceived: '2021-08-01T00:00:00.000Z',
	representationComment: 'Some comments',
	representationFrom: 'Members of the Public/Businesses',
	representationType: 'Parish Councils',
	registerFor: 'Compulsory Acquisition Hearing',
	representedId: REPRESENTED_BACKOFFICE_DATA.serviceUserId,
	representativeId: REPRESENTATIVE_BACKOFFICE_DATA.serviceUserId,
	attachmentIds: '1,2,3'
};

const REPRESENTATIONS_BACKOFFICE_DATA = Array(20).fill(REPRESENTATION_BACKOFFICE_DATA);

const REPRESENTATION_BACKOFFICE_RESPONSE = {
	ID: REPRESENTATION_BACKOFFICE_DATA.representationId,
	CaseReference: REPRESENTATION_BACKOFFICE_DATA.caseReference,
	UniqueReference: REPRESENTATION_BACKOFFICE_DATA.referenceId,
	PersonalName: REPRESENTED_BACKOFFICE_DATA.organisationName
		? REPRESENTED_BACKOFFICE_DATA.organisationName
		: REPRESENTED_BACKOFFICE_DATA.firstName + ' ' + REPRESENTED_BACKOFFICE_DATA.lastName,
	Representative: REPRESENTATIVE_BACKOFFICE_DATA.organisationName
		? REPRESENTATIVE_BACKOFFICE_DATA.organisationName
		: REPRESENTATIVE_BACKOFFICE_DATA.firstName + ' ' + REPRESENTATIVE_BACKOFFICE_DATA.lastName,
	OrgOnBhalfName: REPRESENTED_BACKOFFICE_DATA.organisationName,
	RepFrom: REPRESENTATION_BACKOFFICE_DATA.representationType,
	RepFromWelsh: 'Cyngor Plwyf',
	RepresentationRedacted: REPRESENTATION_BACKOFFICE_DATA.representationComment,
	DateRrepReceived: REPRESENTATION_BACKOFFICE_DATA.dateReceived,
	Attachments: REPRESENTATION_BACKOFFICE_DATA.attachmentIds,
	attachments: [
		{
			id: 1,
			dataID: null,
			case_reference: 'EN010009',
			stage: 'pre-application',
			stageLabel: {
				cy: 'Cyn-ymgeisio',
				en: 'Pre-application'
			},
			type: 'Dave',
			filter1: 'CR-1234-A',
			filter2: '',
			description: '',
			size: 412846,
			mime: 'application/pdf',
			path: 'https://example.org/file.pdf',
			datePublished: '2023-03-26T00:00:00.000',
			representative: '',
			docReference: null,
			author: null,
			personalName: null,
			lastModified: '2023-06-19 10:50:31.8860000',
			dateCreated: '2023-06-19 10:50:31.8860000'
		}
	]
};

// eslint-disable-next-line no-unused-vars
let { attachments, ...REPRESENTATIONS_BACKOFFICE_RESPONSE } = REPRESENTATION_BACKOFFICE_RESPONSE;
REPRESENTATIONS_BACKOFFICE_RESPONSE = Array(20).fill(REPRESENTATIONS_BACKOFFICE_RESPONSE);

const FILTERS_NI_DB = [];
module.exports = {
	REPRESENTATION_NI_DATA,
	FILTERS_NI_DB,
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATION_BACKOFFICE_RESPONSE,
	REPRESENTATIONS_BACKOFFICE_DATA,
	REPRESENTATIONS_BACKOFFICE_RESPONSE
};
