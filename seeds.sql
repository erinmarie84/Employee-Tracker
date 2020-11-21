DROP DATA
USE employee_db;

INSERT INTO department (name) VALUES ('Administration');
INSERT INTO department (name) VALUES ('Production');
INSERT INTO department (name) VALUES ('Accounting');
INSERT INTO department (name) VALUES ('Marketing');
INSERT INTO department (name) VALUES ('Human Resources');

INSERT INTO role (title, salary, department_id) VALUES ('CEO', '10000000', 1);
INSERT INTO role (title, salary, department_id) VALUES ('CFO', '600000', 1);
INSERT INTO role (title, salary, department_id) VALUES ('Manager', '150000', 2);
INSERT INTO role (title, salary, department_id) VALUES ('CPA', '200000', 3);
INSERT INTO role (title, salary, department_id) VALUES ('Sales', '60000', 4);
INSERT INTO role (title, salary, department_id) VALUES ('HR', '80000', 5);

INSERT INTO employee (first_name, last_name, role_id) VALUES ('Erin', 'Frasier', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Shanon', 'Smith', 1);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Scott', 'Hargrave', 2);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Roxanne', 'McClellan', 3);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Marisha', 'Lewis', 4);
INSERT INTO employee (first_name, last_name, role_id) VALUES ('Henry', 'Smith', 5);
