/*
  Warnings:

  - The primary key for the `ExaminationTimetable` table will be changed. If it partially fails, the table could be left without primary key constraint.

*/
BEGIN TRY

BEGIN TRAN;

-- RedefineTables
BEGIN TRANSACTION;
ALTER TABLE [dbo].[ExaminationTimetableEventItem] DROP CONSTRAINT [ExaminationTimetableEventItem_eventLineItemId_key];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'ExaminationTimetableEventItem'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_ExaminationTimetableEventItem] (
    [eventLineItemId] INT NOT NULL,
    [eventLineItemDescription] NVARCHAR(1000) NOT NULL,
    [eventId] INT NOT NULL,
    CONSTRAINT [ExaminationTimetableEventItem_eventLineItemId_key] UNIQUE NONCLUSTERED ([eventLineItemId])
);
IF EXISTS(SELECT * FROM [dbo].[ExaminationTimetableEventItem])
    EXEC('INSERT INTO [dbo].[_prisma_new_ExaminationTimetableEventItem] ([eventId],[eventLineItemDescription],[eventLineItemId]) SELECT [eventId],[eventLineItemDescription],[eventLineItemId] FROM [dbo].[ExaminationTimetableEventItem] WITH (holdlock tablockx)');
DROP TABLE [dbo].[ExaminationTimetableEventItem];
EXEC SP_RENAME N'dbo._prisma_new_ExaminationTimetableEventItem', N'ExaminationTimetableEventItem';
DROP INDEX [ExaminationTimetable_caseReference_idx] ON [dbo].[ExaminationTimetable];
ALTER TABLE [dbo].[ExaminationTimetable] DROP CONSTRAINT [ExaminationTimetable_examinationTimetableId_key];
DECLARE @SQL NVARCHAR(MAX) = N''
SELECT @SQL += N'ALTER TABLE '
    + QUOTENAME(OBJECT_SCHEMA_NAME(PARENT_OBJECT_ID))
    + '.'
    + QUOTENAME(OBJECT_NAME(PARENT_OBJECT_ID))
    + ' DROP CONSTRAINT '
    + OBJECT_NAME(OBJECT_ID) + ';'
FROM SYS.OBJECTS
WHERE TYPE_DESC LIKE '%CONSTRAINT'
    AND OBJECT_NAME(PARENT_OBJECT_ID) = 'ExaminationTimetable'
    AND SCHEMA_NAME(SCHEMA_ID) = 'dbo'
EXEC sp_executesql @SQL
;
CREATE TABLE [dbo].[_prisma_new_ExaminationTimetable] (
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
IF EXISTS(SELECT * FROM [dbo].[ExaminationTimetable])
    EXEC('INSERT INTO [dbo].[_prisma_new_ExaminationTimetable] ([caseReference],[date],[description],[eventDeadlineStartDate],[eventId],[eventTitle],[examinationTimetableId],[type]) SELECT [caseReference],[date],[description],[eventDeadlineStartDate],[eventId],[eventTitle],[examinationTimetableId],[type] FROM [dbo].[ExaminationTimetable] WITH (holdlock tablockx)');
DROP TABLE [dbo].[ExaminationTimetable];
EXEC SP_RENAME N'dbo._prisma_new_ExaminationTimetable', N'ExaminationTimetable';
CREATE NONCLUSTERED INDEX [ExaminationTimetable_caseReference_idx] ON [dbo].[ExaminationTimetable]([caseReference]);
COMMIT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
