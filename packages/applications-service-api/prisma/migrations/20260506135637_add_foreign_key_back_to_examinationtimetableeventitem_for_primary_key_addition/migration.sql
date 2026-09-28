BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ExaminationTimetable] ADD CONSTRAINT ExaminationTimetable_pkey PRIMARY KEY CLUSTERED ([eventId]);

-- DropIndex
ALTER TABLE [dbo].[ExaminationTimetable] DROP CONSTRAINT [ExaminationTimetable_eventId_key];

-- AddForeignKey
ALTER TABLE [dbo].[ExaminationTimetableEventItem] ADD CONSTRAINT [ExaminationTimetableEventItem_eventId_fkey] FOREIGN KEY ([eventId]) REFERENCES [dbo].[ExaminationTimetable]([eventId]) ON DELETE CASCADE ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
