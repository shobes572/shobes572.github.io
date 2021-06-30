// This file will primarily keep the major functions and event listeners

// Event listener for displaying highscores on dropdown
navbDropdown.on("click", getHighscores);

// Event listener to begin quiz once button is clicked from the Jumbotron
btnBeginQuiz.on("click", function() {
    elemJubotron.addClass("d-none");
    frmQuizDispl.removeClass("d-none");
    beginQuiz();
});

// Event listener to play again
frmUserAgain.on("submit", function() {
    frmUserAgain.addClass("d-none");
    frmQuizDispl.removeClass("d-none");
    beginQuiz();
});
// Event listener for submitting new score
frmUserScore.on("submit", function() {
    var highScores = getHighscores();
    var newHighScores = {};
    var insertionCheck = false;
    userScoreObj.username = frmUserScore.children().children("input").val();
    userScoreObj.score = sessionScore;
    for (i=1; i<11; i++) {
        var temp = highScores[i];
        if (userScoreObj.score >= temp.score) {
            if (!insertionCheck) {
                userScoreObj.rank = i;
                newHighScores[i] = userScoreObj;
                insertionCheck = true;
            } else {
                newHighScores[i] = highScores[i-1];
                newHighScores[i].rank++;
            }
        } else {
            newHighScores[i] = highScores[i];
        }
    }
    localStorage.setItem(highScoresLS, JSON.stringify(newHighScores));
    frmUserScore.addClass('d-none');
    frmUserAgain.removeClass('d-none');
});

// function for beginning a new quiz cycle
daddyElement.on("keydown", function(event) {
    if (event.key in validKeypressArray) {
        thisQuestion.splice(0,1);
        if (event.key === "s") {
            var questionState = "S";
        } else {
            var questionState = validateAnswer(activeQuestion, event.key);
        }
    }
});
function beginQuiz() {
    allQuestions = JSON.parse(localStorage.getItem(quizQuestLS));
    sessionScore = 0;
    sessionTimer = 60;
    for (aquestion in allQuestions) {
        thisQuestion = thisQuestion.concat([aquestion]);
    }
    var timerInterval = setInterval(function() {
        sessionTimer--;
        if (sessionTimer >= 0) {
            activeQuestion = allQuestions[thisQuestion[0]];
            updateHeader();
            if (activeQuestion !== undefined) {
                displayQuestion(activeQuestion);
            } else {
                clearInterval(timerInterval);
                endQuiz();
            }
        } else {
            clearInterval(timerInterval);
            endQuiz();
        }
    }, 1000);
}
function endQuiz() {
    frmQuizDispl.addClass('d-none');
    frmUserScore.removeClass('d-none');
    var timerInterval = setInterval(function() {
        updateHeader();
        if (sessionTimer > 0) {
            sessionTimer--;
            sessionScore++;
        } else {
            clearInterval(timerInterval);
        }
    }, 25);
}
function displayQuestion(questionObj) {
    questionEL.text(questionObj.question);
    for (i=0; i<answerELs.length; i++) {
        answerELs.eq(i).text(questionObj[`answer${i+1}`]);
    }
}
// page init
scriptInit();