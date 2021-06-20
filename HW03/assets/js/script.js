// Assignment Code
var generateBtn = document.querySelector("#generate");
// Write password to the #password input
function writePassword() {
  var password = generatePassword();
  var passwordText = document.querySelector("#password");
  passwordText.value = password;
}
//#####################################################################################################
//My Function for Password Generation
function generatePassword() {
  //Defining constant vars 
  var alphabet = "abcdefghijklmnopqrstuvwxyz";
  //Defining input vars & counters
  var pwCharAvailable = {
    lowerChars: {
      name: "Lowercase",
      isIncluded: false,
      values: alphabet},
    upperChars: {
      name: "Uppercase",
      isIncluded: false,
      values: alphabet.toUpperCase()},
    numbrChars: {
      name: "Numeric",
      isIncluded: false,
      values: "0123456789"},
    speclChars: {
      name: "Special",
      isIncluded: false,
      values: " !\"#$%&'()*+,-./:;<>=?@[]^\\_`{}|~"},
  };
  var pwLength = 0;
  var chartypeEscape = true;
  var pwCharArray = [];
  var pwArray = [];
  var j = 0;
  //We want the ability to re-prompt the user for valid inputs if they don't provide them on the first pass without having to reset completely
  do {
    pwLength = parseInt(this.prompt("How long would you like the password to be?"));
    //validate password requirement is met before proceeding
  } while (validatePwLength(pwLength));
  do {
    for (chartype in pwCharAvailable) {
      pwCharAvailable[chartype].isIncluded = this.confirm(`Would you like to use ${pwCharAvailable[chartype].name} Characters?`);
      //If a character type is true, add it to the full pool of possible characters for out password
      if (pwCharAvailable[chartype].isIncluded) {
        chartypeEscape = false;
        var temparray = Array.from(pwCharAvailable[chartype].values);
        temparray = shuffleMe(temparray);
        pwCharArray = pwCharArray.concat(temparray);
        //manually setting one character of each true type to guarantee the character requirements are met
        pwArray = addToPassword(pwArray, temparray);
        pwLength--;
      }
    }
    //validate password requirement is met before proceeding
  } while (validateCharInputs(chartypeEscape));
  //for the remaining character slots not manually set we want to assign any random character from the full pool
  for (i=0; i < pwLength; i++) {
    pwArray = addToPassword(pwArray, pwCharArray);
  }
  pwArray = shuffleMe(pwArray);
  return pwArray.join("");
}
// function for validating the password length
function validatePwLength(pwLength) {
  var pwLengthMax = 128;
  var pwLengthMin = 8;
  if (isNaN(pwLength)) {
    //alert the user to the requirement and prompt them for their input
    this.alert("The password length must be a numeric value.");
    return true;
  } else if (pwLength < pwLengthMin || pwLength > pwLengthMax) {
    //alert the user to the requirement and prompt them for their input
    this.alert("The password must be between 8 and 128 characters.");
    return true;
  } else {
    return false;
  }
}
// function for validating the character type inputs
function validateCharInputs(boolEscape) {
  if (boolEscape) {
    //alert the user to the requirement and prompt them for their input
    this.alert("You must select at least one valid Character Type.");
    return true;
  } else {
    return false;
  }
}
// function to add random char to pw from pool
function addToPassword(varPW, varPool) {
  varPW = varPW.concat(varPool[Math.floor(Math.random() * varPool.length)]);
  return varPW;
}
// function to shuffle array
function shuffleMe(inputArray) {
  for (i=0; i < inputArray.length - 2; i++) {
    var j = Math.floor((Math.random() * (inputArray.length - i)) + i);
    var shuffle1 = inputArray[i];
    var shuffle2 = inputArray[j];
    inputArray[i] = shuffle2;
    inputArray[j] = shuffle1;
  }
  return inputArray;
}
//#####################################################################################################
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);