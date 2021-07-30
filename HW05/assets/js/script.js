var displayDTElement = $("#currentDay");
var displayPlanner = $("#accordion");
var plannerElements;
initPage();

function initPage() {
    propogateHourElements();
    displayPlanner.accordion();
    plannerElements = displayPlanner.children("h3");

}
function updateAccordionColors() {
    var currentTime = moment().add(10, 'hours');
    for (i=0; i<plannerElements.length; i++) {
        var tempElement = plannerElements[i];
        var headerTime = moment(tempElement.textContent, "HH:mm").hour();
        if (currentTime.hour() > headerTime) {
            tempElement.style.background = "red";
        } else if (currentTime.hour() < headerTime) {
            tempElement.style.background = "green";
        } else {
            tempElement.style.background = "blue";
        }
    }
}
// function to create the accordion elements for the planner
function propogateHourElements() {
    for (i=5; i<22; i++) {
        var displayHElement = $("<h3>");
        var displayDElement = $("<div>");
        var displayHour = moment().hours(i).minutes(0).format("HH:mm");
        displayHElement.text(`${displayHour}`);
        displayPlanner.append(displayHElement);
        displayPlanner.append(displayDElement);
    }
}
// Timer for the ticking clock
var clockInterval = setInterval(function() {
    var currentTime = moment().format("YYYY-MM-DD, HH:mm:ss");
    displayDTElement.text(`Current Date and Time: ${currentTime}`);
    updateAccordionColors();
}, 1000);