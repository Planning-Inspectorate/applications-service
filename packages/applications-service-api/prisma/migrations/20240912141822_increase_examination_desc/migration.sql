BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Document] ALTER COLUMN [description] NTEXT NULL;
ALTER TABLE [dbo].[Document] ALTER COLUMN [descriptionWelsh] NTEXT NULL;

-- AlterTable
ALTER TABLE [dbo].[ExaminationTimetable] ALTER COLUMN [description] NTEXT NOT NULL;
ALTER TABLE [dbo].[ExaminationTimetable] ALTER COLUMN [descriptionWelsh] NTEXT NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
