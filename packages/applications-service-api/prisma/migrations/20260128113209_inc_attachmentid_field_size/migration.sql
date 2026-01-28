/*
  Warnings:

  - You are about to alter the column `attachmentIds` on the `Advice` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `VarChar(2000)`.
  - You are about to alter the column `attachmentIds` on the `Representation` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `VarChar(2000)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Advice] ALTER COLUMN [attachmentIds] VARCHAR(2000) NULL;

-- AlterTable
ALTER TABLE [dbo].[Representation] ALTER COLUMN [attachmentIds] VARCHAR(2000) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
