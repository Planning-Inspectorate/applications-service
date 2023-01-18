CREATE TABLE `wp_ipc_timetables` (
  `id` int(11) NOT NULL AUTO_INCREMENT,
  `unique_id` varchar(50) NOT NULL COMMENT 'Horizon identifier',
  `case_reference` varchar(10) NOT NULL COMMENT 'project case reference',
  `title` varchar(255) DEFAULT NULL COMMENT 'title of the event',
  `description` text COMMENT 'description of the event',
  `date_of_event` datetime NOT NULL COMMENT 'date and time of the event',
  `timetable_type` varchar(255) DEFAULT NULL COMMENT 'e.g. event, deadline etc',
  `type_of_event` varchar(255) DEFAULT NULL COMMENT 'e.g. Preliminary Meeting etc',
  `location` varchar(255) DEFAULT NULL COMMENT 'location of the event',
  `date_created` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP,
  `date_last_modified` timestamp NOT NULL DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP,
  `dateTimeDeadlineStart` datetime DEFAULT NULL,
  `sourceSystem` varchar(15) DEFAULT NULL,
  PRIMARY KEY (`id`),
  KEY `case_reference` (`case_reference`),
  KEY `unique_id` (`unique_id`),
  KEY `type_of_event` (`type_of_event`),
  KEY `timetable_type` (`timetable_type`)
) DEFAULT CHARACTER SET utf8 COLLATE utf8_general_ci;

INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4069','EN010009','Deadline 1A','Deadline 1A\r\n\r\nDeadline for receipt by the ExA of:\r\n* Applicant’s comments on Relevant Representations (RRs)','2022-08-04 23:59:00','Exams','Deadline','','2022-07-26 15:00:26','2022-07-26 15:00:26','2022-07-26 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4068','EN010009','Issue by ExA','Issue by ExA\r\n\r\n• Examination Timetable\r\n• ExA’s Written Questions (ExQ1)','2022-07-26 00:00:00','Events','Procedural Decision','','2022-07-26 15:00:25','2022-07-26 15:00:25','0001-01-01 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4054','EN010009','Preliminary Meeting','Preliminary Meeting\r\n\r\n\r\nThe Preliminary Meeting is due to take place on Monday 18 July 2022','2022-07-18 00:00:00','Events','Preliminary Meeting','','2022-06-22 01:00:13','2022-06-22 11:00:50','0001-01-01 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4053','EN010009','Procedural Deadline A','Procedural Deadline A\r\n\r\n\r\nDeadline for receipt by the ExA of:\r\n\r\n* Written submissions on the Examination Procedure, including any submissions about the use of virtual methods\r\n\r\n* Requests to be heard orally at the Preliminary Meeting','2022-07-04 00:00:00','Exams','Deadline','','2022-06-22 01:00:13','2022-06-22 11:00:50','2022-06-22 11:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4070','EN010009','Deadline 1B','Deadline 1B\r\n\r\nDeadline for receipt by the ExA of:\r\n* Local Impact Reports (LIRs) from Local Authorities\r\n* Responses to ExQ1\r\n* IP comments on RRs (if any)\r\n* Written Representations (WRs)\r\n* Requests from IPs to speak at an Open Floor Hearing\r\n* Requests from APs to speak to a Compulsory Acquisition Hearing\r\n* Requests from IPs to speak at an Issue Specific Hearing\r\n* Notification by Statutory Parties of their wish to be considered an IP by the ExA\r\n* Notification of wish to have future correspondence received electronically\r\n* Submission by the Applicant, IPs and APs of suggested locations for the ExA to include in any Site Inspection, including the reason for nomination and issues to be observed, information about whether the location can be accessed using public rights of way or what access arrangements would need to be made\r\n* Statements of Common Ground (SoCG) requested by the ExA\r\n* Statement of Commonality of SoCG\r\n* The Compulsory Acquisition (CA) Schedule\r\n* Navigation Document/Guide to the application\r\n* Any further information requested by the ExA under Rule 17 of The Infrastructure Planning (Examination Procedure) Rules 2010','2022-08-18 23:59:00','Exams','Deadline','','2022-07-26 15:00:26','2022-07-26 16:00:20','2022-07-26 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4071','EN010009','Deadline 2','Deadline 2\r\n\r\nFor receipt by the ExA of:\r\n* Comments on submissions received for Deadline 1A and Deadline 1B\r\n* Comments on the responses to ExQ1\r\n* An updated version of the draft Development Consent Order (dDCO) in clean and tracked versions\r\n* Schedule of changes to the dDCO\r\n* An updated CA Schedule in clean and tracked versions\r\n* Updated SoCG requested by the ExA\r\n* Statement of Commonality of SoCG\r\n* Comments on LIRs\r\n* Navigation Document/Guide to the application\r\n* Any further information requested by the ExA','2022-09-08 23:59:00','Exams','Deadline','','2022-07-26 15:00:26','2022-07-26 15:00:26','2022-08-19 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4072','EN010009','Deadline 3','Deadline 3\r\n\r\nFor receipt by the ExA of:\r\n* Comments on submissions received for Deadline 2\r\n* Written summaries of oral submissions made at Hearings held during the w/c 26 September\r\n* Updated SoCG requested by the ExA\r\n* Statement of Commonality of SoCG \r\n* An updated version of the dDCO in clean and tracked versions\r\n* Schedule of changes to the dDCO\r\n* An updated CA Schedule in clean and tracked versions\r\n* Navigation Document/Guide to the application\r\n* Any further information requested by ExA','2022-10-06 23:59:00','Exams','Deadline','','2022-07-26 15:00:27','2022-07-26 15:00:27','2022-09-09 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4073','EN010009','Publication by the ExA of','Publication by the ExA of\r\n\r\n• The ExA’s Further Written Questions (ExQ2) (if required)','2022-10-18 00:00:00','Events','Procedural Decision','','2022-07-26 16:00:21','2022-07-26 16:00:21','0001-01-01 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4074','EN010009','Deadline 4','Deadline 4\r\n\r\nFor receipt by the ExA of:\r\n* Comments on submissions received for Deadline 3\r\n* Responses to ExQ2 (if issued)\r\n* Updated SoCG requested by the ExA\r\n* Statement of Commonality of SoCG\r\n* An updated version of the dDCO in clean and tracked versions\r\n* Schedule of changes to the dDCO\r\n* An updated CA Schedule in clean and tracked versions\r\n* Navigation Document/Guide to the application\r\n* Any further information requested by ExA','2022-11-03 23:59:00','Exams','Deadline','','2022-07-26 16:00:22','2022-07-26 16:00:22','2022-10-19 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4075','EN010009','Issue by the ExA','Issue by the ExA\r\n\r\n• Report on the Implications for European Sites (RIES) (if required)','2022-11-22 00:00:00','Events','Procedural Decision','','2022-07-26 16:00:22','2022-07-26 16:00:22','0001-01-01 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4076','EN010009','Deadline 5','Deadline 5\r\n\r\nFor receipt by the ExA of:\r\n* Comments on submissions received for Deadline 4\r\n* Written summaries of oral submissions made at Hearings during w/c14 November 2022 (if hearings are held)\r\n* Updated SoCG requested by the ExA\r\n* Statement of Commonality of SoCG\r\n* Comments on Responses to ExQ2 (if issued)\r\n* An updated version of the dDCO in clean and tracked versions\r\n* Schedule of changes to the dDCO\r\n* An updated CA Schedule in clean and tracked versions\r\n* Navigation Document/Guide to the application\r\n* Any further information requested by ExA','2022-11-24 23:59:00','Exams','Deadline','','2022-07-26 16:00:22','2022-07-26 17:00:25','2022-11-15 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4077','EN010009','Publication by the ExA','Publication by the ExA\r\n\r\n• ExA’s commentary on, or schedule of changes to, the dDCO (if required)\r\n• The ExA’s Further Written Questions (ExQ3) (if required)','2022-12-01 00:00:00','Events','Procedural Decision','','2022-07-26 16:00:23','2022-07-26 16:00:23','0001-01-01 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4078','EN010009','Deadline 6','Deadline 6\r\n\r\nFor receipt by the ExA of:\r\n* Comments on submissions received for Deadline 5\r\n* Comments on the ExA’s commentary on, or schedule of changes to, the dDCO (if required)\r\n* Responses to the ExQ3 (if issued)\r\n* Comments on the RIES (if issued)\r\n* An updated version of the dDCO in clean and tracked versions\r\n* Schedule of changes to the dDCO\r\n* An updated CA Schedule in clean and tracked versions\r\n* Updated SoCG requested by the ExA\r\n* Statement of Commonality of SoCG\r\n* Navigation Document/Guide to the application\r\n* Any further information requested by ExA','2022-12-15 23:59:00','Exams','Deadline','','2022-07-26 16:00:23','2022-07-26 16:00:23','2022-12-02 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4079','EN010009','Deadline 7','Deadline 7\r\n\r\nFor receipt by the ExA of:\r\n* Comments on submissions received for Deadline 6\r\n* Comments on Responses to ExQ3 (if issued)\r\n* Responses on comments on the RIES (if issued)\r\n* Final dDCO to be submitted by the Applicant in the SI template with the SI template validation report\r\n* Final updated Book of Reference (BoR) and schedule of changes to BoR\r\n* Final SoCG\r\n* Final Statement of Commonality of SoCG\r\n* List of matters not agreed where SoCG could not be finalised\r\n* Final CA Schedule\r\n* Final signed and dated section 106 Agreement/Unilateral Undertaking (if required)\r\n* Final Navigation Document/Guide to the application\r\n* Any further information requested by ExA','2023-04-11 23:59:00','Exams','Deadline','','2022-07-26 16:00:23','2022-07-26 16:00:23','2022-12-16 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4080','EN010009','Deadline 8','Deadline 8\r\n\r\nFor receipt by the ExA of:\r\n* Any further information requested by the ExA under Rule 17 of The Infrastructure Planning (Examination Procedure) Rules 2010','2023-04-18 23:59:00','Exams','Deadline','','2022-07-26 16:00:24','2022-07-26 16:00:24','2023-01-12 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010009-4081','EN010009','The ExA is under a duty to complete the Examination of the application by the end of the period of six months','The ExA is under a duty to complete the Examination of the application by the end of the period of six months','2023-01-18 23:59:00','Events','Procedural Decision','','2022-07-26 16:00:24','2022-07-26 17:00:27','0001-01-01 00:00:00','HORIZON');
INSERT INTO ipclive.wp_ipc_timetables (`unique_id`,`case_reference`,`title`,`description`,`date_of_event`,`timetable_type`,`type_of_event`,`location`,`date_created`,`date_last_modified`,`dateTimeDeadlineStart`,`sourceSystem`) VALUES ('EN010011-0001','EN010011','Test','Test','2023-01-18 23:59:00','Events','Procedural Decision','','2022-07-26 16:00:24','2022-07-26 17:00:27','0001-01-01 00:00:00','HORIZON');
