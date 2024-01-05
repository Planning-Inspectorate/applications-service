BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Project] ADD [applicantId] NVARCHAR(1000);

-- AddForeignKey
ALTER TABLE [dbo].[Project] ADD CONSTRAINT [Project_applicantId_fkey] FOREIGN KEY ([applicantId]) REFERENCES [dbo].[ServiceUser]([serviceUserId]) ON DELETE NO ACTION ON UPDATE NO ACTION;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
