const inquirer = require("inquirer");

class EmployeeManagement {
    constructor () {
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

                break;

                case "Select all roles." :

                break;

                case "Select all roles." :

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
}

module.exports = EmployeeManagement;

