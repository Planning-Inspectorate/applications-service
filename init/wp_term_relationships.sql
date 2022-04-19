CREATE TABLE ipclive.wp_term_relationships (
  object_id bigint(20) unsigned NOT NULL DEFAULT 0,
  term_taxonomy_id bigint(20) unsigned NOT NULL DEFAULT 0,
  term_order int(11) NOT NULL DEFAULT 0,
  PRIMARY KEY (object_id,term_taxonomy_id),
  KEY term_taxonomy_id (term_taxonomy_id)
) ENGINE=MyISAM DEFAULT CHARSET=utf8;

INSERT INTO ipclive.wp_term_relationships (object_id, term_taxonomy_id, term_order) VALUES (4015739,272,0);
INSERT INTO ipclive.wp_term_relationships (object_id, term_taxonomy_id, term_order) VALUES (4015740,272,0);
INSERT INTO ipclive.wp_term_relationships (object_id, term_taxonomy_id, term_order) VALUES (4015738,272,0);