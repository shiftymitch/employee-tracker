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
        updateManager
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
            }
        });
}

function viewAll() {
    var query = "SELECT * FROM employees";
    connection.query(query, (err, res) => {
        console.log('\n');
        console.table(res);
        askWhatToDo();
    })
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