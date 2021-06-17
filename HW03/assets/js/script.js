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
  var pwLengthMax = 128;
  var pwLengthMin = 8;
  var pwCharAvailable = {
    lowerChars: [false, "abcdefghijklmnopqrstuvwxyz"],
    upperChars: [false, "abcdefghijklmnopqrstuvwxyz".toUpperCase()],
    numbrChars: [false, "0123456789"],
    speclChars: [false, " !\"#$%&'()*+,-./:;<>=?@[]^\\_`{}|~"]
  };
  //Defining input vars & counters
  var pwLength = 0;
  var randLength = 0;
  var pwCharArray = [];
  var pwArray = [];
  var j = 0;
  //We want the ability to re-prompt the user for valid inputs if they don't provide them on the first pass without having to reset completely
  while (true) {
    try {
      pwLength = this.prompt("How long would you like the password to be?");
      console.log(typeof(pwLength));
      if (typeof(pwLength) !== Number) {
        throw new Error("The input for Password Length must be an number");
      } else if (pwLength < pwLengthMin || pwLength > pwLengthMax) {
        throw new Error("The input for Password Length must be between 8 and 128");
      } else {
        pwLength = Math.floor(pwLength);
        break;
      }
    } catch (e) {
      this.alert("Input Error:", e.message)
      continue;
    }
  }
} //premature end to test the function
function dummy() {
  do {
    //alert the user to the requirement and prompt them for their input
    this.alert("The password must be between 8 and 128 characters.");
    pwLength = this.prompt("How long would you like the password to be?");
    //validate password requirement is met before proceeding
  } while (pwLength < pwLengthMin || pwLength > pwLengthMax);
  do {
    //alert the user to the requirement and prompt them for their input
    this.alert("You must select at least one valid Character Type.");
    pwCharAvailable.lowerChars[0] = this.confirm("Would you like to use Lowercase Characters?");
    pwCharAvailable.upperChars[0] = this.confirm("Would you like to use Uppercase Characters?");
    pwCharAvailable.numbrChars[0] = this.confirm("Would you like to use Numeric Characters?");
    pwCharAvailable.speclChars[0] = this.confirm("Would you like to use Special Characters?");
    //validate password requirement is met before proceeding
  } while (!pwCharAvailable.lowerChars[0] && !pwCharAvailable.upperChars[0] && !pwCharAvailable.numbrChars[0] && !pwCharAvailable.speclChars[0]);
  //If a character type is true, add it to the full pool of possible characters for out password
  for (i in pwCharAvailable) {
    if (pwCharAvailable[i][0]) {
      var temparray = Array.from(pwCharAvailable[i][1]);
      pwCharArray = pwCharArray.concat(temparray);
      //manually setting one character of each true type to guarantee the character requirements are met
      pwArray = pwArray.concat(temparray[Math.floor(Math.random() * temparray.length)]);
      pwLength--;
    }
  }
  //for the remaining character slots not manually set we want to assign any random character from the full pool
  for (i=0; i < pwLength; i++) {
    pwArray = pwArray.concat(pwCharArray[Math.floor(Math.random() * pwCharArray.length)])
  }
  //Implementing a shuffle function for the Character Array to remove the the setting for the character guarantee
  //https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm
  for (i=0; i < pwArray.length - 2; i++) {
    var j = Math.floor((Math.random() * (pwArray.length - i)) + i);
    var shuffle1 = pwArray[i];
    var shuffle2 = pwArray[j];
    pwArray[i] = shuffle2;
    pwArray[j] = shuffle1;
  }
  return pwArray.join("");
}
//#####################################################################################################
// Add event listener to generate button
generateBtn.addEventListener("click", writePassword);