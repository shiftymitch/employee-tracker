DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  role VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  salary DECIMAL(9,2) NULL,
  manager VARCHAR(100) NULL,
  PRIMARY KEY (id)
);

SELECT * FROM employees;