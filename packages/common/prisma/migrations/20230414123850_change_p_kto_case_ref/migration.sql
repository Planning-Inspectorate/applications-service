/*
  Warnings:

  - The primary key for the `Project` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - A unique constraint covering the columns `[caseId]` on the table `Project` will be added. If there are existing duplicate values, this will fail.

*/
BEGIN TRY

BEGIN TRAN;

-- DropIndex
ALTER TABLE [dbo].[Project] DROP CONSTRAINT [Project_caseReference_key];

-- AlterTable
ALTER TABLE [dbo].[Project] DROP CONSTRAINT [Project_pkey];
ALTER TABLE [dbo].[Project] ADD CONSTRAINT Project_pkey PRIMARY KEY CLUSTERED ([caseReference]);

-- CreateIndex
ALTER TABLE [dbo].[Project] ADD CONSTRAINT [Project_caseId_key] UNIQUE NONCLUSTERED ([caseId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
