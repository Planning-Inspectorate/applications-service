const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
	class Advice extends Model {}

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
			dateAdviceGiven: { type: DataTypes.DATEONLY, field: 'DateAdviceGiven' }

			//   dateLastModified:
			// 	type: string
			// 	format: date-time
			// 	example: '2016-04-28 08:42:58'
			//   dateCreated:
			// 	type: string
			// 	format: date-time
			// 	example: '2016-04-28 08:42:58'
			//   attachments:
			// 	type: array
			// 	items:
			// 	  $ref: '#/components/schemas/Attachment'
		},
		{
			sequelize,
			modelName: 'Advice',
			tableName: 'wp_ipc_advice'
		}
	);

	Advice.removeAttribute('createdAt');
	Advice.removeAttribute('updatedAt');

	return Advice;
};
