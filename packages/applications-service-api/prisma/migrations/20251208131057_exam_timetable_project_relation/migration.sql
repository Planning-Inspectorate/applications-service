BEGIN TRY

BEGIN TRAN;

-- AddForeignKey
ALTER TABLE [dbo].[ExaminationTimetable] ADD CONSTRAINT [ExaminationTimetable_caseReference_fkey] FOREIGN KEY ([caseReference]) REFERENCES [dbo].[Project]([caseReference]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
