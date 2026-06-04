BEGIN TRY

BEGIN TRAN;

-- DropForeignKey
ALTER TABLE [dbo].[ExaminationTimetableEventItem] DROP CONSTRAINT [ExaminationTimetableEventItem_eventId_fkey];

-- DropIndex
DROP INDEX [Document_representationId_idx] ON [dbo].[Document];

-- AlterTable
ALTER TABLE [dbo].[Advice] ADD CONSTRAINT Advice_pkey PRIMARY KEY CLUSTERED ([adviceId]);

-- DropIndex
ALTER TABLE [dbo].[Advice] DROP CONSTRAINT [Advice_adviceId_key];

-- AlterTable
ALTER TABLE [dbo].[ExaminationTimetableEventItem] ADD CONSTRAINT ExaminationTimetableEventItem_pkey PRIMARY KEY CLUSTERED ([id]);

-- DropIndex
ALTER TABLE [dbo].[ExaminationTimetableEventItem] DROP CONSTRAINT [ExaminationTimetableEventItem_id_key];

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
