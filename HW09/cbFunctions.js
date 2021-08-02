// required imports for application
const fs = require("fs");
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

5.[Badges](#badges)

6.[Features](#features)

7.[Contribute](#contribute)

8.[Tests](#tests)

## Installation

>${data.projectInstallInst}

## Usage

##### ${data.projectUsage}

## Credits

##### ${data.projectContribute}

## License

### ${data.projectLicense}

##### License information can be found [here](${license.link})

## Test

##### ${data.projectTestInst}

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
// Function to write file
const writeToFile = (textData) => fs.writeFile(`./README.md`, textData, err => err ? console.error(err): console.log('Success! Readme Created!'));
// module exports
module.exports = {
    handleData,
    readLicenseData,
    writeToFile,
};