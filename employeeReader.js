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
                case "Exit":
                    connection.end();
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
    return inquirer
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
                type: "input",
                message: "Role: "
            },
            {
                name: "department",
                type: "input",
                message: "Department: "
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
            
            var query = "INSERT INTO employees SET ?";
            connection.query(query, 
                {
                    first_name: firstName,
                    last_name: lastName,
                    role: role,
                    department: department,
                    salary: salary,
                    manager: manager
                },
                (err, res) => {
                if (err) throw err;
                askWhatToDo();
            });
        });
}