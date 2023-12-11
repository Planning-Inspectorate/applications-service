const { SERVICE_USERS_BACKOFFICE_DATA } = require('./serviceUser');
const {} = require('./documents');
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
	representedId: '10',
	representativeId: '20',
	attachmentIds: '1,2,3'
};

const REPRESENTED_BACKOFFICE_DATA = SERVICE_USERS_BACKOFFICE_DATA[0];
const REPRESENTATIVE_BACKOFFICE_DATA = SERVICE_USERS_BACKOFFICE_DATA[1];

const REPRESENTATION_BACKOFFICE_RESPONSE = {
	ID: REPRESENTATION_BACKOFFICE_DATA.representationId,
	CaseReference: REPRESENTATION_BACKOFFICE_DATA.caseReference,
	UniqueReference: REPRESENTATION_BACKOFFICE_DATA.referenceId,
	PersonalName: REPRESENTED_BACKOFFICE_DATA.firstName + ' ' + REPRESENTED_BACKOFFICE_DATA.lastName,
	Representative:
		REPRESENTATIVE_BACKOFFICE_DATA.firstName + ' ' + REPRESENTATIVE_BACKOFFICE_DATA.lastName,
	OrgOnBhalfName: REPRESENTED_BACKOFFICE_DATA.organisationName,
	RepFrom: REPRESENTATION_BACKOFFICE_DATA.representationType,
	RepresentationRedacted: REPRESENTATION_BACKOFFICE_DATA.representationComment,
	DateRrepReceived: REPRESENTATION_BACKOFFICE_DATA.dateReceived,
	Attachments: REPRESENTATION_BACKOFFICE_DATA.attachmentIds,
	attachments: []
};

const FILTERS_NI_DB = [];
module.exports = {
	REPRESENTATION_NI_DATA,
	FILTERS_NI_DB,
	REPRESENTATION_BACKOFFICE_DATA,
	REPRESENTATION_BACKOFFICE_RESPONSE
};
