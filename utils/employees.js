const inquirer = require('inquirer');
const db = require('../db/connection');

// CRUD Operations for Employees
// view all (READ)
function viewAllEmployees() {
    const sql = `SELECT * FROM employees;`
    return db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
    });
};

// add employee (CREATE)
function addEmployee () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'Enter a first name: (Required)',
            validate: firstNameInput => {
                if (firstNameInput) {
                    return true;
                } else {
                    console.log('Please enter a first name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'Enter a last name: (Required)',
            validate: lastNameInput => {
                if (lastNameInput) {
                    return true;
                } else {
                    console.log('Please enter a last name!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'role_id',
            message: 'Enter a role ID: (Required)',
            validate: roleIdInput => {
                if (roleIdInput) {
                    return true;
                } else {
                    console.log('Please enter a role ID!');
                    return false;
                }
            }
        },
        {
            type: 'input',
            name: 'manager_id',
            message: 'Enter a manager ID:',
            validate: managerIdInput => {
                if (managerIdInput) {
                    return true;
                } else {
                    console.log('Please enter a manager ID!');
                    return false;
                }
            }
        }
    ])
    .then(function(){
        const sql = `INSERT INTO voters (first_name, last_name, email) VALUES (?,?,?)`;
        const params = [body.first_name, body.last_name, body.email];
        db.query(sql, params, (err, result) => {
            if (err) {
                res.status(400).json({ error: err.message });
                return;
            }
            res.json({
                message: 'success',
                data: body
            });
        });
    })
};

// update employee (UPDATE)
function updateEmployee () {

};

// delete employee (DELETE)
function deleteEmployee () {

};

module.exports = {
    viewAllEmployees,
    addEmployee,
    updateEmployee,
    deleteEmployee
};