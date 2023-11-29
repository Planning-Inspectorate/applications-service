/*
  Warnings:

  - You are about to drop the column `hasAttachments` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `originalRepresentation` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `redactedBy` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `redactedNotes` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `redactedRepresentation` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeAddressLine1` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeAddressLine2` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeContactMethod` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeEmailAddress` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeFirstName` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeLastName` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeOrganisationName` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativePostcode` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeTelephone` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeTown` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representativeUnder18` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedAddressLine1` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedAddressLine2` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedContactMethod` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedEmailAddress` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedFirstName` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedJobTitle` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedLastName` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedOrganisationName` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedPostcode` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedTelephone` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedTown` on the `Representation` table. All the data in the column will be lost.
  - You are about to drop the column `representedUnder18` on the `Representation` table. All the data in the column will be lost.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Representation] DROP CONSTRAINT [Representation_redacted_df];
ALTER TABLE [dbo].[Representation] DROP COLUMN [hasAttachments],
[originalRepresentation],
[redactedBy],
[redactedNotes],
[redactedRepresentation],
[representativeAddressLine1],
[representativeAddressLine2],
[representativeContactMethod],
[representativeEmailAddress],
[representativeFirstName],
[representativeLastName],
[representativeOrganisationName],
[representativePostcode],
[representativeTelephone],
[representativeTown],
[representativeUnder18],
[representedAddressLine1],
[representedAddressLine2],
[representedContactMethod],
[representedEmailAddress],
[representedFirstName],
[representedJobTitle],
[representedLastName],
[representedOrganisationName],
[representedPostcode],
[representedTelephone],
[representedTown],
[representedUnder18];
ALTER TABLE [dbo].[Representation] ADD [attachmentIds] NVARCHAR(1000),
[representationComment] NTEXT,
[representativeId] INT,
[representedId] INT;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
