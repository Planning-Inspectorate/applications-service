/*
  Warnings:

  - You are about to drop the column `path` on the `Document` table. All the data in the column will be lost.
  - You are about to alter the column `version` on the `Document` table. The data in that column could be lost. The data in that column will be cast from `NVarChar(1000)` to `Int`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Document] ALTER COLUMN [version] INT NULL;
ALTER TABLE [dbo].[Document] DROP COLUMN [path];
ALTER TABLE [dbo].[Document] ADD [caseId] INT,
[publishedDocumentURI] NVARCHAR(1000);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
