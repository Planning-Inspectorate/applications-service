const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Representation extends Model {}
	Representation.init(
		{
			ID: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			ProjectName: DataTypes.TEXT,
			CaseReference: DataTypes.STRING,
			DataID: DataTypes.INTEGER,
			UniqueReference: DataTypes.STRING,
			WebReference: DataTypes.INTEGER,
			PersonalName: DataTypes.TEXT,
			Representative: DataTypes.STRING,
			IndvdlOnBhalfName: DataTypes.TEXT,
			OrgOnBhalfName: DataTypes.TEXT,
			AgentOrgOnBhalfContactName: DataTypes.TEXT,
			RepFrom: DataTypes.STRING,
			InterestInLand: DataTypes.TEXT,
			SpecifyOther: DataTypes.TEXT,
			CompulsoryAcquisitionHearing: DataTypes.TEXT,
			RepresentationOriginal: DataTypes.TEXT,
			RepresentationRedacted: DataTypes.TEXT,
			RelevantOrNot: DataTypes.TEXT,
			SubmitFurtherWrittenReps: DataTypes.TEXT,
			PreliminaryMeeting: DataTypes.TEXT,
			OpenFloorHearings: DataTypes.TEXT,
			IssuesSpecificHearings: DataTypes.TEXT,
			DateRrepReceived: DataTypes.TIME,
			DoNotPublish: DataTypes.STRING,
			Attachments: DataTypes.TEXT
		},
		{
			sequelize,
			modelName: 'Representation',
			tableName: 'wp_ipc_representations',
			timestamps: false
		}
	);

	Representation.removeAttribute('id');
	return Representation;
};
