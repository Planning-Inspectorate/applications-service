/*
  Warnings:

  - You are about to drop the column `regions` on the `Project` table. All the data in the column will be lost.
  - You are about to alter the column `dateProjectAppearsOnWebsite` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `dateOfDCOAcceptance` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `anticipatedDateOfSubmission` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `dateOfDCOSubmission` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `dateOfRepresentationPeriodOpen` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `dateOfRelevantRepresentationClose` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `dateRRepAppearOnWebsite` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `confirmedStartOfExamination` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `dateTimeExaminationEnds` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `stage4ExtensionToExamCloseDate` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `stage5ExtensionToRecommendationDeadline` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `dateOfRecommendations` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `confirmedDateOfDecision` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `stage5ExtensionToDecisionDeadline` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `dateProjectWithdrawn` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `section46Notification` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `datePINSFirstNotifiedOfProject` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `screeningOpinionSought` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `screeningOpinionIssued` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `scopingOpinionSought` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `scopingOpinionIssued` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `deadlineForAcceptanceDecision` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `dateSection58NoticeReceived` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `preliminaryMeetingStartDate` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `deadlineForCloseOfExamination` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `deadlineForSubmissionOfRecommendation` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `deadlineForDecision` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `jRPeriodEndDate` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.
  - You are about to alter the column `extensionToDateRelevantRepresentationsClose` on the `Project` table. The data in that column could be lost. The data in that column will be cast from `DateTime2` to `Date`.

*/
BEGIN TRY

BEGIN TRAN;

-- AlterTable
ALTER TABLE [dbo].[Project] ALTER COLUMN [sourceSystem] NVARCHAR(1000) NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateProjectAppearsOnWebsite] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateOfDCOAcceptance] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [anticipatedDateOfSubmission] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateOfDCOSubmission] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateOfRepresentationPeriodOpen] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateOfRelevantRepresentationClose] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateRRepAppearOnWebsite] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [confirmedStartOfExamination] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateTimeExaminationEnds] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [stage4ExtensionToExamCloseDate] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [stage5ExtensionToRecommendationDeadline] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateOfRecommendations] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [confirmedDateOfDecision] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [stage5ExtensionToDecisionDeadline] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateProjectWithdrawn] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [section46Notification] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [datePINSFirstNotifiedOfProject] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [screeningOpinionSought] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [screeningOpinionIssued] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [scopingOpinionSought] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [scopingOpinionIssued] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [deadlineForAcceptanceDecision] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [dateSection58NoticeReceived] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [preliminaryMeetingStartDate] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [deadlineForCloseOfExamination] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [deadlineForSubmissionOfRecommendation] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [deadlineForDecision] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [jRPeriodEndDate] DATE NULL;
ALTER TABLE [dbo].[Project] ALTER COLUMN [extensionToDateRelevantRepresentationsClose] DATE NULL;
ALTER TABLE [dbo].[Project] DROP COLUMN [regions];
ALTER TABLE [dbo].[Project] ADD [dateIAPIDue] DATE,
[dateOfNonAcceptance] DATE,
[notificationDateForEventsDeveloper] DATE,
[notificationDateForPMAndEventsDirectlyFollowingPM] DATE,
[rule6LetterPublishDate] DATE,
[rule8LetterPublishDate] DATE;

-- CreateTable
CREATE TABLE [dbo].[ProjectRegion] (
    [projectCaseId] INT NOT NULL,
    [region] NVARCHAR(1000) NOT NULL,
    CONSTRAINT [ProjectRegion_pkey] PRIMARY KEY CLUSTERED ([projectCaseId],[region])
);

-- AddForeignKey
ALTER TABLE [dbo].[ProjectRegion] ADD CONSTRAINT [ProjectRegion_projectCaseId_fkey] FOREIGN KEY ([projectCaseId]) REFERENCES [dbo].[Project]([caseId]) ON DELETE NO ACTION ON UPDATE CASCADE;

COMMIT TRAN;

END TRY
BEGIN CATCH

IF @@TRANCOUNT > 0
BEGIN
    ROLLBACK TRAN;
END;
THROW

END CATCH
