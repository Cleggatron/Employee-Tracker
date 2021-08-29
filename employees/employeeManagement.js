const inquirer = require("inquirer");
const mysql = require("mysql2");
const cTable = require("console.table");

require("dotenv").config();


class EmployeeManagement {
    constructor () {
        this.db = "";
    }
    startConnection(){
        this.db = mysql.createConnection(
            {
                host: "localhost",
                user: process.env.DB_USER,
                password: process.env.DB_PASSWORD,
                database: process.env.DB_NAME
            },
            console.log("Connected to the database.")
        )

        this.startManagement()
    }

    startManagement(){
       
        this.employeeOptions();
    }

    employeeOptions(){
        inquirer.prompt([
            {
                type: "list",
                message: "Which action would you like to take?",
                name: "action",
                choices: ["Select all employees.", "Select all departments.", "Select all roles.", "Add a role.", "Add a department."]
            }
        ])
        .then(val => {
            const {action} = val;
            switch(action){
                case "Select all employees." :
                    this.selectAllEmployees();
                    break;

                case "Select all departments." :
                    this.selectAllDepartments();
                    break;

                case "Select all roles." :
                    this.selectAllRoles();
                    break;

                case "Add a role." :
                    this.addRole();
                    break;

                case "Add a department." :
                    this.addDepartment();
                    break;
            }
        })

    }
    //Handle option to continue working
    continueManagement() {
        inquirer.prompt([
            {
                type : "confirm",
                message: "Do you wish to continue?",
                name: "continue"
            }
        ]).then(val => {
            if(val.continue){
                this.employeeOptions()
            } else{
                process.exit();
            }
        })
    }

    selectAllEmployees() {
        this.db.query(
            `SELECT emp.id , 
            CONCAT(emp.first_name, ' ', emp.last_name) AS EmployeeName, 
            role.title, 
            role.salary, 
            department.name, 
            CONCAT(man.first_name, ' ', man.last_name) AS ManagerName 
            FROM 
            employee emp
            LEFT JOIN employee man ON emp.manager_id = man.id
            LEFT JOIN role ON emp.role_id = role.id
            LEFT JOIN department on role.department_id = department.id
            `, (err, results) => {
            console.log("\n");
            console.table(results);
            this.continueManagement()
        })
       
    }

    selectAllDepartments() {
        this.db.query("SELECT * FROM department", (err, results) => {
            console.log("\n");
            console.table(results);
            this.continueManagement()
        })
        
    }

    selectAllRoles() {
        this.db.query(`
        SELECT
        role.id, role.title, role.salary, department.name
        FROM role
        LEFT JOIN department ON department.id = role.department_id
        `, (err, results) => {
            console.log("\n");
            console.table(results);
            this.continueManagement();
        })
        
    }

    addDepartment() {
        inquirer.prompt(
            [
                {
                    type: "input",
                    message: "Please enter the new department name:",
                    name: "deptName"
                }
            ]).then(answer =>{
                const {deptName} = answer;
                this.db.query(`INSERt INTO department(name) VALUES (?)`, deptName, (err, result) =>{
                    if(err){
                        console.log("An error has occured. Please try again!");
                        this.continueManagement()
                    }else{
                        console.log("Department has been sucessfully added!");
                        this.continueManagement();
                    }
                })
            })
    }

    addRole(){
        //Get our departments for teh inquirer prompt
        this.db.query(`SELECT name FROM department`, (err, result) => {
            if(err){
                console.log("An error has occured.")
                this.continueManagement();
            }else{
                //Turn the arrary of objects into an array of strings
                const departments = []
                result.forEach(obj =>{
                    departments.push(obj.name)
                })
                //Start asking for role details
                inquirer.prompt(
                    [
                        {
                            type: "input",
                            message: "Please enter the new role name:",
                            name: "roleName"
                        },
                        {
                            type: "input",
                            message: "Please enter this role's salary:",
                            name: "roleSalary"
                        },
                        {
                            type: "list",
                            message: "Please enter this role's dept:",
                            name: "roleDepartment", 
                            choices: departments
                        }
                    ]
                ).then(answers => {
                    const {roleName, roleSalary, roleDepartment} = answers;
                    console.log(roleName, roleSalary, roleDepartment);
                    //Get our department ID numbe from the typed department.
                    this.db.query(`SELECT id FROM department WHERE name = ?`,roleDepartment ,(err, results) => {
                        if(err){
                            console.log("The specified department does not exist. Please create this or check any spelling errors.");
                            this.continueManagement()
                        } else {
                            //destructure array then object to get the data
                            const [idObj] = results;
                            const {id} = idObj;
                            this.db.query(`INSERT INTO role (title, salary, department_id) VALUES (?,?,?)`, [roleName, roleSalary, id], (err, results) => {
                                if(err){
                                    console.log(err);
                                    this.continueManagement
                                }else{
                                    console.log("Role Sucessfully Added!");
                                    this.continueManagement();
                                }
                            })
                        }
        
                    })
                })
        
                }
            }   
        )
    }


}

module.exports = EmployeeManagement;

