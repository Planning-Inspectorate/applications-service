const stream = require('stream');
const { stringify } = require('csv-stringify/sync');

const Transform = stream.Transform;

class TransformToCSV extends Transform {
	constructor(options) {
		super(options);
	}

	_transform(chunk, enc, cb) {
		this.push(this.mapApplicationsToCSV(chunk));
		cb();
	}

	mapApplicationsToCSV(applications) {
		const mappedApplications = applications.map((application) => ({
			'Project reference': application.CaseReference,
			'Project name': application.ProjectName,
			'Applicant name': application.PromoterName,
			'Application type': application.Proposal,
			Region: application.Region,
			Location: application.ProjectLocation,
			'Grid reference - Easting': application.AnticipatedGridRefEasting,
			'Grid reference - Northing:': application.AnticipatedGridRefNorthing,
			// 'GPS co-ordinates': application.LongLat.join(', '),
			Stage: application.Stage,
			Description: application.Summary,
			'Anticipated submission date': application.AnticipatedDateOfSubmission,
			'Anticipated submission period': application.AnticipatedSubmissionDateNonSpecific,
			'Date of application': application.DateOfDCOSubmission,
			'Date application accepted': application.DateOfDCOAcceptance_NonAcceptance,
			'Date Examination started': application.ConfirmedStartOfExamination,
			'Date Examination closed': application.DateTimeExaminationEnds,
			'Date of recommendation': application.DateOfRecommendations,
			'Date of decision': application.ConfirmedDateOfDecision,
			'Date withdrawn': application.DateProjectWithdrawn
		}));

		return stringify(mappedApplications, {
			header: applications.setCSVHeader,
			escape_formulas: true,
			quoted_string: true
		});
	}
}

module.exports = TransformToCSV;
