BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[ServiceUser] (
    [id] INT NOT NULL IDENTITY(1,1),
    [serviceUserId] INT NOT NULL,
    [caseReference] NVARCHAR(1000),
    [firstName] NVARCHAR(1000),
    [middleName] NVARCHAR(1000),
    [lastName] NVARCHAR(1000),
    [email] NVARCHAR(1000),
    [webAddress] NVARCHAR(1000),
    [phoneNumber] NVARCHAR(1000),
    [organisationName] NVARCHAR(1000),
    [organisationType] NVARCHAR(1000),
    [role] NVARCHAR(1000),
    [serviceUserType] NVARCHAR(1000),
    [createdAt] DATETIME2 CONSTRAINT [ServiceUser_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedAt] DATETIME2 CONSTRAINT [ServiceUser_modifiedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ServiceUser_pkey] PRIMARY KEY CLUSTERED ([serviceUserId]),
    CONSTRAINT [ServiceUser_id_key] UNIQUE NONCLUSTERED ([id])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
