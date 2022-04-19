CREATE TABLE ipclive.wp_posts (
  ID bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  post_author bigint(20) unsigned NOT NULL DEFAULT '0',
  post_date datetime NOT NULL,
  post_date_gmt datetime NOT NULL ,
  post_content longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  post_title text COLLATE utf8mb4_unicode_ci NOT NULL,
  post_excerpt text COLLATE utf8mb4_unicode_ci NOT NULL,
  post_status varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'publish',
  comment_status varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  ping_status varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'open',
  post_password varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  post_name varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  to_ping text COLLATE utf8mb4_unicode_ci NOT NULL,
  pinged text COLLATE utf8mb4_unicode_ci NOT NULL,
  post_modified datetime NOT NULL,
  post_modified_gmt datetime NOT NULL,
  post_content_filtered longtext COLLATE utf8mb4_unicode_ci NOT NULL,
  post_parent bigint(20) unsigned NOT NULL DEFAULT '0',
  guid varchar(255) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  menu_order int(11) NOT NULL DEFAULT '0',
  post_type varchar(20) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT 'post',
  post_mime_type varchar(100) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  comment_count bigint(20) NOT NULL DEFAULT '0',
  PRIMARY KEY (ID),
  KEY type_status_date (post_type,post_status,post_date,ID),
  KEY post_parent (post_parent),
  KEY post_author (post_author),
  KEY post_name (post_name(191))
) ENGINE=MyISAM AUTO_INCREMENT=4015735 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO ipclive.wp_posts (ID,post_author,post_date,post_date_gmt,post_content,post_title,post_excerpt,post_status,comment_status,ping_status,post_password,post_name,to_ping,pinged,post_modified,post_modified_gmt,post_content_filtered,post_parent,guid,menu_order,post_type,post_mime_type,comment_count) VALUES (4015739,13,'2022-04-13 11:26:27','2022-04-13 10:26:27','Test post number 2','','','publish','closed','closed','',4015739,'','','2022-04-13 11:26:27','2022-04-13 10:26:27','',0,'https://nipreprod.planninginspectorate.gov.uk/?post_type=ipc_project_update&#038;p=4015739',0,'ipc_project_update','',0);
INSERT INTO ipclive.wp_posts (ID,post_author,post_date,post_date_gmt,post_content,post_title,post_excerpt,post_status,comment_status,ping_status,post_password,post_name,to_ping,pinged,post_modified,post_modified_gmt,post_content_filtered,post_parent,guid,menu_order,post_type,post_mime_type,comment_count) VALUES (4015740,13,'2022-04-15 11:26:43','2022-04-15 10:26:43','Test post number 3','Banner','','future','closed','closed','','banner','','','2022-04-13 11:27:31','2022-04-13 10:27:31','',0,'https://nipreprod.planninginspectorate.gov.uk/?post_type=ipc_project_update&#038;p=4015740',0,'ipc_project_update','',0);
INSERT INTO ipclive.wp_posts (ID,post_author,post_date,post_date_gmt,post_content,post_title,post_excerpt,post_status,comment_status,ping_status,post_password,post_name,to_ping,pinged,post_modified,post_modified_gmt,post_content_filtered,post_parent,guid,menu_order,post_type,post_mime_type,comment_count) VALUES (4015738,13,'2022-04-11 11:25:27','2022-04-11 10:25:27','Test post Number 1','Banner - test','','publish','closed','closed','','banner-test','','','2022-04-13 11:25:43','2022-04-13 10:25:43','',0,'https://nipreprod.planninginspectorate.gov.uk/?post_type=ipc_project_update&#038;p=4015738',0,'ipc_project_update','',0);

