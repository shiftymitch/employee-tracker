DROP DATABASE IF EXISTS employee_db;
CREATE database employee_db;

USE employee_db;

CREATE TABLE department (
  id INT AUTO_INCREMENT NOT NULL,
  department_name VARCHAR(30) NOT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE role (
  id INT AUTO_INCREMENT NOT NULL,
  title VARCHAR(30) NOT NULL,
  salary DECIMAL NULL,
  department_id INT NULL,
  PRIMARY KEY (id)
);

CREATE TABLE employee (
  id INT AUTO_INCREMENT NOT NULL,
  first_name VARCHAR(30) NOT NULL,
  last_name VARCHAR(30) NOT NULL,
  role_id INT NULL,
  manager_id INT NULL,
  PRIMARY KEY (id)
);

INSERT INTO department (department_name)
VALUES 
("accounting"),
("engineering"),
("legal"),
("senior management"),
("sales");

INSERT INTO role (title, salary, department_id)
VALUES 
("accountant", "50000", 1),
("business manager", "120000", 4),
("engineer", "75000", 2),
("lawyer", "150000", 3),
("lead engineer", "80000", 2),
("partner", "250000", 4),
("salesperson", "50000", 5),
("sales manager", "75000", 5);

INSERT INTO employee (first_name, last_name, role_id, manager_id)
VALUES
("Austin", "Powers", 1, 4),
("Heather", "Gram", 3, 3),
("Number", "2", 2, 4),
("Dr", "Evil", 6, null);