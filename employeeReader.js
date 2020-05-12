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
                    //envoke function
                    break;
                case viewAllByDepartment:
                    //envoke function
                    break;
                case viewAllByRole:
                    //envoke function
                    break;
                case addEmployee:
                    //envoke function
                    break;
                case removeEmployee:
                    //envoke function
                    break;
                case updateRole:
                    //envoke function
                    break;
                case updateManager:
                    //envoke function
                    break;
            }
        });
}