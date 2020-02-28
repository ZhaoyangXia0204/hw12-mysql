var mysql = require("mysql");
var inquirer = require("inquirer");

var connection = mysql.createConnection({
    host: "localhost",

    // Your port; if not 3306
    port: 3306,

    // Your username
    user: "root",

    // Your password
    password: "19971227qwe",
    database: "addemployeesDB"
});

connection.connect(function (err) {
    if (err) throw err;
    trackEmployee();
});

function trackEmployee() {
    inquirer
        .prompt({
            name: "action",
            type: "list",
            message: "What would you like to do?",
            choices: [
                "add departments",
                "add roles",
                "add employees",
                "view departments",
                "view roles",
                "view employees",
                "update employee roles"
            ]
        })
        .then(function (answer) {
            switch (answer.action) {
                case "add departments":
                    departmentadd();
                    break;

                case "add roles":
                    rolesadd();
                    break;

                case "add employees":
                    employeesadd();
                    break;

                case "view departments":
                    departmentsview();
                    break;

                case "view roles":
                    rolesview();
                    break;

                case "view employees":
                    employeesview();
                    break;

                case "update employee name":
                    rolesupdate();
                    break;
            }
        })
}

function departmentadd() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "departmentName",
                message: "What is the name of the Department you would like to add?"
            }
        ])
        .then(function (res) {
            console.log(res);
            connection.query("insert into department set ?", { name: res.departmentName }, function (err, res) {
                if (err) throw err;
                console.log(`The new department: ${res.departmentName} has been added!`)
                trackEmployee();
            })

        })
};

function rolesadd() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "roleName",
                message: "What is the name of the role you would like to add?"
            }
        ])
        .then(function (res) {
            console.log(res);
            connection.query("insert into roleTable set ?", { title: res.roleName }, function (err, res) {
                if (err) throw err;
                console.log(`The new role: ${res.roleName} has been added!`)
                trackEmployee();
            })
        })
}

function employeesadd() {
    inquirer
        .prompt([
            {
                type: "input",
                name: "firstName",
                message: "What is the employee's first name?"
            },
            {
                type: "input",
                name: "lastName",
                message: "What is the employee's last name?"
            }
        ])
        .then(function (res) {
            console.log(res);
            connection.query("insert into employee set ?",
                {
                    first_name: res.firstName,
                    last_name: res.lastName
                },
                function (err, res) {
                    if (err) throw err;
                    console.log(`The new firstname: ${res.firstName} and the new lastname: ${res.lastName} has been added!`)
                    trackEmployee();
                })
        })
}
function employeesview() {

    let query = "SELECT * from department inner join roleTable on roleTable.department_id = department.id inner join employee on roleTable.id = employee.role_id";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        trackEmployee();
    })

}

function departmentsview(){
    let query = "SELECT name from department";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        trackEmployee();
    })
}
function rolesview(){
    let query = "SELECT title from roleTable";
    connection.query(query, function (err, res) {
        if (err) throw err;
        console.table(res);
        trackEmployee();
    })
}
function rolesupdate(){
    
        connection.query("select * from employee", function (err, res) {
            inquirer.prompt(
                {
                    type: `list`,
                    name: `employee`,
                    message: `Select the employee to update: `,
                    choices: function () {
                        let employees = []
                        res.forEach(element => {
                            employees.push(element.first_name + " " + element.last_name)
                        })
                        return employees;
                    },
                }).then(function (data) {
                    console.log(data); 
                    connection.query("select * from roleTable", function (err, res) {
                        inquirer.prompt(
                            {
                                type: `list`,
                                name: `role`,
                                message: `Select the new role: `,
                                choices: function () {
                                    let roles = []
                                    res.forEach(element => {
                                        roles.push(element.title)
                                    });
                                    return roles;
                                }
                            }).then(function (response) {
                                console.log("Employee: " + data.employee + " New role: " + response.role); 
                                let nameSplit = data.employee.split(" ");
                                let query = "select title from roleTable where ? = title1"; 
                                connection.query(query,
                                    response.role,
                                    function (err, res) {
                                        if (err) throw err;
                                       
                                        console.log(res);
                                        let query2 = "update employee set ? where ? and ?";
                                        connection.query(query2,
                                            [{
                                                role_id: res[0].id
                                            },
                                            {
                                                first_name: nameSplit[0]
                                            },
                                            {
                                                last_name: nameSplit[1]
                                            }
                                            ], function (err, res) {
                                                if (err) throw err;
                                                console.log("Updated!");
                                            })
                                    });
                            });
                    });
                });
        });
    };