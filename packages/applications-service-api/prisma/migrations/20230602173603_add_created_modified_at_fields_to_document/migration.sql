BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Document] ADD [createdAt] DATETIME2 CONSTRAINT [Document_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
[modifiedAt] DATETIME2 CONSTRAINT [Document_modifiedAt_df] DEFAULT CURRENT_TIMESTAMP;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
