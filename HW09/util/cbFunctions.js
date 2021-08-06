// required imports for application
const fs = require("fs");
// function to return user query list
const handleUserQuery = licenses => [
    {
        type: "input",
        name: "projectTitle",
        message: "Enter Project Title: "
    },{
        type: "editor",
        name: "projectDesc",
        message: "Enter a Short Description: "
    },{
        type: "input",
        name: "projectInstallInst",
        message: "Installation Instructions: ",
        default: "npm install"
    },{
        type: "input",
        name: "projectUsage",
        message: "Usage Information: ",
        default: "npm start"
    },{
        type: "input",
        name: "projectTestInst",
        message: "Test Instructions: ",
        default: "npm test"
    },{
        type: "list",
        name: "projectLicense",
        message: "Choose License Type: ",
        choices: licenses.map(license => license.name),
        default: 19
    },{
        type: "input",
        name: "projectContribute",
        message: "Contributors: ",
        default: "N/A"
    },{
        type: "input",
        name: "userGithub",
        message: "Enter your Github Username: ",
        default: "developer"
    },{
        type: "input",
        name: "userEmail",
        message: "Enter your Email Address: ",
        default: "user@example.com",
        validate: function(input) {
            const re = /^(([^<>()[\]\\.,;:\s@\"]+(\.[^<>()[\]\\.,;:\s@\"]+)*)|(\".+\"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/; //RegEx validation for email address
            var done = this.async();
            while (!re.test(input)) {done("Please Enter a valid Email Address: ");return;}
            done(null, true);
        }
    }
];
// Function to handle Readme Creation
const handleData = (data, license) => 
`
# ${data.projectTitle}      [![License](${license.badge})](${license.link})

## Description

${data.projectDesc}

## Table of Contents

1.[Installation](#installation)

2.[Usage](#usage)

3.[Credits](#credits)

4.[License](#license)

5.[Test](#test)

6.[Questions](#Questions)

## Installation

### Packages
${displayDependencies()}
### Instructions

> ${data.projectInstallInst}

## Usage

> ${data.projectUsage}

## Credits

##### ${data.projectContribute}

## License

### ${data.projectLicense}

##### License information can be found [here](${license.link})

## Test

> ${data.projectTestInst}

## Questions

##### If you would like to contribute or have any questions regarding this project, please reach out to the Developer. 

*Github:* [${data.userGithub}](https://www.github.com/${data.userGithub})

*Email:* ${data.userEmail}
`;
// Function to read license data from json
const readLicenseData = () => {
    /*
    License information provided by shields.io and aggregated here:
    https://gist.github.com/lukas-h/2a5d00690736b4c3a7ba#file-license-badges-md
    I scraped the information in the markdown file to create the license objects for my Readme generator.
    */
    const licensesRaw = fs.readFileSync('./licenses.json', 'utf8', err => err ? console.error(err): console.log('Success! Licenses read from file!'));
    return JSON.parse(licensesRaw);
}
// Function to read dependancy data from package.json
const readDependencies = () => {
    const rawData = fs.readFileSync('./package.json', 'utf8', err => err ? console.error(err): console.log('Success! Licenses read from file!'));
    const dependencies = JSON.parse(rawData).dependencies;
    return Object.keys(dependencies);
}
// Function to display dependencies
const displayDependencies = () => {
    const dependencies = readDependencies();
    let displayString = "";
    dependencies.forEach(elem => displayString += `\n##### ${elem}\n`);
    return displayString;
}
// Function to write file
const writeToFile = (textData) => fs.writeFile(`./README.md`, textData, err => err ? console.error(err): console.log('Success! Readme Created!'));
// module exports
module.exports = {
    handleData,
    handleUserQuery,
    readLicenseData,
    writeToFile,
};
// TEST to find index of the MIT license for default value
// let testvar = readLicenseData();
// for (i in testvar) if (testvar[i].name.includes("MIT")) console.log(i, testvar[i])