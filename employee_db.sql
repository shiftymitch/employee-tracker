DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE employees (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(100) NULL,
  last_name VARCHAR(100) NULL,
  role VARCHAR(100) NULL,
  department VARCHAR(100) NULL,
  salary VARCHAR(100) NULL,
  manager VARCHAR(100) NULL,
  PRIMARY KEY (id)
);

INSERT INTO employees (first_name, last_name, role, department, salary, manager)
VALUES 
("john", "doe", "manager", "sales", 25800, "manager"),
("jesse", "james", "supervisor", "sales", 30000, "manager"),
("james", "bond", "lead", "sales", 15700, "manager2");

SELECT * FROM employees;