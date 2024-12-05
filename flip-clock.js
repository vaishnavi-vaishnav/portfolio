// TimeTracker function to handle the flip clock updates
function TimeTracker(elementId, value) {
    var el = document.getElementById(elementId);

    var top = el.querySelector(".card__top"),
        bottom = el.querySelector(".card__bottom"),
        back = el.querySelector(".card__back"),
        backBottom = el.querySelector(".card__back .card__bottom");

    this.update = function (val) {
        val = ("0" + val).slice(-2); // Ensure the value is two digits (e.g., 09 instead of 9)
        if (val !== this.currentValue) {
            if (this.currentValue >= 0) {
                back.setAttribute("data-value", this.currentValue);
                bottom.setAttribute("data-value", this.currentValue);
            }
            this.currentValue = val;
            top.innerText = this.currentValue;
            backBottom.setAttribute("data-value", this.currentValue);

            el.classList.remove("flip");
            void el.offsetWidth; // Trigger reflow to reset the animation
            el.classList.add("flip");
        }
    };

    this.update(value);
}

// Function to format the current date as "DD-MMM-YYYY"
function formatDate() {
    const date = new Date();
    const options = { year: 'numeric', month: 'short', day: '2-digit' };
    return date.toLocaleDateString('en-GB', options);  // Format as 02-Dec-2024
}

// Function to update the current time (hours, minutes, seconds)
function updateCurrentTime(hoursTracker, minutesTracker, secondsTracker) {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();

    // Update the clock with the current time
    hoursTracker.update(hours);
    minutesTracker.update(minutes);
    secondsTracker.update(seconds);

    // Update the current date
    const currentDateString = formatDate();
    document.getElementById("currentdate").innerHTML = `<span>${currentDateString}</span>`;
}

// Initialize the Clock for the current time
function Clock() {
    var hoursTracker = new TimeTracker("hours", 0);
    var minutesTracker = new TimeTracker("minutes", 0);
    var secondsTracker = new TimeTracker("seconds", 0);

    function updateClock() {
        // Update the system time every second
        updateCurrentTime(hoursTracker, minutesTracker, secondsTracker);
        setTimeout(updateClock, 1000); // Update every second
    }

    updateClock();
}

// Start the Clock
new Clock();
