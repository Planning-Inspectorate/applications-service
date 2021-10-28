DROP TABLE IF EXISTS student;
CREATE TABLE student (
  school varchar(255),
  id int,
  name varchar(255) 
);

INSERT INTO student (school, id, name) VALUES
('ivy', 1, 'A'),
('shmivy', 2, 'B'),
('divy', 3, 'C');
