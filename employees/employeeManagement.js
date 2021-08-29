const inquirer = require("inquirer");
const mysql = require("mysql2");

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
                choices: ["Select all employees.", "Select all departments.", "Select all roles."]
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

                case "" :

                break;

                default:

                    break;
            }
        })

    }
    //Handle 
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
                return;
            }
        })
    }

    selectAllEmployees() {
        this.db.query("SELECT * FROM employee", (err, results) => {
            console.log(results);
        })
        this.continueManagement()
    }

    selectAllDepartments() {
        this.db.query("SELECT * FROM department", (err, results) => {
            console.log(results);
        })
        this.continueManagement()
    }

    selectAllRoles() {
        this.db.query("SELECT * FROM role", (err, results) => {
            console.log(results);
        })
        this.continueManagement();
    }
}

module.exports = EmployeeManagement;

