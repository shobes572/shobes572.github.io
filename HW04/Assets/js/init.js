// This file is to contain variable definitions and a little function to create a highscore list object to display before the list can fill up;
var daddyElement = $("body");
var btnBeginQuiz = $("#begin-button");
var frmUserScore = $("#user-submit");
var frmUserAgain = $("#user-again");
var frmQuizDispl = $("#quiz-form");
var navbDropdown = $("#navbarDropdown");
var navbUserScor = $("#user-score");
var navbUserTime = $("#user-timer");
var elemJubotron = $(".jumbotron");
var userScoreObj = {
    rank: 0,
    username: "",
    score: 0
}
var sessionScore = 0;
var sessionTimer = 60;
var allQuestions = {};
var thisQuestion = [];
var questionEL = frmQuizDispl.children().children('label');
var answerELs = frmQuizDispl.children().children('ol').children('li');
var activeQuestion = {};
var highScoresLS = "highscores";
var quizQuestLS = "quizquestions";
var validKeypress = "1234s";
var questionStateArray = ["C", "I", "S"];
var validKeypressArray = Array.from(validKeypress);

// function to get highscores from storage and update the dropdown
function getHighscores() {
    var highScores = JSON.parse(localStorage.getItem(highScoresLS));
    var hsMenu = $("#highscores-menu").children();
    for (i=0; i<10; i++) {
        var displayItem = hsMenu[i];
        var scoredata = highScores[i+1];
        displayItem.innerHTML = `#${scoredata.rank} - ${scoredata.username}: ${scoredata.score}`;
    }
    return highScores;
}
// function to validate whether the keypressed answer is correct or not
function validateAnswer(questionObj, keypress) {
    if (questionObj.answerc === answerELs.eq(keypress-1).text()) {
        sessionScore += 10;
        return "C";
    } else {
        sessionTimer -= 5;
        return "I";
    }
}
// function to display updated score and timer on navbar
function updateHeader() {
    var scoreSTR = stringifyScore(sessionScore);
    navbUserScor.text(`Score: ${scoreSTR}`);
    navbUserTime.text(`Timer: ${sessionTimer}s`);
}
// function to output fixed-length string of score
function stringifyScore(numScore) {
    if (numScore > 99) {
        return `${numScore}`;
    } else if (numScore > 9) {
        return `0${numScore}`;
    } else {
        return `00${numScore}`;
    }
}
// function to display the current question and options
function displayQuestion(questionObj) {
    questionEL.text(questionObj.question);
    for (i=0; i<answerELs.length; i++) {
        answerELs.eq(i).text(questionObj[`answer${i+1}`]);
    }
}
// function for generating the object with the quiz questions
function makequizquestions() {
    var quizQuest = JSON.parse(localStorage.getItem(quizQuestLS));
    if (quizQuest) {
        return;
    }
    var quizQuest = {
        question1: {
            question: "When a user views a page containing a JavaScript program, which machine actually executes the script?",
            answerc: "The User's machine running a Web browser",
            answer1: "The Web server",
            answer2: "A central machine deep within Netscape's corporate offices",
            answer3: "None of the above",
            answer4: "The User's machine running a Web browser",
        },
        question2: {
            question: "What are variables used for in JavaScript Programs?",
            answerc: "Storing numbers, dates, or other values",
            answer1: "Varying randomly",
            answer2: "Causing high-school algebra flashbacks",
            answer3: "None of the above",
            answer4: "Storing numbers, dates, or other values"
        },
        question3: {
            question: "_____ JavaScript statements embedded in an HTML page can respond to user events such as mouse-clicks, form input, and page navigation.",
            answerc: "Client-side",
            answer1: "Server-side",
            answer2: "Local",
            answer3: "Native",
            answer4: "Client-side"
        },
        question4: {
            question: "What is the correct syntax for referring to an external script called \"abc.js\"?",
            answerc: "<script src=\"abc.js\">",
            answer1: "<script href=\"abc.js\">",
            answer2: "<script name=\"abc.js\">",
            answer3: "None of the above",
            answer4: "<script src=\"abc.js\">"
        },
        question5: {
            question: "Which of the following best describes JavaScript?",
            answerc: "an object-oriented scripting language.",
            answer1: "a low-level programming language.",
            answer2: "a scripting language precompiled in the browser.",
            answer3: "a compiled scripting language.",
            answer4: "an object-oriented scripting language.",
        },
    };
    localStorage.setItem(quizQuestLS, JSON.stringify(quizQuest));
}
// make the object for highscores and add it 
function makehighscore() {
    var highScores = JSON.parse(localStorage.getItem(highScoresLS));
    if (highScores) {
        return;
    }
    var highScores = {};
    var initUsernames = [
        'Deity',
        'Immortal',
        'Emperor',
        'King',
        'Queen',
        'Prince',
        'Warlord',
        'Chieftain',
        'Barbarian',
        'Settler'
    ]
    for (i=1; i<11; i++) {
        var temp = {
            rank: i,
            username: initUsernames[i-1],
            score: (11-i)*10
        };
        highScores[i] = temp;
    }
    localStorage.setItem(highScoresLS, JSON.stringify(highScores));
}
function scriptInit() {
    makehighscore();
    makequizquestions();
}