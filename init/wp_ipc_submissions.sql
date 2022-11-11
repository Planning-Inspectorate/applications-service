CREATE TABLE `wp_ipc_submissions` (
  `id` int(11) unsigned NOT NULL AUTO_INCREMENT COMMENT 'Submission record.  Used to identify file?',
  `name` varchar(255) NOT NULL DEFAULT '' COMMENT 'Name of interested party',
  `email` varchar(1024) NOT NULL DEFAULT '' COMMENT 'Email address of interested party',
  `interestedParty` tinyint(1) unsigned NOT NULL DEFAULT '1' COMMENT 'Indicator of whether submission is from an an interested party or not',
  `iPReference` varchar(31) DEFAULT NULL COMMENT 'Interested party reference number.  There are varying formats most of which are alpha-numeric',
  `deadline` varchar(32) NOT NULL DEFAULT '' COMMENT 'Exam deadline  e.g deadline 1.  Will include a generic type that covers non deadline related submission (additional submission)',
  `submissionType` text NOT NULL COMMENT 'Long description of submission type',
  `representation` text COMMENT 'Representation',
  `sensitiveData` tinyint(1) unsigned DEFAULT NULL COMMENT 'Indicator of whether submission contains sensitive data',
  `lateSubmission` tinyint(1) unsigned DEFAULT NULL COMMENT 'Indicator of whether submission was submitted after the deadline closed (only permissible for 24 hours)',
  `caseReference` varchar(16) NOT NULL DEFAULT '' COMMENT 'Case reference',
  `dateSubmitted` datetime NOT NULL COMMENT 'Date and time submission made',
  `exported` datetime DEFAULT NULL COMMENT 'Indicator of whether case has been successfully exported to Horizon',
  `submissionId` int(11) unsigned NOT NULL COMMENT 'Used to identify representation and documents submitted together',
  `submissionIdHash` varchar(255) DEFAULT NULL,
  `filenameOriginal` varchar(255) DEFAULT NULL,
  `filename` varchar(255) DEFAULT NULL,
  `fileSize` int(255) unsigned DEFAULT NULL,
  `fileMD5` varchar(255) DEFAULT NULL,
  `validated` datetime DEFAULT NULL,
  `formData` text COMMENT 'Should be JSON field, but this MySQL version is unsupported',
  PRIMARY KEY (`id`)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO ipclive.wp_ipc_submissions (`name`,`email`,`interestedParty`,`iPReference`,`deadline`,`submissionType`,`representation`,`sensitiveData`,`lateSubmission`,`caseReference`,`dateSubmitted`,`exported`,`submissionId`,`submissionIdHash`,`filenameOriginal`,`filename`,`fileSize`,`fileMD5`,`validated`,`formData`) VALUES ('Web Team','webteam@planninginspectorate.gov.uk',1,'AA-12322233','Deadline Two','',NULL,0,0,'BC010033','2022-08-05 15:47:17',NULL,523,NULL,NULL,'Web-Team-Header-Document-523.pdf',NULL,'e7814b876bd7722f4c10ec2058a8d4a8','2022-08-05 15:48:14','{\"submission_content_qu\":\"both\",\"latest_form_stage\":4}');
INSERT INTO ipclive.wp_ipc_submissions (`name`,`email`,`interestedParty`,`iPReference`,`deadline`,`submissionType`,`representation`,`sensitiveData`,`lateSubmission`,`caseReference`,`dateSubmitted`,`exported`,`submissionId`,`submissionIdHash`,`filenameOriginal`,`filename`,`fileSize`,`fileMD5`,`validated`,`formData`) VALUES ('Web Team','webteam@planninginspectorate.gov.uk',1,'AA-12322233','Deadline Two','Test 1',NULL,0,0,'BC010033','2022-08-05 15:47:43',NULL,523,NULL,'Smalll Test document for Doc upload.docx','Smalll-Test-document-for-Doc-upload-523-1.docx',55688,'b81ab907ee54cb3f7cec5be2e7b00bf6','2022-08-05 15:48:14',NULL);
INSERT INTO ipclive.wp_ipc_submissions (`name`,`email`,`interestedParty`,`iPReference`,`deadline`,`submissionType`,`representation`,`sensitiveData`,`lateSubmission`,`caseReference`,`dateSubmitted`,`exported`,`submissionId`,`submissionIdHash`,`filenameOriginal`,`filename`,`fileSize`,`fileMD5`,`validated`,`formData`) VALUES ('Web Team','webteam@planninginspectorate.gov.uk',1,'AA-12322233','Deadline Two','Test 3','My rep',1,0,'BC010033','2022-08-05 15:47:59',NULL,523,NULL,NULL,'Web-Team-Written-Representation-523-2.pdf',NULL,'4c5cfa0bd32d2dda1b729f08f35ee4f1','2022-08-05 15:48:14',NULL);