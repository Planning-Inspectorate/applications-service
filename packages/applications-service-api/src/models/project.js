const { Model } = require('sequelize');

module.exports = (sequelize, DataTypes) => {
  class Project extends Model {}
  Project.init(
    {
      CaseReference: DataTypes.STRING,
      ProjectName: DataTypes.TEXT,
      Proposal: DataTypes.TEXT,
      Stage: DataTypes.TINYINT,
      PromoterName: DataTypes.TEXT,
      PromoterFirstName: DataTypes.TEXT,
      PromoterLastName: DataTypes.TEXT,
      ApplicantEmailAddress: DataTypes.TEXT,
      ApplicantPhoneNumber: DataTypes.TEXT,
      WebAddress: DataTypes.TEXT,
      ProjectEmailAddress: DataTypes.TEXT,
      Region: DataTypes.TEXT,
      ProjectLocation: DataTypes.TEXT,
      AnticipatedGridRefEasting: DataTypes.FLOAT,
      AnticipatedGridRefNorthing: DataTypes.FLOAT,
      MapZoomLevel: DataTypes.TEXT,
      LatLong: DataTypes.TEXT,
      AnticipatedDateOfSubmission: DataTypes.DATE,
      AnticipatedSubmissionDateNonSpecific: DataTypes.TEXT,
      DateOfDCOSubmission: DataTypes.DATE,
      DateOfDCOAcceptance_NonAcceptance: DataTypes.DATE,
      DateOfPreliminaryMeeting: DataTypes.DATE,
      ConfirmedStartOfExamination: DataTypes.DATE,
      DateTimeExaminationEnds: DataTypes.TIME,
      DateOfRepresentationPeriodOpen: DataTypes.DATE,
      DateOfRelevantRepresentationClose: DataTypes.DATE,
      DateRRepAppearOnWebsite: DataTypes.DATE,
      Stage4ExtensiontoExamCloseDate: DataTypes.DATE,
      stage5ExtensionToRecommendationDeadline: DataTypes.DATE,
      Stage5ExtensiontoDecisionDeadline: DataTypes.DATE,
      DateOfRecommendations: DataTypes.DATE,
      ConfirmedDateOfDecision: DataTypes.DATE,
      DateProjectWithdrawn: DataTypes.DATE,
      sourceSystem: DataTypes.STRING,
      dateOfNonAcceptance: DataTypes.TIME,
    },
    {
      sequelize,
      modelName: 'Project',
      tableName: 'wp_ipc_projects',
    }
  );

  Project.removeAttribute('id');
  Project.removeAttribute('createdAt');
  Project.removeAttribute('updatedAt');

  return Project;
};
