BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[ProjectUpdate] (
    [id] INT NOT NULL IDENTITY(1,1),
    [projectUpdateId] INT NOT NULL,
    [caseReference] NVARCHAR(1000) NOT NULL,
    [updateDate] NVARCHAR(1000) NOT NULL,
    [updateName] NVARCHAR(1000),
    [updateContentEnglish] NVARCHAR(1000) NOT NULL,
    [updateContentWelsh] NVARCHAR(1000),
    [updateStatus] NVARCHAR(1000) NOT NULL,
    [createdAt] DATETIME2 CONSTRAINT [ProjectUpdate_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedAt] DATETIME2 CONSTRAINT [ProjectUpdate_modifiedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ProjectUpdate_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [ProjectUpdate_projectUpdateId_key] UNIQUE NONCLUSTERED ([projectUpdateId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ProjectUpdate_caseReference_idx] ON [dbo].[ProjectUpdate]([caseReference]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
