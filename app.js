const db = require('./db/connection');
const inquirer = require('inquirer');
// const  { viewAllEmployees, addEmployee, updateEmployee, deleteEmployee } = require('./utils/employees');
// const  { viewAllRoles, addRole, deleteRole } = require('./utils/roles');
// const  { viewAllDepartments, addDepartment, deleteDepartment } = require('./utils/departments');

// MySQL DB connection
db.connect(err => {
    if(err) throw err;
    console.log(`
     Connected to MySQL database: '${db.config.database}' as: '${db.config.user}'.



    ╔═══════════════════════════════════════════════════════════╗

███████╗███╗   ███╗██████╗ ██╗      ██████╗ ██╗   ██╗███████╗███████╗
██╔════╝████╗ ████║██╔══██╗██║     ██╔═══██╗╚██╗ ██╔╝██╔════╝██╔════╝
█████╗  ██╔████╔██║██████╔╝██║     ██║   ██║ ╚████╔╝ █████╗  █████╗  
██╔══╝  ██║╚██╔╝██║██╔═══╝ ██║     ██║   ██║  ╚██╔╝  ██╔══╝  ██╔══╝  
███████╗██║ ╚═╝ ██║██║     ███████╗╚██████╔╝   ██║   ███████╗███████╗
╚══════╝╚═╝     ╚═╝╚═╝     ╚══════╝ ╚═════╝    ╚═╝   ╚══════╝╚══════╝

     ████████╗██████╗  █████╗  ██████╗██╗  ██╗███████╗██████╗         
     ╚══██╔══╝██╔══██╗██╔══██╗██╔════╝██║ ██╔╝██╔════╝██╔══██╗        
        ██║   ██████╔╝███████║██║     █████╔╝ █████╗  ██████╔╝        
        ██║   ██╔══██╗██╔══██║██║     ██╔═██╗ ██╔══╝  ██╔══██╗        
        ██║   ██║  ██║██║  ██║╚██████╗██║  ██╗███████╗██║  ██║        
        ╚═╝   ╚═╝  ╚═╝╚═╝  ╚═╝ ╚═════╝╚═╝  ╚═╝╚══════╝╚═╝  ╚═╝        
    ╚═══════════════════════════════════════════════════════════╝
    
    
    `);
    startPrompt();
});

function startPrompt() {
    return inquirer.prompt([
        {
            type: "list",
            message: `
Please select an option:`,
            name: "choice",
            choices: [
                "Employees (View All)",
                "Employee (Add New)",
                "Employee (Update)",
                "Employee (Delete)",
                "Roles (View All)",
                "Role (Add New)",
                "Role (Delete)",
                // "Departments (View All)",
                // "Department (Add New)",
                // "Department (Delete)",
                // '--- Exit ---'
            ]
        }
    ]).then(function (pick) {
        switch (pick.choice) {
            case "Employees (View All)":
                viewAllEmployees();
                break;
            case "Employee (Add New)":
                addEmployee();
                break;
            case "Employee (Update)":
                updateEmployee();
                break;
            case "Employee (Delete)":
                deleteEmployee();
                break;
            case "Roles (View All)":
                viewAllRoles();
                break;
            case "Role (Add New)":
                addRole();
                break;
            case "Role (Delete)":
                deleteRole();
                break;
            case "Departments (View All)":
                viewAllDepartments();
                break;
            case "Department (Add New)":
                addDepartment();
                break;
            case "Department (Delete)":
                deleteDepartment();
                break;
            default:
                console.log('Thank you for using the Employee Directory.');
                return db.end();
        }
    })
};

// EMPLOYEE CRUD OPERATIONS
function viewAllEmployees() {
    const sql = `SELECT employee.id AS ID, employee.first_name AS First_Name, employee.last_name AS Last_Name, role.title AS Role, department.name AS Department, role.salary AS Salary, employee.manager_id AS Manager 
    FROM employee
    LEFT JOIN role
    ON employee.roles_id = role.id
    LEFT JOIN department
    ON role.department_id = department.id`
    return db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        startPrompt();
    });
};

function addEmployee () {
    inquirer.prompt([
        {
            type: 'input',
            name: 'first_name',
            message: 'What is their first name?',
        },
        {
            type: 'input',
            name: 'last_name',
            message: 'What is the their last name?',
        }, 
    ])
    .then(answer => {
        const criteria = [answer.first_name, answer.last_name]
        const roleSql = `SELECT role.id, role.title FROM role`;
        db.query(roleSql, (err, result) =>{
            const roles = result.map(({id, title}) => ({name: title, value:id}));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'role',
                    message: "What is the employee's role?",
                    choices: roles
                }
            ])
        .then (rolechoice  => {
            const role = rolechoice.role;
            criteria.push(role);
            const managerSQL = `SELECT * FROM employee`;
            db.query(managerSQL, (err, data) => {
                const managers = data.map(({id, first_name, last_name}) => ({name: first_name + " " + last_name, value:id}));
                inquirer.prompt([
                    {
                    type: 'list',
                    name: 'manager',
                    message: "Who is the employee's manager?",
                    choices: managers
                    }
                ])
                .then (managerChoice => {
                    const manager = managerChoice.manager;
                    criteria.push(manager);
                    const sql = `INSERT INTO employee (first_name, last_name, roles_id, manager_id)
                    VALUES (?,?,?,?)`
                    db.query(sql, criteria, (err, result) => 
                        {
                            if (err) {
                                console.log(err.message);
                                return;
                            }
                        console.log("You have added the new employee to the database.");
                        startPrompt();
                        }
                    )
                })
            })
        })
        })
    })
};

function updateEmployee() {
    const employeeSQL = `SELECT * FROM employee`;
    db.query(employeeSQL, (err, data) =>{
        const employees = data.map(({id, first_name, last_name}) =>({name: first_name + " " + last_name, value:id}));
        inquirer.prompt([
            {
                type:'list',
                name: 'employee',
                message: "Which employee's role would you like to change?",
                choices: employees
            }
        ])
        .then (employeeChoice =>{
            const criteria = [employeeChoice.employee];
            const rolesSql = `SELECT role.id, role.title FROM role`;
            db.query(rolesSql, (err, result) => {
                const roles = result.map(({id, title}) => ({name: title, value:id}));
                inquirer.prompt([
                    {
                        type: 'list',
                        name: 'role',
                        message: "What is the employee's new role?",
                        choices: roles
                    },
                ])
                .then (roleChoice =>{
                    const role = roleChoice.role;
                    criteria.push(role);
                    const criteriaReverse = criteria.reverse();
                    const changeroleSql = `UPDATE employee SET roles_id = ? WHERE id = ?`;
                    db.query(changeroleSql, criteriaReverse, (err, result) =>
                    {
                        if (err) {
                            console.log(err.message);
                            return;
                        }
                        console.log("You have updated the employee's role");
                        startPrompt();
                    }) 
                })
            })
        })
    })
};

function deleteEmployee() {
    const employeeSQL = 'SELECT * FROM employee';
    db.query(employeeSQL, (err, data) =>{
        const employees = data.map(({id, first_name, last_name}) =>({name: first_name + " " + last_name, value:id}));
        inquirer.prompt([
            {
                type: 'list',
                name: 'employee',
                message: "Which employee would you like to delete?",
                choices: employees
            },
        ])
        .then (employeeChoice => {
            const criteria = [employeeChoice.employee];
            const deleteEmployeeSql = `DELETE FROM employee WHERE employee.id = ?`;
            db.query(deleteEmployeeSql, criteria, (err, result) => {
                if(err) {
                    console.log(err.message);
                    return;
                }
                console.log("You have deleted that employee.");
                startPrompt();
            })
        })
    })
};

// ROLE CRD OPERATIONS
function viewAllRoles (){
    let sqlViewRoles = `SELECT role.id AS Id, role.title AS Role, department.name AS department, role.salary AS Salary
                FROM role
                LEFT JOIN department
                ON role.department_id = department.id `;
    db.query(sqlViewRoles, (err, res) => {
        if (err) {
            console.log(err);
            return;
        } 
        console.table(res);
        startPrompt();
    });
}

function addRole () {
    inquirer.prompt([
        {
            type:'input',
            name: 'role',
            message: 'Please enter the role you wish to add :',
        },
        {
            type: 'input',
            name: 'salary',
            message: "Please enter the salary for the role (ie: 125000) :",
        }
    ])
    .then(roleChoice => {
        const criteria = [roleChoice.role, roleChoice.salary];
        const departmentSql ='SELECT department.id, department.name FROM department';
        db.query(departmentSql, (err, result)=>{
            const departments = result.map(({id, name}) =>({name: name, value:id}));
            inquirer.prompt([
                {
                    type: 'list',
                    name: 'department',
                    message: "In which department does this role belong?",
                    choices: departments
                }
            ])
            .then (roleChoice => {
                const role = roleChoice.department;
                criteria.push(role);
                const departmentSql = `INSERT INTO role (title, salary, department_id)
                VALUES (?,?,?)`
                db.query(departmentSql, criteria, (err, result) =>{
                    if(err) {
                        console.log(err.message);
                        return;
                    }
                console.log("You have added a new role.")
                startPrompt();
                })
            })
        })
    })  
}

function deleteRole() {
    const roleSQL = `SELECT role.id, role.title FROM role`;
    db.query(roleSQL, (err, result) =>{
        const roles = result.map(({id, title}) => ({name: title, value:id}));
        inquirer.prompt([
        {
            type: 'list',
            name: 'role',
            message: "Which Role would you like to delete?",
            choices: roles
        }
        ])
        .then (roleChoice =>{
            const criteria = [roleChoice.role];
            const deleteRole = `DELETE FROM role WHERE role.id = ?`;
            db.query(deleteRole, criteria, (err, result) =>{
                if(err) {
                    console.log(err.message);
                    return;
                }
                console.log("You have deleted that role");
                startPrompt()
            })
        })
    })
}

// DEPARTMENT CRD OPERATIONS