const room = new URLSearchParams(window.location.search).get("room");
const setDate = new Date(room);
let localDate = new Date();

let timeDifference;
let yearsDifference;
let monthsDifference;
let daysDifference;
let hoursDifference
let minutesDifference
let secondsDifference

let timer = document.getElementById("countdown");
let displayInterval;

let eventEnded = false;

function calculateDifference() {
    // Get current time
    localDate = new Date();
    // Get time difference in miliseconds
    timeDifference = setDate.getTime() - localDate.getTime();

    // Get the difference in years and substract the years from the timer
    yearsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 365));
    timeDifference -= yearsDifference * 1000 * 60 * 60 * 24 * 365;

    // Get the difference in moths and substract the months from the timer
    monthsDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24 * 30));
    timeDifference -= monthsDifference * 1000 * 60 * 60 * 24 * 30;

    // Get the difference in days and substract the days from the timer
    daysDifference = Math.floor(timeDifference / (1000 * 60 * 60 * 24));
    timeDifference -= daysDifference * 1000 * 60 * 60 * 24;

    // Get the difference in hours and substract the hours from the timer
    hoursDifference = Math.floor(timeDifference / (1000 * 60 * 60));
    timeDifference -= hoursDifference * 1000 * 60 * 60;

    // Get the difference in minutes and substract the minutes from the timer
    minutesDifference = Math.floor(timeDifference / (1000 * 60));
    timeDifference -= minutesDifference * 1000 * 60;

    // Get the difference in seconds
    secondsDifference = Math.floor(timeDifference / 1000);
}

function getStatus() {
    calculateDifference();
    if (yearsDifference < 0 || monthsDifference < 0 || daysDifference < 0 || hoursDifference < 0 || minutesDifference < 0 || secondsDifference < 0) {
        eventEnded = true;
        document.getElementById("statusText").innerText = "The event is over!"
        clearInterval(displayInterval);
    }
}
getStatus();
setInterval(getStatus, 100);

if (eventEnded == false) {
    document.getElementById("statusText").innerText = "The event will happen in"
    function displayTimer() {
        calculateDifference();
        timer.innerText = `${yearsDifference == 0 ? "" : yearsDifference + " Years"} ${monthsDifference == 0 ? "" : monthsDifference == 1 ? monthsDifference + " Month"
            : monthsDifference + " Months"} ${daysDifference == 0 ? "" : daysDifference == 1 ? daysDifference + " Day"
                : daysDifference + " Days"} ${hoursDifference == 0 ? "" : hoursDifference == 1 ? hoursDifference + " Hour"
                    : hoursDifference + " Hours"} ${minutesDifference == 0 ? "" : minutesDifference == 1 ? minutesDifference + " Minute"
                        : minutesDifference + " Minutes"} ${secondsDifference == 0 ? "" : secondsDifference == 1 ? secondsDifference + " Second"
                            : secondsDifference + " Seconds"}`
    };
    displayTimer();
    displayInterval = setInterval(displayTimer, 1000);
}



