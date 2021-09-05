USE employeetracker;

INSERT into department (name) VALUES ("Owner");
INSERT into department (name) VALUES ("Manager");
INSERT into department (name) VALUES ("Leadership team");
INSERT into department (name) VALUES ("Operational team");

INSERT into role (title, salary, department_id) VALUES ("CEO", 100000, 1);
INSERT into role (title, salary, department_id) VALUES ("COO", 90000, 1);
INSERT into role (title, salary, department_id) VALUES ("Finance", 70000, 3);
INSERT into role (title, salary, department_id) VALUES ("Marketing", 60000, 2);
INSERT into role (title, salary, department_id) VALUES ("Technology", 80000, 2);
INSERT into role (title, salary, department_id) VALUES ("Executive assistant", 20000, 4);
INSERT into role (title, salary, department_id) VALUES ("Office manager", 40000, 3);
INSERT into role (title, salary, department_id) VALUES ("Customer service", 30000, 4);
INSERT into role (title, salary, department_id) VALUES ("HR", 50000, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Charles", "Xavier", 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Erik Magneto", "Lehnsherr", 2, 1, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Raven Mystique", "Darkholme", 2, 1, null);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Logan James", "Howlett", 3, null);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Jean", "Grey", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Scott", "Summers", 4, 3);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Peter", "Maximoff", 4, 3);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Victor", "Creed", 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Robert", "Drake", 6, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Ororo", "Munroe", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Henry Hank", "McCoy", 7, 5);
INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Kurt", "Wagner", 8, 5);

INSERT into employee (first_name, last_name, role_id, manager_id) VALUES ("Marie", "D'Ancanto", 9, null);
