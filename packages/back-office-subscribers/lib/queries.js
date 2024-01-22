const serviceUserQuery = `
		MERGE INTO [dbo].[serviceUser] AS Target 
		USING (SELECT @P1 AS serviceUserId) AS Source
		ON Target.[serviceUserId] = Source.[serviceUserId]
		WHEN MATCHED THEN UPDATE SET Target.[serviceUserId] = Source.[serviceUserId]
		WHEN NOT MATCHED THEN INSERT ([serviceUserId]) VALUES (@P1);`;

module.exports = { serviceUserQuery };
