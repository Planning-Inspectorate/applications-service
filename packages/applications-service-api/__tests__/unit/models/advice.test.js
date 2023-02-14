const Sequelize = require('sequelize');

const config = require(`../../../src/database/config/config`);
const advice = require('../../../src/models/advice');

describe('Advice Model', () => {
	const sequelize = new Sequelize(config.database, '', '', config);
	sequelize.query = jest.fn().mockResolvedValue([]);

	const Advice = advice(sequelize, Sequelize.DataTypes);

	describe('findandCountAllWithAttachments', () => {
		afterEach(() => {
			jest.resetAllMocks();
		});

		it('executes the correct SQL for default options', async () => {
			await Advice.findandCountAllWithAttachments();

			expect(normaliseWhitespace(sequelize.query.mock.calls[0][0])).toEqual(
				normaliseWhitespace(
					"SELECT COUNT(*) AS `count` FROM ( SELECT DISTINCT Advice.* FROM wp_ipc_advice AS Advice INNER JOIN wp_ipc_documents_api AS Attachment ON Advice.Attachments LIKE CONCAT('%', Attachment.dataID, '%') ) as Advice;"
				)
			);

			expect(normaliseWhitespace(sequelize.query.mock.calls[1][0])).toEqual(
				normaliseWhitespace(
					"SELECT `AdviceID` AS `adviceID`, `EnquiryDate` AS `enquiryDate`, `EnquiryMethod` AS `enquiryMethod`, `IndustrySector` AS `industrySector`, `CaseReference` AS `caseReference`, `EnqFirstName` AS `firstName`, `EnqLastName` AS `lastName`, `EnquiryOrganisation` AS `organisation`, `EnquiryDetail` AS `enquiryDetail`, `AdviceGiven` AS `adviceGiven`, `RespondedBy` AS `respondedBy`, `Section51Enquiry` AS `section51Enquiry`, `InitiatedDate` AS `initiatedDate`, `DateEnquiryReceived` AS `dateEnquiryReceived`, `DateAdviceGiven` AS `dateAdviceGiven`, `DateLastModified` AS `dateLastModified`, `DateCreated` AS `dateCreated` FROM ( SELECT DISTINCT Advice.* FROM wp_ipc_advice AS Advice INNER JOIN wp_ipc_documents_api AS Attachment ON Advice.Attachments LIKE CONCAT('%', Attachment.dataID, '%') ) as Advice;"
				)
			);
		});

		it('executes the correct SQL with ordering', async () => {
			await Advice.findandCountAllWithAttachments({
				where: {
					order: [['dateAdviceGiven', 'DESC'], ['adviceID']]
				}
			});

			expect(normaliseWhitespace(sequelize.query.mock.calls[0][0])).toEqual(
				normaliseWhitespace(
					"SELECT COUNT(*) AS `count` FROM ( SELECT DISTINCT Advice.* FROM wp_ipc_advice AS Advice INNER JOIN wp_ipc_documents_api AS Attachment ON Advice.Attachments LIKE CONCAT('%', Attachment.dataID, '%') ) as Advice WHERE `Advice`.`order` IN ('dateAdviceGiven', 'DESC', 'adviceID');"
				)
			);

			expect(normaliseWhitespace(sequelize.query.mock.calls[1][0])).toEqual(
				normaliseWhitespace(
					"SELECT `AdviceID` AS `adviceID`, `EnquiryDate` AS `enquiryDate`, `EnquiryMethod` AS `enquiryMethod`, `IndustrySector` AS `industrySector`, `CaseReference` AS `caseReference`, `EnqFirstName` AS `firstName`, `EnqLastName` AS `lastName`, `EnquiryOrganisation` AS `organisation`, `EnquiryDetail` AS `enquiryDetail`, `AdviceGiven` AS `adviceGiven`, `RespondedBy` AS `respondedBy`, `Section51Enquiry` AS `section51Enquiry`, `InitiatedDate` AS `initiatedDate`, `DateEnquiryReceived` AS `dateEnquiryReceived`, `DateAdviceGiven` AS `dateAdviceGiven`, `DateLastModified` AS `dateLastModified`, `DateCreated` AS `dateCreated` FROM ( SELECT DISTINCT Advice.* FROM wp_ipc_advice AS Advice INNER JOIN wp_ipc_documents_api AS Attachment ON Advice.Attachments LIKE CONCAT('%', Attachment.dataID, '%') ) as Advice WHERE `Advice`.`order` IN ('dateAdviceGiven', 'DESC', 'adviceID');"
				)
			);
		});

		it('executes the correct SQL with caseReference', async () => {
			await Advice.findandCountAllWithAttachments({
				where: {
					caseReference: 'IAMACASE'
				}
			});

			expect(normaliseWhitespace(sequelize.query.mock.calls[0][0])).toEqual(
				normaliseWhitespace(
					"SELECT COUNT(*) AS `count` FROM ( SELECT DISTINCT Advice.* FROM wp_ipc_advice AS Advice INNER JOIN wp_ipc_documents_api AS Attachment ON Advice.Attachments LIKE CONCAT('%', Attachment.dataID, '%') ) as Advice WHERE `Advice`.`caseReference` = 'IAMACASE';"
				)
			);

			expect(normaliseWhitespace(sequelize.query.mock.calls[1][0])).toEqual(
				normaliseWhitespace(
					"SELECT `AdviceID` AS `adviceID`, `EnquiryDate` AS `enquiryDate`, `EnquiryMethod` AS `enquiryMethod`, `IndustrySector` AS `industrySector`, `CaseReference` AS `caseReference`, `EnqFirstName` AS `firstName`, `EnqLastName` AS `lastName`, `EnquiryOrganisation` AS `organisation`, `EnquiryDetail` AS `enquiryDetail`, `AdviceGiven` AS `adviceGiven`, `RespondedBy` AS `respondedBy`, `Section51Enquiry` AS `section51Enquiry`, `InitiatedDate` AS `initiatedDate`, `DateEnquiryReceived` AS `dateEnquiryReceived`, `DateAdviceGiven` AS `dateAdviceGiven`, `DateLastModified` AS `dateLastModified`, `DateCreated` AS `dateCreated` FROM ( SELECT DISTINCT Advice.* FROM wp_ipc_advice AS Advice INNER JOIN wp_ipc_documents_api AS Attachment ON Advice.Attachments LIKE CONCAT('%', Attachment.dataID, '%') ) as Advice WHERE `Advice`.`caseReference` = 'IAMACASE';"
				)
			);
		});
	});
});

function normaliseWhitespace(text) {
	return text.replace(/\s\s+/g, ' ');
}
