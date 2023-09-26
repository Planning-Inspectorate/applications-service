BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[ProjectUpdate] DROP CONSTRAINT [ProjectUpdate_projectUpdateId_key];

-- AlterTable
ALTER TABLE [dbo].[ProjectUpdate] ADD CONSTRAINT ProjectUpdate_pkey PRIMARY KEY CLUSTERED ([projectUpdateId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
