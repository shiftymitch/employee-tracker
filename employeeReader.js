//! App Setup \\
    const mysql = require('mysql');
    const inquirer = require('inquirer');
    const connection = mysql.createConnection({
        host: "localhost",
        port: 3306,
        user: "root",
        password: "password",
        database: "employee_db"
    });

//! Initialize App \\
    connection.connect(err => {
        if (err) throw err;
        askWhatToDo();
    });

//! Main Menu - Ask What To Do \\
    function askWhatToDo() {
        const viewAllEmployees = "View All Employees";
        const viewAllDepartments = "View All Departments";
        const viewAllRoles = "View All Roles";
        const viewAllByDepartment = "View All Employees - by Department";
        const viewAllByRole = "View All Employees - by Role";
        const addEmployee = "Add New Employee";
        const addNewRole = "Add New Role";
        const addNewDepartment = "Add New Department";
        const removeEmployee = "Remove Employee";
        const updateRole = "Update Employee Role";
        const updateManager = "Update Employee Manager";

        const choices = [
            viewAllEmployees, 
            viewAllDepartments, 
            viewAllRoles, 
            viewAllByDepartment,
            viewAllByRole,
            addEmployee,
            addNewRole,
            addNewDepartment,
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
                        viewAllEmp();
                        break;
                    case viewAllDepartments:
                        viewAllDepts();
                        break;
                    case viewAllRoles:
                        viewAllRol();
                        break;
                    case viewAllByDepartment:
                        viewAllByDep();
                        break;
                    case viewAllByRole:
                        viewAllRole();
                        break;
                    case addEmployee:
                        addEmp();
                        break;
                    case addNewRole:
                        addRole();
                        break;
                    case addNewDepartment:
                        addDept();
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

//! View All Employees \\
    function viewAllEmp() {
        var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.department_id, department.department_name ";
        query += "FROM employee ";
        query += "INNER JOIN role ON (employee.role_id = role.id) ";
        query += "INNER JOIN department ON (role.department_id = department.id)";
        connection.query(query, (err, res) => {
            console.log('\n');
            console.table(res);
            askWhatToDo();
        });
    }

//! View All Departments \\
    function viewAllDepts() {
        var query = "SELECT * FROM department ";
        connection.query(query, (err, res) => {
            console.table(res);
            askWhatToDo();
        });
    }
    
//! View All Roles \\
    function viewAllRol() {
        var query = "SELECT * FROM role ";
        connection.query(query, (err, res) => {
            console.table(res);
            askWhatToDo();
        });
    }

//! View All Employees - By Department \\
    function viewAllByDep() {
        let choices = [
            "accounting", 
            "engineering", 
            "legal", 
            "senior management", 
            "sales"
        ];

        inquirer
            .prompt({
                name: "department",
                type: "rawlist",
                message: "What department would you like to search for?",
                choices: choices
            })
            .then(function (answer) {
                console.log(answer);
                var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.department_id, department.department_name ";
                query += "FROM employee ";
                query += "LEFT JOIN role ON (employee.role_id = role.id) ";
                query += "RIGHT JOIN department ON (role.department_id = department.id)";
                query += "WHERE ?";
                connection.query(query, { department_name: answer.department }, (err, res) => {
                    console.table(res);
                    askWhatToDo();
                });
            });
    }

//! View All Employees - By Role \\
    function viewAllRole() {
        let choices = [
            "accountant", 
            "business manager", 
            "engineer", 
            "lawyer", 
            "lead engineer",
            "partner",
            "salesperson",
            "sales manager"
        ];
        
        inquirer
            .prompt({
                name: "title",
                type: "rawlist",
                message: "What role would you like to search for?",
                choices: choices
            })
            .then(function (answer) {
                console.log(answer);
                var query = "SELECT employee.id, employee.first_name, employee.last_name, employee.role_id, employee.manager_id, role.title, role.salary, role.department_id, department.department_name ";
                query += "FROM employee ";
                query += "LEFT JOIN role ON (employee.role_id = role.id) ";
                query += "RIGHT JOIN department ON (role.department_id = department.id)";
                query += "WHERE ?";
                connection.query(query, { title: answer.title }, (err, res) => {
                    console.table(res);
                    askWhatToDo();
                });
            });
    }

//! Add New Employee \\
    function addEmp() {
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
                    name: "role_id",
                    type: "rawlist",
                    message: "Role: ",
                    choices: [
                        "accountant", 
                        "business manager", 
                        "engineer", 
                        "lawyer", 
                        "lead engineer",
                        "partner",
                        "salesperson",
                        "sales manager"
                    ]
                },
                {
                    name: "manager_id",
                    type: "input",
                    message: "Manager: "
                }
            ])
            .then(function (answer) {
                let roleId = "";

                switch (answer.role_id) {
                    case "accountant":
                        roleId = 1;
                        break;
                    case "business manager":
                        roleId = 2;
                        break;
                    case "engineer":
                        roleId = 3;
                        break;
                    case "lawyer":
                        roleId = 4;
                        break;
                    case "lead engineer":
                        roleId = 5;
                        break;
                    case "partner":
                        roleId = 6;
                        break;
                    case "salesperson":
                        roleId = 7;
                        break;
                    case "sales manager":
                        roleId = 8;
                        break;
                }

                const firstName = answer.first_name;
                const lastName = answer.last_name;
                const managerId = answer.manager_id;

                const newEmployee = {
                    first_name: firstName,
                    last_name: lastName,
                    role_id: roleId,
                    manager_id: managerId
                }
                
                var query = "INSERT INTO employee SET ?";
                connection.query(query, newEmployee,
                    (err, res) => {
                    if (err) throw err;
                    askWhatToDo();
                });
            });
    }

//! Add New Role
    function addRole() {
        console.log("Please provide the following details for the new Role: ")
        inquirer
            .prompt([
                {
                    name: "title",
                    type: "input",
                    message: "Role Title: "
                },
                {
                    name: "salary",
                    type: "input",
                    message: "Salary: "
                },
                {
                    name: "department_id",
                    type: "rawlist",
                    message: "Department: ",
                    choices: [
                        "accounting", 
                        "engineering", 
                        "legal", 
                        "senior management", 
                        "sales"
                    ]
                }
            ])
            .then(function (answer) {
                let deptId = "";

                switch (answer.department_id) {
                    case "accounting":
                        deptId = 1;
                        break;
                    case "engineering":
                        deptId = 2;
                        break;
                    case "legal":
                        deptId = 3;
                        break;
                    case "senior management":
                        deptId = 4;
                        break;
                    case "sales":
                        deptId = 5;
                        break;
                }

                const title = answer.title;
                const salary = answer.salary;

                const newRole = {
                    title: title,
                    salary: salary,
                    department_id: deptId
                }
                
                var query = "INSERT INTO role SET ?";
                connection.query(query, newRole,
                    (err, res) => {
                    if (err) throw err;
                    askWhatToDo();
                });
            });
    }

//! Add New Department
    function addDept() {
        console.log("Please provide the following details for the new Department: ")
        inquirer
            .prompt([
                {
                    name: "department_name",
                    type: "input",
                    message: "Department Name: "
                }
            ])
            .then(function (answer) {
                var query = "INSERT INTO department SET ?";
                connection.query(query, { department_name: answer.department_name},
                    (err, res) => {
                    if (err) throw err;
                    askWhatToDo();
                });
            });
    }

//! Remove Employee \\
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
                connection.query("DELETE FROM employee WHERE ?", { id: answer.id }, (err, res) => {
                    if (err) throw err;
                    askWhatToDo();
                })
            });
    }

//! Update Employee Role \\
    function updateR() {
        inquirer
            .prompt([
                {
                    name: "id",
                    type: "input",
                    message: "Please enter the Employee ID of the Employee you'd like to update: "
                },
                {
                    name: "title",
                    type: "rawlist",
                    message: "New Role: ",
                    choices: [
                        "accountant", 
                        "business manager", 
                        "engineer", 
                        "lawyer", 
                        "lead engineer",
                        "partner",
                        "salesperson",
                        "sales manager"
                    ]
                }
            ])
            .then(function (answer) {
                let roleId = "";
                switch (answer.title) {
                    case "accountant":
                        roleId = 1;
                        break;
                    case "business manager":
                        roleId = 2;
                        break;
                    case "engineer":
                        roleId = 3;
                        break;
                    case "lawyer":
                        roleId = 4;
                        break;
                    case "lead engineer":
                        roleId = 5;
                        break;
                    case "partner":
                        roleId = 6;
                        break;
                    case "salesperson":
                        roleId = 7;
                        break;
                    case "sales manager":
                        roleId = 8;
                        break;
                }
                
                connection.query("UPDATE employee SET ? WHERE ?", 
                [
                    { role_id: roleId },
                    { id: answer.id }
                ], 
                (err, res) => {
                    if (err) throw err;
                    askWhatToDo();
                })
            });
    }

//! Update Employee Manager
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