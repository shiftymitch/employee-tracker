const mysql = require('mysql');
const inquirer = require('inquirer');
const connection = mysql.createConnection({
    host: "localhost",
    port: 3306,
    user: "root",
    password: "password",
    database: "employee_db"
});

connection.connect(err => {
    if (err) throw err;
    askWhatToDo();
});

function askWhatToDo() {
    const viewAllEmployees = "View All Employees";
    const viewAllByDepartment = "View All Employees - by Department";
    const viewAllByRole = "View All Employees - by Role";
    const addEmployee = "Add Employee";
    const removeEmployee = "Remove Employee";
    const updateRole = "Update Employee Role";
    const updateManager = "Update Employee Manager";

    const choices = [
        viewAllEmployees, 
        viewAllByDepartment,
        viewAllByRole,
        addEmployee,
        removeEmployee,
        updateRole,
        updateManager,
        "Exit"
    ];

    inquirer
        .prompt({
            name: "action",
            type: "rawlist",
            message: "What would you like to do?",
            choices: choices
        })
        .then(answer => {
            switch (answer.action) {
                case viewAllEmployees:
                    viewAll();
                    break;
                case viewAllByDepartment:
                    viewAllDep();
                    break;
                case viewAllByRole:
                    viewAllRole();
                    break;
                case addEmployee:
                    add();
                    break;
                case removeEmployee:
                    remove();
                    break;
                case updateRole:
                    updateR();
                    break;
                case updateManager:
                    updateM();
                    break;
                case "Exit":
                    connection.end();
            }
        });
}

function viewAll() {
    var query = "SELECT employee.id, employee.first_name, employee.last_name, role.title, role.salary, department.id, department.department_name ";
    query += "FROM employee ";
    query += "INNER JOIN role ON (employee.role_id = role.id) ";
    query += "INNER JOIN department ON (role.department_id = department.id)";
    connection.query(query, (err, res) => {
        console.log('\n');
        console.table(res);
        askWhatToDo();
    });
}

function viewAllDep() {
    inquirer
        .prompt({
            name: "department",
            type: "input",
            message: "What department would you like to search for?"
        })
        .then(function (answer) {
            var query = "SELECT * FROM employees WHERE ?";
            connection.query(query, {department: answer.department}, (err, res) => {
                console.table(res);
                askWhatToDo();
            });
        });
}

function viewAllRole() {
    inquirer
        .prompt({
            name: "role",
            type: "input",
            message: "What role would you like to search for?"
        })
        .then(function (answer) {
            var query = "SELECT * FROM employees WHERE ?";
            connection.query(query, {role: answer.role}, (err, res) => {
                console.table(res);
                askWhatToDo();
            });
        });
}

function add() {
    inquirer
        .prompt([
            {
                name: "first_name",
                type: "input",
                message: "First Name: "
            },
            {
                name: "last_name",
                type: "input",
                message: "Last Name: "
            },
            {
                name: "role",
                type: "rawlist",
                message: "Role: ",
                choices: [
                    "Accountant",
                    "Lead Engineer",
                    "Legal Team Lead",
                    "Lawyer",
                    "Manager",
                    "Sales Lead",
                    "Salesperson",
                    "Software Engineer"
                ]
            },
            {
                name: "department",
                type: "rawlist",
                message: "Department: ",
                choices: [
                    "Accounting",
                    "Customer Service",
                    "Engineering",
                    "Legal",
                    "Management",
                    "Sales",
                    "Technical Support"
                ]
            },
            {
                name: "salary",
                type: "input",
                message: "Salary: "
            },
            {
                name: "manager",
                type: "input",
                message: "Manager: "
            }
        ])
        .then(function (answer) {
            const firstName = answer.first_name;
            const lastName = answer.last_name;
            const role = answer.role;
            const department = answer.department;
            const salary = answer.salary;
            const manager = answer.manager;

            const newEmployee = {
                first_name: firstName,
                last_name: lastName,
                role: role,
                department: department,
                salary: salary,
                manager: manager
            }
            
            var query = "INSERT INTO employees SET ?";
            connection.query(query, newEmployee,
                (err, res) => {
                if (err) throw err;
                askWhatToDo();
            });
        });
}

function remove() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Please enter the id # of the Employee you'd like to remove: "
            }
        ])
        .then(function (answer) {
            connection.query("DELETE FROM employees WHERE ?", { id: answer.id }, (err, res) => {
                if (err) throw err;
                askWhatToDo();
            })
        });
}

function updateR() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Please enter the id # of the Employee you'd like to update: "
            },
            {
                name: "role",
                type: "input",
                message: "New Role: "
            }
        ])
        .then(function (answer) {
            connection.query("UPDATE employees SET ? WHERE ?", 
            [
                { role: answer.role },
                { id: answer.id }
            ], 
            (err, res) => {
                if (err) throw err;
                askWhatToDo();
            })
        });
}

function updateM() {
    inquirer
        .prompt([
            {
                name: "id",
                type: "input",
                message: "Please enter the id # of the Employee you'd like to update: "
            },
            {
                name: "manager",
                type: "input",
                message: "New Manager: "
            }
        ])
        .then(function (answer) {
            connection.query("UPDATE employees SET ? WHERE ?", 
            [
                { manager: answer.manager },
                { id: answer.id }
            ], 
            (err, res) => {
                if (err) throw err;
                askWhatToDo();
            })
        });
}