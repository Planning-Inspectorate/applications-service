BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ExaminationTimetable] ADD [descriptionWelsh] NVARCHAR(1000),
[eventTitleWelsh] NVARCHAR(1000);

-- AlterTable
ALTER TABLE [dbo].[ExaminationTimetableEventItem] ADD [eventLineItemDescriptionWelsh] NTEXT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
