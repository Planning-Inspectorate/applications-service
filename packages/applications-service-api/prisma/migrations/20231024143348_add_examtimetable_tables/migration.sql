BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[ExaminationTimetable] (
    [eventId] INT NOT NULL,
    [examinationTimetableId] INT NOT NULL,
    [caseReference] NVARCHAR(1000) NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [eventTitle] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [eventDeadlineStartDate] DATETIME2,
    [date] DATETIME2,
    [createdAt] DATETIME2 CONSTRAINT [ExaminationTimetable_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedAt] DATETIME2 CONSTRAINT [ExaminationTimetable_modifiedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [ExaminationTimetable_eventId_key] UNIQUE NONCLUSTERED ([eventId])
);

-- CreateTable
CREATE TABLE [dbo].[ExaminationTimetableEventItem] (
    [eventLineItemId] INT NOT NULL IDENTITY(1,1),
    [eventLineItemDescription] NVARCHAR(1000) NOT NULL,
    [eventId] INT NOT NULL,
    CONSTRAINT [ExaminationTimetableEventItem_eventLineItemId_key] UNIQUE NONCLUSTERED ([eventLineItemId])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [ExaminationTimetable_caseReference_idx] ON [dbo].[ExaminationTimetable]([caseReference]);

-- AddForeignKey
ALTER TABLE [dbo].[ExaminationTimetableEventItem] ADD CONSTRAINT [ExaminationTimetableEventItem_eventId_fkey] FOREIGN KEY ([eventId]) REFERENCES [dbo].[ExaminationTimetable]([eventId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
