const inquirer = require("inquirer");

class EmployeeManagement {
    constructor () {
    }

    startManagement(){
        this.employeeOptions();
    }

    employeeOptions(){
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

