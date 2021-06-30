# Javascript Quiz
[Here](https://shobes572.github.io/HW04/) is the live link.

## Requirements
1. The quiz is timed
2. The quiz is about Javascript fundamentals
3. Scores need to be tracked and saved to the user can see progress

## Notes
### File Structure
For this Homework Assignment and the development of this application, I decided it would make sense to contain my javascript in two files.  One file holds the global variable definitions and the small utility functions.  The second file hold more of the guts of the functionality with the timers and event listeners.

### Transitions
After considering a few options, I decided that especially with the utility provided with Bootstrap, I can use the `d-none` class to hide and show blocks of html on the screen on certain transition events
Quiz start -> hide jumbotron, show quiz form
Quiz end -> hide quiz form, show score submit form
submit score -> hide submit score form, prompt user to play again
play again -> hide prompt form, show quiz form

### Displaying Highscores
I chose to display the highscores as a dropdown in the navbar so it is always accessible to the user, right next to the score and timer for their current quiz session.

### Future
just with the time restraint, I did not have the opportunity to implement some features I really thought were necessary for the application.
1. shuffle the answers for the question each time they show on screen so the correct answer is never in the same spot
2. shuffle the order in which the questions appear for the user
3. expand the available questions, preferrably through webscraping
4. more robust validation
5. accept user input through clicks in addition to keyboard