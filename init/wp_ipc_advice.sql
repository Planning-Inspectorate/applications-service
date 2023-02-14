CREATE TABLE ipclive.wp_ipc_advice (
  `ID` int(11) NOT NULL AUTO_INCREMENT,
  `AdviceID` varchar(50) CHARACTER SET latin1 NOT NULL,
  `FolderName` varchar(500) CHARACTER SET latin1 DEFAULT NULL,
  `EnquiryDate` date DEFAULT NULL,
  `EnquiryMethod` varchar(50) CHARACTER SET latin1 DEFAULT NULL,
  `IndustrySector` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `CaseReference` varchar(10) CHARACTER SET latin1 DEFAULT NULL,
  `EnqFirstName` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `EnqLastName` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `EnquiryOrganisation` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `EnquiryDetail` text CHARACTER SET latin1,
  `AdviceGiven` text CHARACTER SET latin1,
  `RespondedBy` varchar(255) CHARACTER SET latin1 DEFAULT NULL,
  `Section51Enquiry` varchar(8) CHARACTER SET latin1 DEFAULT NULL,
  `InitiatedDate` date DEFAULT NULL,
  `DateEnquiryReceived` datetime DEFAULT NULL,
  `DateAdviceGiven` date DEFAULT NULL,
  `Attachments` text,
  `DateCreated` datetime DEFAULT CURRENT_TIMESTAMP,
  `DateLastModified` datetime DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  PRIMARY KEY (`ID`),
  KEY `DateAdviceGiven` (`DateAdviceGiven`),
  KEY `CaseReference` (`CaseReference`),
  KEY `AdviceID` (`AdviceID`),
  KEY `Section51Enquiry` (`Section51Enquiry`)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;


INSERT INTO ipclive.wp_ipc_advice (`AdviceID`,`FolderName`,`EnquiryDate`,`EnquiryMethod`,`IndustrySector`,`CaseReference`,`EnqFirstName`,`EnqLastName`,`EnquiryOrganisation`,`EnquiryDetail`,`AdviceGiven`,`RespondedBy`,`Section51Enquiry`,`InitiatedDate`,`DateEnquiryReceived`,`DateAdviceGiven`,`Attachments`,`DateCreated`,`DateLastModified`) VALUES ('WA033004-Advice-00001',NULL,NULL,'Email',NULL,'EN010120','Vijaya','Vasantha','Test General Advice','This is a general advice test republish again and again to test the general advie under register of advices and not under the case as the case is not yet published to the NI Website.','This is a general advice test republish again and again to test the general advie under register of advices and not under the case as the case is not yet published to the NI Website.',NULL,'Yes',NULL,NULL,'2020-03-20',NULL,'2020-03-20 08:00:26','2022-08-05 08:24:31');
INSERT INTO ipclive.wp_ipc_advice (`AdviceID`,`FolderName`,`EnquiryDate`,`EnquiryMethod`,`IndustrySector`,`CaseReference`,`EnqFirstName`,`EnqLastName`,`EnquiryOrganisation`,`EnquiryDetail`,`AdviceGiven`,`RespondedBy`,`Section51Enquiry`,`InitiatedDate`,`DateEnquiryReceived`,`DateAdviceGiven`,`Attachments`,`DateCreated`,`DateLastModified`) VALUES ('EN043005-Advice-00006',NULL,NULL,'Email',NULL,'EN010120','Vijaya','Vasantha','Test Organisation','This is a enquiry to republish again and again','This is the Depublish',NULL,'Yes',NULL,NULL,'2020-03-20','EN043005-000023','2020-03-23 15:43:39','2022-08-05 08:24:31');
INSERT INTO ipclive.wp_ipc_advice (`AdviceID`,`FolderName`,`EnquiryDate`,`EnquiryMethod`,`IndustrySector`,`CaseReference`,`EnqFirstName`,`EnqLastName`,`EnquiryOrganisation`,`EnquiryDetail`,`AdviceGiven`,`RespondedBy`,`Section51Enquiry`,`InitiatedDate`,`DateEnquiryReceived`,`DateAdviceGiven`,`Attachments`,`DateCreated`,`DateLastModified`) VALUES ('WA023013-Advice-00001',NULL,NULL,'Meeting',NULL,'EN010120','Vijaya','Vasantha','Test Organisation','This is my advice to check johns query','Just create and view whether it appears on IP Exports document',NULL,'Yes',NULL,NULL,'2020-04-03',NULL,'2020-04-03 10:02:12','2022-08-05 08:24:31');
INSERT INTO ipclive.wp_ipc_advice (`AdviceID`,`FolderName`,`EnquiryDate`,`EnquiryMethod`,`IndustrySector`,`CaseReference`,`EnqFirstName`,`EnqLastName`,`EnquiryOrganisation`,`EnquiryDetail`,`AdviceGiven`,`RespondedBy`,`Section51Enquiry`,`InitiatedDate`,`DateEnquiryReceived`,`DateAdviceGiven`,`Attachments`,`DateCreated`,`DateLastModified`) VALUES ('WA023013-Advice-00005',NULL,NULL,'Email',NULL,'TR040009','Vijaya Krishna','Vasantha','Test Organisation','Advice for Testing Version History','This is modfiying the existing to check the status posted as Modified',NULL,'Yes',NULL,NULL,'2020-04-16','EN010011-000012, TR010140-000002','2020-04-16 05:28:39','2022-08-05 08:24:31');
INSERT INTO ipclive.wp_ipc_advice(`AdviceID`,`FolderName`,`EnquiryDate`,`EnquiryMethod`,`IndustrySector`,`CaseReference`,`EnqFirstName`,`EnqLastName`,`EnquiryOrganisation`,`EnquiryDetail`,`AdviceGiven`,`RespondedBy`,`Section51Enquiry`,`InitiatedDate`,`DateEnquiryReceived`,`DateAdviceGiven`,`Attachments`,`DateCreated`,`DateLastModified`) VALUES ('WA023013-Advice-00006',NULL,NULL,'Email',NULL,'EN010120','Vijaya Krishna','Vasantha','Test Organisation','test on april 20 2020','test it',NULL,'Yes',NULL,NULL,'2020-04-20','WA023013-000085','2020-04-20 10:27:20','2022-08-05 08:24:31');
INSERT INTO ipclive.wp_ipc_advice (`AdviceID`,`FolderName`,`EnquiryDate`,`EnquiryMethod`,`IndustrySector`,`CaseReference`,`EnqFirstName`,`EnqLastName`,`EnquiryOrganisation`,`EnquiryDetail`,`AdviceGiven`,`RespondedBy`,`Section51Enquiry`,`InitiatedDate`,`DateEnquiryReceived`,`DateAdviceGiven`,`Attachments`,`DateCreated`,`DateLastModified`) VALUES ('WA023013-Advice-00007',NULL,NULL,'Email',NULL,'EN010120','Vijaya Krishna','Vasantha','Test Organisation','This is a advice on april 21 2020','This is the advice given by caseworker',NULL,'Yes',NULL,NULL,'2020-04-21','WA023013-000089','2020-04-21 10:25:25','2022-08-05 08:24:31');
INSERT INTO ipclive.wp_ipc_advice (`AdviceID`,`FolderName`,`EnquiryDate`,`EnquiryMethod`,`IndustrySector`,`CaseReference`,`EnqFirstName`,`EnqLastName`,`EnquiryOrganisation`,`EnquiryDetail`,`AdviceGiven`,`RespondedBy`,`Section51Enquiry`,`InitiatedDate`,`DateEnquiryReceived`,`DateAdviceGiven`,`Attachments`,`DateCreated`,`DateLastModified`) VALUES ('WA023013-Advice-00004',NULL,NULL,'Meeting',NULL,'EN010120','Vijaya Krishna','Vasantha','Advice 3','Advice 3 created on 15th April 2020','Vijay Gave advice 2 on 15/04/2020',NULL,'No',NULL,NULL,'2020-04-21',NULL,'2020-04-21 15:34:00','2022-08-05 08:24:31');
INSERT INTO ipclive.wp_ipc_advice (`AdviceID`,`FolderName`,`EnquiryDate`,`EnquiryMethod`,`IndustrySector`,`CaseReference`,`EnqFirstName`,`EnqLastName`,`EnquiryOrganisation`,`EnquiryDetail`,`AdviceGiven`,`RespondedBy`,`Section51Enquiry`,`InitiatedDate`,`DateEnquiryReceived`,`DateAdviceGiven`,`Attachments`,`DateCreated`,`DateLastModified`) VALUES ('EN043005-Advice-00001',NULL,NULL,'Email',NULL,'EN010120','Vijaya','Vasantha','Test Organisation','This is my first advice','Corona virus is not last for long as it is made in China',NULL,'Yes',NULL,NULL,'2020-03-19',NULL,'2020-03-19 08:51:38','2022-08-05 08:24:32');
