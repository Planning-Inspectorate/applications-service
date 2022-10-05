const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Submission extends Model {}
	Submission.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			name: DataTypes.STRING,
			email: DataTypes.STRING,
			interestedParty: DataTypes.BOOLEAN,
			iPReference: DataTypes.STRING,
			deadline: DataTypes.STRING,
			submissionType: DataTypes.TEXT,
			representation: DataTypes.TEXT,
			sensitiveData: DataTypes.BOOLEAN,
			lateSubmission: DataTypes.BOOLEAN,
			caseReference: DataTypes.STRING,
			dateSubmitted: DataTypes.DATE,
			exported: DataTypes.DATE,
			submissionId: DataTypes.INTEGER,
			submissionIdHash: DataTypes.STRING,
			filenameOriginal: DataTypes.STRING,
			filename: DataTypes.STRING,
			fileSize: DataTypes.INTEGER,
			fileMD5: DataTypes.STRING,
			validated: DataTypes.DATE,
			formData: DataTypes.TEXT
		},
		{
			sequelize,
			modelName: 'Submission',
			tableName: 'wp_ipc_submissions',
			timestamps: false
		}
	);

	return Submission;
};
