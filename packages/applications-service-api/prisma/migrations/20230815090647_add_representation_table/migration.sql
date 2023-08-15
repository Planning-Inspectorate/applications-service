BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Representation] (
    [id] INT NOT NULL IDENTITY(1,1),
    [representationId] INT NOT NULL,
    [caseReference] NVARCHAR(1000) NOT NULL,
    [caseId] INT NOT NULL,
    [referenceId] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    [dateReceived] DATETIME2,
    [originalRepresentation] NTEXT NOT NULL,
    [redacted] BIT NOT NULL CONSTRAINT [Representation_redacted_df] DEFAULT 0,
    [redactedRepresentation] NTEXT,
    [redactedBy] NVARCHAR(1000),
    [redactedNotes] NTEXT,
    [representationFrom] NVARCHAR(1000),
    [representationType] NVARCHAR(1000),
    [registerFor] NVARCHAR(1000),
    [representedFirstName] NVARCHAR(1000),
    [representedLastName] NVARCHAR(1000),
    [representedUnder18] BIT,
    [representedJobTitle] NVARCHAR(1000),
    [representedOrganisationName] NVARCHAR(1000),
    [representedContactMethod] NVARCHAR(1000),
    [representedEmailAddress] NVARCHAR(1000),
    [representedTelephone] NVARCHAR(1000),
    [representedAddressLine1] NVARCHAR(1000),
    [representedAddressLine2] NVARCHAR(1000),
    [representedTown] NVARCHAR(1000),
    [representedPostcode] NVARCHAR(1000),
    [representativeFirstName] NVARCHAR(1000),
    [representativeLastName] NVARCHAR(1000),
    [representativeUnder18] BIT,
    [representativeOrganisationName] NVARCHAR(1000),
    [representativeContactMethod] NVARCHAR(1000),
    [representativeEmailAddress] NVARCHAR(1000),
    [representativeTelephone] NVARCHAR(1000),
    [representativeAddressLine1] NVARCHAR(1000),
    [representativeAddressLine2] NVARCHAR(1000),
    [representativeTown] NVARCHAR(1000),
    [representativePostcode] NVARCHAR(1000),
    [hasAttachments] BIT,
    [createdAt] DATETIME2 CONSTRAINT [Representation_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedAt] DATETIME2 CONSTRAINT [Representation_modifiedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Representation_pkey] PRIMARY KEY CLUSTERED ([representationId]),
    CONSTRAINT [Representation_id_key] UNIQUE NONCLUSTERED ([id])
);

-- CreateIndex
CREATE NONCLUSTERED INDEX [Representation_caseReference_idx] ON [dbo].[Representation]([caseReference]);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
