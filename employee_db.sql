DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  title VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  salary VARCHAR(100) NULL,
  manager VARCHAR(100) NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (id, first_name, last_name, title, department, salary, manager)
VALUES (

SELECT * FROM employees;