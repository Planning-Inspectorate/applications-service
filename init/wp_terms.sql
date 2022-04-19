CREATE TABLE ipclive.wp_terms (
  term_id bigint(20) unsigned NOT NULL AUTO_INCREMENT,
  name varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  slug varchar(200) COLLATE utf8mb4_unicode_ci NOT NULL DEFAULT '',
  term_group bigint(10) NOT NULL DEFAULT '0',
  PRIMARY KEY (term_id),
  KEY slug (slug(191)),
  KEY name (name(191))
) ENGINE=MyISAM AUTO_INCREMENT=272 DEFAULT CHARSET=utf8mb4 COLLATE=utf8mb4_unicode_ci;

INSERT INTO ipclive.wp_terms (term_id,name,slug,term_group) VALUES (272,'EN010118 - Longfield Solar Farm','en010118-longfield-solar-farm',0);
