// required imports for application
const inquirer = require("inquirer");
const cbF = require("./util/cbFunctions.js");

// Function to initialize app
const init = () => {
    const licenses = cbF.readLicenseData();
    inquirer
        .prompt(cbF.handleUserQuery(licenses))
        .then(data => {
            let selectedLicense = licenses.filter(license => license.name === data.projectLicense)[0];
            cbF.writeToFile(cbF.handleData(data, selectedLicense));
        });
}
// Function call to initialize app
init();