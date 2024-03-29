BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Document] DROP CONSTRAINT [Document_documentId_key];

-- AlterTable
ALTER TABLE [dbo].[Document] ADD CONSTRAINT Document_pkey PRIMARY KEY CLUSTERED ([documentId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
