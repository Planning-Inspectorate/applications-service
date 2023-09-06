/*
  Warnings:

  - You are about to alter the column `originalRepresentation` on the `Representation` table. The data in that column could be lost. The data in that column will be cast from `NText` to `NVarChar(4000)`.
  - You are about to alter the column `redactedRepresentation` on the `Representation` table. The data in that column could be lost. The data in that column will be cast from `NText` to `NVarChar(4000)`.
  - You are about to alter the column `redactedNotes` on the `Representation` table. The data in that column could be lost. The data in that column will be cast from `NText` to `NVarChar(4000)`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Representation] ALTER COLUMN [originalRepresentation] NVARCHAR(4000) NOT NULL;
ALTER TABLE [dbo].[Representation] ALTER COLUMN [redactedRepresentation] NVARCHAR(4000) NULL;
ALTER TABLE [dbo].[Representation] ALTER COLUMN [redactedNotes] NVARCHAR(4000) NULL;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
