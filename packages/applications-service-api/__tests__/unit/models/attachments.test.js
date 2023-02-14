const Sequelize = require('sequelize');

const config = require(`../../../src/database/config/config`);
const attachment = require('../../../src/models/attachment');

describe('attachment Model', () => {
	const sequelize = new Sequelize(config.database, '', '', config);
	sequelize.query = jest.fn().mockResolvedValue([]);

	const Attachment = attachment(sequelize, Sequelize.DataTypes);

	describe('findandCountAllWithAttachments', () => {
		afterEach(() => {
			jest.resetAllMocks();
		});

		it('executes the correct SQL for default options', async () => {
			await Attachment.findAllAttachments();

			expect(normaliseWhitespace(sequelize.query.mock.calls[0][0])).toEqual(
				normaliseWhitespace(
					"SELECT `AdviceID` AS `adviceID`, `dataId` AS `documentDataID`, `path` AS `documentURI`, `mime` AS `mime`, `size` AS `size` FROM ( SELECT DISTINCT Attachment.*, Advice.AdviceID FROM wp_ipc_advice AS Advice INNER JOIN wp_ipc_documents_api AS Attachment ON Advice.Attachments LIKE CONCAT('%', Attachment.dataID, '%') ) as Attachment;"
				)
			);
		});

		it('executes the correct SQL with caseReference', async () => {
			await Attachment.findAllAttachments({
				where: {
					adviceID: {
						[Sequelize.Op.or]: ['1234', '5678']
					}
				}
			});

			expect(normaliseWhitespace(sequelize.query.mock.calls[0][0])).toEqual(
				normaliseWhitespace(
					"SELECT `AdviceID` AS `adviceID`, `dataId` AS `documentDataID`, `path` AS `documentURI`, `mime` AS `mime`, `size` AS `size` FROM ( SELECT DISTINCT Attachment.*, Advice.AdviceID FROM wp_ipc_advice AS Advice INNER JOIN wp_ipc_documents_api AS Attachment ON Advice.Attachments LIKE CONCAT('%', Attachment.dataID, '%') ) as Attachment WHERE (`Attachment`.`adviceID` = '1234' OR `Attachment`.`adviceID` = '5678');"
				)
			);
		});
	});
});

function normaliseWhitespace(text) {
	return text.replace(/\s\s+/g, ' ');
}
