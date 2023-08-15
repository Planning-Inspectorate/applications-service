BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Document] ADD [representationId] INT;

-- CreateIndex
CREATE NONCLUSTERED INDEX [Document_representationId_idx] ON [dbo].[Document]([representationId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
