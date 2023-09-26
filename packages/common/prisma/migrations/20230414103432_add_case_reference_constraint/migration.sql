/*
  Warnings:

  - A unique constraint covering the columns `[caseReference]` on the table `Project` will be added. If there are existing duplicate values, this will fail.
  - Made the column `caseReference` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Project] ALTER COLUMN [caseReference] NVARCHAR(1000) NOT NULL;

-- CreateIndex
ALTER TABLE [dbo].[Project] ADD CONSTRAINT [Project_caseReference_key] UNIQUE NONCLUSTERED ([caseReference]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
