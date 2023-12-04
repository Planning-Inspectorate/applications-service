/*
  Warnings:

  - The primary key for the `ServiceUser` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - You are about to drop the column `middleName` on the `ServiceUser` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[ServiceUser] DROP CONSTRAINT [ServiceUser_pkey];
ALTER TABLE [dbo].[ServiceUser] ALTER COLUMN [serviceUserId] NVARCHAR(1000) NOT NULL;
ALTER TABLE [dbo].[ServiceUser] DROP COLUMN [middleName];
ALTER TABLE [dbo].[ServiceUser] ADD CONSTRAINT ServiceUser_pkey PRIMARY KEY CLUSTERED ([serviceUserId]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
