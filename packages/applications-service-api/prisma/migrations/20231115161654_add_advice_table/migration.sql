BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Advice] (
    [adviceId] INT NOT NULL,
    [adviceReference] NVARCHAR(1000),
    [caseReference] NVARCHAR(1000),
    [caseId] INT NOT NULL,
    [title] NVARCHAR(1000),
    [from] NVARCHAR(1000),
    [agent] NVARCHAR(1000),
    [method] NVARCHAR(1000),
    [enquiryDate] DATETIME2 NOT NULL,
    [enquiryDetails] NVARCHAR(1000),
    [adviceGivenBy] NVARCHAR(1000),
    [adviceDate] DATETIME2 NOT NULL,
    [adviceDetails] NVARCHAR(1000),
    [status] NVARCHAR(1000),
    [redactionStatus] NVARCHAR(1000),
    [attachmentIds] NVARCHAR(1000),
    [createdAt] DATETIME2 CONSTRAINT [Advice_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedAt] DATETIME2 CONSTRAINT [Advice_modifiedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Advice_adviceId_key] UNIQUE NONCLUSTERED ([adviceId])
);

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
