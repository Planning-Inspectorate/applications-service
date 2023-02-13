const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Attachment extends Model {
		static async findAllAttachments(options = {}) {
			const tableName = Attachment.getTableName();
			const attachmentsSql = sequelize.dialect.QueryGenerator.selectQuery(
				tableName,
				{
					attributes: Object.entries(Attachment.rawAttributes).map(([key, attr]) => [
						attr.field,
						key
					]),
					...options
				},
				Attachment
			);
			const adviceAndAttachmentsSql = attachmentsJoin(attachmentsSql);

			return sequelize.query(adviceAndAttachmentsSql, {
				model: Attachment,
				mapToModel: true
			});
		}
	}

	Attachment.init(
		{
			adviceID: {
				type: DataTypes.STRING,
				field: 'AdviceID'
			},
			documentDataID: {
				type: DataTypes.STRING,
				field: 'dataId'
			},
			documentURI: {
				type: DataTypes.STRING,
				field: 'path'
			},
			mime: DataTypes.STRING,
			size: DataTypes.STRING
		},
		{
			sequelize,
			modelName: 'Attachment',
			tableName: 'wp_ipc_documents_api',
			timestamps: false
		}
	);

	return Attachment;
};

// This SQL manipulation allows Sequelize to be used with the non-normalised join of Advice to attachments
function attachmentsJoin(sql) {
	return sql.replace(
		'FROM `wp_ipc_documents_api` AS `Attachment`',
		`FROM (
			SELECT DISTINCT Attachment.*, Advice.AdviceID
			FROM wp_ipc_advice AS Advice 
			INNER JOIN wp_ipc_documents_api AS Attachment
			ON Advice.Attachments LIKE CONCAT('%', Attachment.dataID, '%')
		) as Attachment`
	);
}
