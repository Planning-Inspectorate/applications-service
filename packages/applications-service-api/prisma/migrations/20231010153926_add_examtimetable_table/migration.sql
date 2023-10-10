BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[ExaminationTimetable] (
    [examinationTimetableId] INT NOT NULL IDENTITY(1,1),
    [caseReference] NVARCHAR(1000) NOT NULL,
    [eventId] INT NOT NULL,
    [type] NVARCHAR(1000) NOT NULL,
    [eventTitle] NVARCHAR(1000) NOT NULL,
    [description] NVARCHAR(1000) NOT NULL,
    [eventDeadlineStartDate] DATETIME2,
    [date] DATETIME2,
    CONSTRAINT [ExaminationTimetable_pkey] PRIMARY KEY CLUSTERED ([eventId]),
    CONSTRAINT [ExaminationTimetable_examinationTimetableId_key] UNIQUE NONCLUSTERED ([examinationTimetableId])
);

-- CreateTable
CREATE TABLE [dbo].[ExaminationTimetableEventItem] (
    [eventLineItemId] INT NOT NULL IDENTITY(1,1),
    [eventId] INT NOT NULL,
    [eventLineItemDescription] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ExaminationTimetableEventItem_pkey] PRIMARY KEY CLUSTERED ([eventId]),
    CONSTRAINT [ExaminationTimetableEventItem_eventLineItemId_key] UNIQUE NONCLUSTERED ([eventLineItemId])
);

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
