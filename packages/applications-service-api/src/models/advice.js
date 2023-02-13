const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Attachment extends Model {}

	Attachment.init(
		{
			dataID: { type: DataTypes.STRING, field: 'dataID' }
		},
		{
			sequelize,
			modelName: 'Attachment',
			tableName: 'wp_ipc_documents_api',
			timestamps: false
		}
	);
	class Advice extends Model {
		static async findandCountAllWithAttachments(options = {}) {
			const tableName = Advice.getTableName();

			const adviceCountSql = sequelize.dialect.QueryGenerator.selectQuery(
				tableName,
				{
					attributes: [[sequelize.fn('COUNT', sequelize.col('*')), 'count']],
					...options
				},
				Advice
			);
			const adviceAndAttachmentsCountSql = attachmentsJoin(adviceCountSql);

			const adviceSql = sequelize.dialect.QueryGenerator.selectQuery(
				tableName,
				{
					attributes: Object.entries(Advice.rawAttributes).map(([key, attr]) => [attr.field, key]),
					...options
				},
				Advice
			);
			const adviceAndAttachmentsSql = attachmentsJoin(adviceSql);

			const [count, rows] = await Promise.all([
				sequelize.query(adviceAndAttachmentsCountSql, {
					type: sequelize.QueryTypes.SELECT
				}),
				sequelize.query(adviceAndAttachmentsSql, {
					model: Advice,
					mapToModel: true
				})
			]);

			return {
				count: count[0]?.count ?? 0,
				rows
			};
		}
	}

	Advice.init(
		{
			id: {
				type: DataTypes.INTEGER,
				primaryKey: true,
				autoIncrement: true
			},
			adviceID: { type: DataTypes.STRING, field: 'AdviceID' },
			enquiryDate: { type: DataTypes.DATEONLY, field: 'EnquiryDate' },
			enquiryMethod: { type: DataTypes.STRING, field: 'EnquiryMethod' },
			industrySector: { type: DataTypes.STRING, field: 'IndustrySector' },
			caseReference: { type: DataTypes.STRING, field: 'CaseReference' },
			firstName: { type: DataTypes.STRING, field: 'EnqFirstName' },
			lastName: { type: DataTypes.STRING, field: 'EnqLastName' },
			organisation: { type: DataTypes.STRING, field: 'EnquiryOrganisation' },
			enquiryDetail: { type: DataTypes.STRING, field: 'EnquiryDetail' },
			adviceGiven: { type: DataTypes.STRING, field: 'AdviceGiven' },
			respondedBy: { type: DataTypes.STRING, field: 'RespondedBy' },
			section51Enquiry: {
				type: DataTypes.BOOLEAN,
				field: 'Section51Enquiry',
				get() {
					return this.getDataValue('section51Enquiry')?.toUpperCase() === 'YES';
				},
				set(value) {
					this.setDataValue('section51Enquiry', value ? 'Yes' : 'No');
				}
			},
			initiatedDate: { type: DataTypes.DATEONLY, field: 'InitiatedDate' },
			dateEnquiryReceived: { type: DataTypes.DATE, field: 'DateEnquiryReceived' },
			dateAdviceGiven: { type: DataTypes.DATEONLY, field: 'DateAdviceGiven' },
			dateLastModified: { type: DataTypes.DATE, field: 'DateLastModified' },
			dateCreated: { type: DataTypes.DATE, field: 'DateCreated' }
		},
		{
			sequelize,
			modelName: 'Advice',
			tableName: 'wp_ipc_advice',
			timestamps: false
		}
	);

	return Advice;
};

// This SQL manipulation allows Sequelize to be used with the non-normalised join of Advice to attachments
function attachmentsJoin(sql) {
	return sql.replace(
		'FROM `wp_ipc_advice` AS `Advice`',
		`FROM (
			SELECT Advice.* 
			FROM wp_ipc_advice AS Advice 
			INNER JOIN wp_ipc_documents_api AS Attachments 
			ON Advice.Attachments LIKE CONCAT('%', Attachments.dataID, '%')
		) as Advice`
	);
}
