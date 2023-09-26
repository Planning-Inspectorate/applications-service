BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Document] (
    [id] INT NOT NULL IDENTITY(1,1),
    [documentId] NVARCHAR(1000) NOT NULL,
    [caseRef] NVARCHAR(1000),
    [documentReference] NVARCHAR(1000),
    [version] NVARCHAR(1000) NOT NULL,
    [examinationRefNo] NVARCHAR(1000),
    [filename] NVARCHAR(1000) NOT NULL,
    [originalFilename] NVARCHAR(1000) NOT NULL,
    [size] INT NOT NULL,
    [mime] NVARCHAR(1000),
    [documentURI] NVARCHAR(1000) NOT NULL,
    [path] NVARCHAR(1000),
    [virusCheckStatus] NVARCHAR(1000),
    [fileMD5] NVARCHAR(1000),
    [dateCreated] NVARCHAR(1000) NOT NULL,
    [lastModified] NVARCHAR(1000),
    [caseType] NVARCHAR(1000),
    [documentStatus] NVARCHAR(1000),
    [redactedStatus] NVARCHAR(1000),
    [publishedStatus] NVARCHAR(1000),
    [datePublished] NVARCHAR(1000),
    [documentType] NVARCHAR(1000),
    [securityClassification] NVARCHAR(1000),
    [sourceSystem] NVARCHAR(1000),
    [origin] NVARCHAR(1000),
    [owner] NVARCHAR(1000),
    [author] NVARCHAR(1000),
    [representative] NVARCHAR(1000),
    [description] NVARCHAR(1000),
    [stage] NVARCHAR(1000),
    [filter1] NVARCHAR(1000),
    [filter2] NVARCHAR(1000),
    CONSTRAINT [Document_id_key] UNIQUE NONCLUSTERED ([id]),
    CONSTRAINT [Document_documentId_key] UNIQUE NONCLUSTERED ([documentId])
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
