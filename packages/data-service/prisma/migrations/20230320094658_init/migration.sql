BEGIN TRY

BEGIN TRAN;

-- CreateTable
CREATE TABLE [dbo].[Project] (
    [id] INT NOT NULL IDENTITY(1,1),
    [caseReference] NVARCHAR(1000),
    [projectName] NVARCHAR(1000),
    [projectDescription] NVARCHAR(1000),
    [publishStatus] NVARCHAR(1000),
    [sector] NVARCHAR(1000),
    [projectType] NVARCHAR(1000),
    [sourceSystem] NVARCHAR(1000) NOT NULL,
    [stage] NVARCHAR(1000),
    [projectLocation] NVARCHAR(1000),
    [projectEmailAddress] NVARCHAR(1000),
    [regions] NVARCHAR(1000),
    [transboundary] BIT,
    [easting] INT,
    [northing] INT,
    [welshLanguage] BIT,
    [mapZoomLevel] NVARCHAR(1000),
    [secretaryOfState] NVARCHAR(1000),
    [dateProjectAppearsOnWebsite] DATETIME2,
    [dateOfDCOAcceptance] DATETIME2,
    [anticipatedDateOfSubmission] DATETIME2,
    [anticipatedSubmissionDateNonSpecific] NVARCHAR(1000),
    [dateOfDCOSubmission] DATETIME2,
    [dateOfRepresentationPeriodOpen] DATETIME2,
    [dateOfRelevantRepresentationClose] DATETIME2,
    [dateRRepAppearOnWebsite] DATETIME2,
    [confirmedStartOfExamination] DATETIME2,
    [dateTimeExaminationEnds] DATETIME2,
    [stage4ExtensionToExamCloseDate] DATETIME2,
    [stage5ExtensionToRecommendationDeadline] DATETIME2,
    [dateOfRecommendations] DATETIME2,
    [confirmedDateOfDecision] DATETIME2,
    [stage5ExtensionToDecisionDeadline] DATETIME2,
    [dateProjectWithdrawn] DATETIME2,
    [section46Notification] DATETIME2,
    [datePINSFirstNotifiedOfProject] DATETIME2,
    [screeningOpinionSought] DATETIME2,
    [screeningOpinionIssued] DATETIME2,
    [scopingOpinionSought] DATETIME2,
    [scopingOpinionIssued] DATETIME2,
    [deadlineForAcceptanceDecision] DATETIME2,
    [dateSection58NoticeReceived] DATETIME2,
    [preliminaryMeetingStartDate] DATETIME2,
    [deadlineForCloseOfExamination] DATETIME2,
    [deadlineForSubmissionOfRecommendation] DATETIME2,
    [deadlineForDecision] DATETIME2,
    [jRPeriodEndDate] DATETIME2,
    [extensionToDateRelevantRepresentationsClose] DATETIME2,
    [examinationTimetableId] INT,
    [createdAt] DATETIME2 CONSTRAINT [Project_createdAt_df] DEFAULT CURRENT_TIMESTAMP,
    [modifiedAt] DATETIME2 CONSTRAINT [Project_modifiedAt_df] DEFAULT CURRENT_TIMESTAMP,
    CONSTRAINT [Project_pkey] PRIMARY KEY CLUSTERED ([id])
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
