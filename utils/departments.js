// CRD Operations for Departments
// view all departments (READ)
function viewAllDepartments() {
    const sql = `SELECT * FROM departments;`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        startPrompt();
    });
};

// add department (CREATE)
function addDepartment () {

};

// delete department (DELETE)
function deleteDepartment () {

};

module.exports = {
    viewAllDepartments, 
    addDepartment, 
    deleteDepartment
};