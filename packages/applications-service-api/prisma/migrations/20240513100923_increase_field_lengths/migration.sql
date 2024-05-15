/*
  Warnings:

  - You are about to alter the column `projectDescription` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `VarChar(2000)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ExaminationTimetableEventItem] ALTER COLUMN [eventLineItemDescription] NTEXT NOT NULL;

-- AlterTable
ALTER TABLE [dbo].[Project] ALTER COLUMN [projectDescription] VARCHAR(2000) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
