const mysql = require('mysql');
const inquirer = require('inquirer');
const consoleTable = require('console.table');


const db = mysql.createConnection({
    host: 'localhost',
    port: 3306,
    user: 'root',
    password: 'KitKat6934',
    database: 'employee_db'
});

db.connect(function(err) {
    if (err) throw err;
    runSearch();
});

const menuExit = () => {
    return inquirer
        .prompt({
            name: 'choice',
            type: 'list',
            message: 'Would you like to go back to the main menu or exit?',
            choices: [
                'Main Menu',
                'Exit'
            ]
        })
        .then(answer => {
            if (answer.choice === 'Main Menu') {
                runSearch();
            } else {
                db.end();
            }
        })
}

function runSearch() {
    inquirer
        .prompt({
           name: 'action',
           type: 'rawlist',
           message: 'What would you like to do?',
           choices: [
               'View all departments',
               'View all roles',
               'View all employees',
               'Add department',
               'Add role',
               'Add employee',
               'Update employee role',
               'Exit'
           ] 
        })

        .then(function(answer) {
            switch(answer.action) {
                case 'View all departments':
                    viewDepartments();
                    break;

                case 'View all roles':
                    viewRoles();
                    break;

                case 'View all employees':
                    viewEmployees();
                    break;

                case 'Add department':
                    addDepartment();
                    break;

                case 'Add role':
                    addRole();
                    break;

                case 'Add employee':
                    addEmployee();
                    break;

                case 'Update employee role':
                    updateRole();
                    break;

                case 'Exit':
                    db.end();
                    break;    
            }
        });

}

function viewDepartments() {
    const query = 'SELECT * from department';
    db.query(query, (err, res) => {
        if(err) throw err;
        console.log(res)
        console.table('All departments:', res);
        menuExit();
    });
}

function viewRoles() {
    const query = 'SELECT * from role';
    db.query(query, (err, res) => {
        if(err) throw err;
        console.table('All roles:', res)
        menuExit();
    });
}

function viewEmployees() {
    const query = 'SELECT * from employee';
    db.query(query, (err, res) => {
        if(err) throw err;
        console.table('All employees:', res)
        menuExit();
    });
}

function addDepartment() {
    inquirer
        .prompt({
            name: 'department',
            type: 'input',
            message: 'Enter a new department'
        })
        .then(function(answer) {
            db.query('INSERT INTO department SET ?', 
            { 
                name: answer.department 
            });

            const query = 'SELECT * FROM department';
            db.query(query, function(err, res) {
                if(err) throw err;
                console.table('All departments:', res);
                menuExit();
            })
        });
}

function addRole() {
    inquirer
        .prompt([
            {
                name: 'role',
                type: 'input',
                message: 'Enter a new role'
            },
            {
                name: 'salary',
                type: 'input',
                message: 'Enter a salary for the new role'
            },
            {
                name: 'departmentId',
                type: 'input',
                message: 'Enter a deparment id for the new role'
            }
        ])
        .then(function(answer) {
            db.query('INSERT INTO role SET ?',
            {
                title: answer.role,
                salary: answer.salary,
                department_id: answer.departmentId
            });
            const query = 'SELECT * FROM role';
            db.query(query, function(err, res) {
                if(err) throw err;
                console.table('All roles:', res);
                menuExit();
            })
        });
}

function addEmployee() {
    inquirer
        .prompt([
            {
                name: 'first_name',
                type: 'input',
                message: 'Enter the first name of the new employee'
            },
            {
                name: 'last_name',
                type: 'input',
                message: 'Enter the last name of the new employee'
            },
            {
                name: 'role_id',
                type: 'input',
                message: 'Enter the role of the new employee'
            }
        ])
        .then(function(answer) {
            db.query('INSERT INTO employee SET ?',
            {
                first_name: answer.first_name,
                last_name: answer.last_name,
                role_id: answer.role_id,
                manager_id: answer.manager_id
            })

            const query = 'SELECT * FROM employee';
            db.query(query, function(err, res) {
                if(err) throw err;
                console.table('All employees:', res);
                menuExit();
            })
        });
}

const updateRole = function() {
    db.query('SELECT first_name, last_name FROM employee', function(err, res) {

        if (err) {throw err};

        let employee = [];

        for (let i = 0; i < res.length; i++) {
            employee.push(`${res[i].first_name} ${res[i].last_name}`);
        }

        db.query('SELECT title FROM role', function(err, res) {
        
            if (err) {throw err};
            
            let role = [];
    
            for (let i = 0; i < res.length; i++) {
                role.push(res[i].title);
            }

            inquirer.prompt([
            {
                name: 'name',
                type: 'list',
                message: 'Which employee would you like to update?',
                choices: employee
            },
            {
                name: 'role',
                type: 'list',
                message: 'What is thier new role?',
                choices: role
            }
            ])
            .then(function(answer) {

                const firstName = answer.name.split(' ')[0];
                const lastName = answer.name.split(' ')[1];

                db.query('SELECT id FROM role WHERE ?', { title: answer.role }, function(err, res) {

                    if (err) { throw err };

                    const roleId = res[0].id;

                    db.query('SELECT id FROM employee WHERE ? AND ?', [{ first_name: firstName }, { last_name: lastName }], function(err, res) {

                        if (err) {throw err};

                        const empId = res[0].id;

                        db.query(
                            'UPDATE employee SET ? WHERE ?',
                            [ { role_id: roleId }, { id: empId } ],
                            (err, res) => {
                                if (err) throw err;

                                console.log(`${firstName} ${lastName}'s role has been changed.`);

                                menuExit();
                            }
                        )});
                })});
        })});
}