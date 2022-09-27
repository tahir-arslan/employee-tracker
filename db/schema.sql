DROP TABLE IF EXISTS employees;
DROP TABLE IF EXISTS roles;
DROP TABLE IF EXISTS departments;

-- departments table
CREATE TABLE departments (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    name VARCHAR(30) NOT NULL
);

-- roles table
CREATE TABLE roles (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(30) NOT NULL,
    salary DECIMAL NOT NULL,
    department_id INTEGER,
    CONSTRAINT fk_departments FOREIGN KEY (department_id) REFERENCES departments(id) ON DELETE SET NULL
);

-- roles employee
CREATE TABLE employees (
    id INTEGER AUTO_INCREMENT PRIMARY KEY,
    first_name VARCHAR(30) NOT NULL,
    last_name VARCHAR(30) NOT NULL,
    role_id INTEGER,
    CONSTRAINT fk_role FOREIGN KEY (role_id) REFERENCES roles(id) ON DELETE SET NULL,
    manager_id INTEGER DEFAULT NULL
    -- CONSTRAINT uc_manager UNIQUE (manager_id)
);