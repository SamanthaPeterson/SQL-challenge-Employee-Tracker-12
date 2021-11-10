USE db_employee_tracker;


----- Department Seeds -----

INSERT INTO department (id, name)
VALUES (1, "Accounting");

INSERT INTO department (id, name)
VALUES (2, "reception");

INSERT INTO department (id, name)
VALUES (3, "Engineering");

INSERT INTO department (id, name)
VALUES (4, "public relations");

----- Role Seeds -----

INSERT INTO role (id, title, salary, department_id)
VALUES (1, "accounting intern", 42000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (2, "Assistant accountant", 60000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (3, "assistant to the regional manager", 75000, 1);

INSERT INTO role (id, title, salary, department_id)
VALUES (4, "secratary", 65000, 2);

INSERT INTO role (id, title, salary, department_id)
VALUES (5, "it specialist", 70000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (6, "senior engineer", 100000, 3);

INSERT INTO role (id, title, salary, department_id)
VALUES (7, "public relations specialist", 80000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (8, "assistant to the regional manager", 52000, 4);

INSERT INTO role (id, title, salary, department_id)
VALUES (9, "branch Manager", 105000, 4);

----- Employees Seeds -----

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (4, "adam", "jefferson", 3, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (5, "ben", "thompson", 4, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (7, "caleb", "smith", 6, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (10, "daniel", "williams", 9, null);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (3, "ephraim", "jepson", 2, 4);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (1, "frank", "roundy", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (2, "gideon", "brown", 1, 3);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (6, "harvy", "taylor", 5, 7);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (8, "ike", "rogers", 7, 10);

INSERT INTO employee (id, first_name, last_name, role_id, manager_id)
VALUES (9, "james", "dillon", 8, 10);

