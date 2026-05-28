// Static date set for modifiedAt to avoid a race condition as the buildMergeQuery function checks this field

const serviceUserQuery = `
		MERGE INTO [dbo].[serviceUser] AS Target
		USING (SELECT @P1 AS serviceUserId) AS Source
		ON Target.[serviceUserId] = Source.[serviceUserId]
		WHEN MATCHED THEN UPDATE SET Target.[serviceUserId] = Source.[serviceUserId]
		WHEN NOT MATCHED THEN INSERT ([serviceUserId], [modifiedAt]) VALUES (@P1, '1900-01-01 12:00:00');`;

module.exports = { serviceUserQuery };
