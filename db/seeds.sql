-- pre-populate tables
INSERT INTO department(name)
VALUES
    ('Marketing'),
    ('Accounting'),
    ('Sales'),
    ('Public Relations');

INSERT INTO roles (title, salary, department_id )
VALUES
    ('Sales Lead', '100000', '1'),
    ('Salesperson', '80000', '1'),
    ('Lead Engineer', '150000', '2'),
    ('Software Engineer', '160000', '2'),
    ('Account Manager', '160000', '3' ),
    ('Accountant', '125000', '3'),
    ('Legal Team Lead', '250000', '4'),
    ('Lawyer', '190000', '4');

INSERT INTO employees (first_name, last_name, role_id, manager_id)
VALUES
    ('Eleven', 'Twelve', '1', '0'),
    ('Mike', 'Wheeler', '2', '1'),
    ('Will', 'Byers', '3', '0'),
    ('Lucas', 'Sinclair', '4', '3'),
    ('Max', 'Mayfield', '5', '0'),
    ('Dustin', 'Henderson', '6', '5'),
    ('Steve', 'Harrington', '7','0'),
    ('Nancy', 'Wheeler', '8', '0'),
    ('Jonathan', 'Byers', '9', '1'),
    ('Robin', 'Buckley', '8', '2');