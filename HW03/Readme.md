# Password Generator
[Here](https://shobes572.github.io/HW03/) is the live link.

## Requirements
1. User has the option to select the password length between 8 - 128 characters long
2. User is prompted for each Character type if it's desired in the Password with a minimum of 1 character type
3. Password is randomly generated
4. Password is displayed in the central card on the site

## Notes
### Variable definition
I decided to approach this with the mindset of keeping _like_ or _familial_ variables grouped.  That would entail that the characters __should__ be grouped with a boolean value of whether or not they will be used for the password generation.  Then grouped all of the character types together in an object.  The possible characters for each type are held in a string that can be split up and used down the line.

`var alphabet = "abcdefghijklmnopqrstuvwxyz";
var pwCharAvailable = {
    lowerChars: [false, alphabet],
    upperChars: [false, alphabet.toUpperCase()],
    numbrChars: [false, "0123456789"],
    speclChars: [false, " !\"#$%&'()*+,-./:;<>=?@[]^\\_``{}|~"]
  }`
### Input for Password Length
One of the things that, _although not a requirement_, I decided to put into the application is user-proofing the prompt and explicitly stating the requirements upfront before they do anything.
Once started, the user will enter a `do...while` loop that will only proceed once we have a valid integer value from them.

`parseInt(this.prompt("How long would you like the password to be?"))`

Since the `.prompt()` method returns a string, the user could hypothetically input a string value with length between the set parameters and the script would continue going.  the `parseInt()` method will guarantee us a numeric value and by adding in another check within the loop, we can re-prompt the user by checking for NaN's with the `isNaN()` method.

`(isNaN(pwLength)) || (pwLength < pwLengthMin || pwLength > pwLengthMax)`
### Input for Character Types
The user will enter another `do...while` loop using the `.confirm()` method to return a boolean value for each character type when prompted.  If the user returns false for all four, the loop will continue until at least one returns true

`!pwCharAvailable.lowerChars[0] && !pwCharAvailable.upperChars[0] && !pwCharAvailable.numbrChars[0] && !pwCharAvailable.speclChars[0]`
### Adding characters to the Password Array
The first step is to _guarantee_ for the user that each selected character type will appear at least once in the final password.  This is done by manually injecting one random character for each `true` character type into an available slot of the password with a `for..in` loop after using the `Array.from()` method to turn the character strings into Arrays. Then the character array is added to a _pwCharArray_ using the `.concat()` method to generate a pool of possible characters to fill the rest of the available password character slots which is handled by another `for` loop for the remaining unset pw character length.
### Shuffling
Although there is a large degree of randomness present with the character insertions, there is still a _pattern_.  When we manually inject the first characters to guarantee type inclusion they will end up falling into a pattern of:
1. lowercase
2. uppercase
3. number
4. special

before continuing with total randomness.  After doing a little bit of research, I landed on using a [Fisher Yates Shuffle](https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle#The_modern_algorithm) algorithm to rectify the gap in randomness of the password.
### Finale
Once shuffled, the array will be joined using the `.join("")` method and returned from the function and injected into the html textbox.