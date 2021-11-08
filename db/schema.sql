DROP TABLE IF EXISTS department;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS employee;


CREATE TABLE department (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  name VARCHAR (30) NOT NULL
);
CREATE TABLE role (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  title VARCHAR (30) NOT NULL,
  salary DECIMAL NOT NULL,
  department_id INTEGER,
  -- FOREIGN KEY (department_id) REFERENCES department (id)
);
CREATE TABLE employee (
  id INTEGER NOT NULL AUTO_INCREMENT PRIMARY KEY,
  first_name VARCHAR (30) NOT NULL,
  last_name VARCHAR (30) NOT NULL,
  role_id INTEGER,
  manager_id INTEGER,
  -- FOREIGN KEY (role_id) REFERENCES role (id),
  -- FOREIGN KEY (manager_id) REFERENCES role (id)
);

-- * **department:**

--     * `id` - INT PRIMARY KEY

--     * `name` - VARCHAR(30) to hold department name


-- * **role:**

--     * `id` - INT PRIMARY KEY

--     * `title` - VARCHAR(30) to hold role title

--     * `salary` - DECIMAL to hold role salary

--     * `department_id` - INT to hold reference to department role belongs to

-- * **employee:**

--     * `id` - INT PRIMARY KEY

--     * `first_name` - VARCHAR(30) to hold employee first name

--     * `last_name` - VARCHAR(30) to hold employee last name

--     * `role_id` - INT to hold reference to employee role

--     * `manager_id` - INT to hold reference to another employee that is manager of the current employee. This field may be null if the employee has no manager
