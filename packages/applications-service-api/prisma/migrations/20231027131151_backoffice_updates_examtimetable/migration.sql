/*
  Warnings:

  - You are about to drop the column `examinationTimetableId` on the `ExaminationTimetable` table. All the data in the column will be lost.
  - You are about to drop the column `eventLineItemId` on the `ExaminationTimetableEventItem` table. All the data in the column will be lost.
  - A unique constraint covering the columns `[id]` on the table `ExaminationTimetableEventItem` will be added. If there are existing duplicate values, this will fail.
  - Added the required column `id` to the `ExaminationTimetableEventItem` table without a default value. This is not possible if the table is not empty.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[ExaminationTimetableEventItem] DROP CONSTRAINT [ExaminationTimetableEventItem_eventLineItemId_key];

-- AlterTable
ALTER TABLE [dbo].[ExaminationTimetable] DROP COLUMN [examinationTimetableId];

-- AlterTable
ALTER TABLE [dbo].[ExaminationTimetableEventItem] DROP COLUMN [eventLineItemId];
ALTER TABLE [dbo].[ExaminationTimetableEventItem] ADD [id] INT NOT NULL IDENTITY(1,1);

-- CreateIndex
ALTER TABLE [dbo].[ExaminationTimetableEventItem] ADD CONSTRAINT [ExaminationTimetableEventItem_id_key] UNIQUE NONCLUSTERED ([id]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
