// CRD Operations for Roles
// view all roles (READ)
function viewAllRoles() {
    const sql = `SELECT * FROM roles;`
    db.query(sql, (err, rows) => {
        if (err) {
            console.log(err.message);
            return;
        }
        console.table(rows);
        startPrompt ();
    });
};

// add role (CREATE)
function addRole () {

};

// delete role (DELETE)
function deleteRole () {

};

module.exports = {
    viewAllRoles,
    addRole, 
    deleteRole
};