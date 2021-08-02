// required imports for application
const inquirer = require("inquirer");
const cbF = require("./cbFunctions.js");

// Function to initialize app
const init = () => {
    const licenses = cbF.readLicenseData();
    inquirer
        .prompt([
            {
                type: "input",
                name: "projectTitle",
                message: "Enter Project Title: "
            },{
                type: "input",
                name: "projectDesc",
                message: "Enter a Short Description: "
            },{
                type: "input",
                name: "projectInstallInst",
                message: "Installation Instructions: "
            },{
                type: "input",
                name: "projectUsage",
                message: "Usage Information: "
            },{
                type: "input",
                name: "projectContribute",
                message: "Contribution Guidelines: "
            },{
                type: "input",
                name: "projectTestInst",
                message: "Test Instructions: "
            },{
                type: "list",
                name: "projectLicense",
                message: "Choose License Type: ",
                choices: licenses.map(license => license.name)
            },{
                type: "input",
                name: "userGithub",
                message: "Enter your Github Username: "
            },{
                type: "input",
                name: "userEmail",
                message: "Enter your Email Address: ",
                validate: function(input) {
                    const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //RegEx validation for email address
                    var done = this.async();
                    while (!re.test(input)) {done("Please Enter a valid Email Address: ");return;}
                    done(null, true);
                }
            }
        ])
        .then(data => {
            let selectedLicense = licenses.filter(license => license.name === data.projectLicense)[0];
            cbF.writeToFile(cbF.handleData(data, selectedLicense));
        });
}
// Function call to initialize app
init();