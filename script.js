const bells = new Audio('./sounds/bell.mp3'); 
const startBtn = document.querySelector('.btn-start'); 
const minuteInput = document.querySelector('#minutes');
const secondInput = document.querySelector('#seconds');
const minuteDiv = document.querySelector('.minutes');
const secondDiv = document.querySelector('.seconds');
let myInterval; 
let totalSeconds; // Declare totalSeconds globally
let isRunning = false; // Track if the timer is running

// Function to start or stop the timer
const appTimer = () => {
    const sessionMinutes = parseInt(minuteInput.value); // Get user input for minutes
    const sessionSeconds = parseInt(secondInput.value); // Get user input for seconds

    // If both minutes and seconds are 0, show an alert and do nothing
    if (sessionMinutes === 0 && sessionSeconds === 0) {
        alert("Please set a valid time greater than 0.");
        return;
    }

    // If seconds are provided but minutes are 0, treat as a valid time
    if (sessionMinutes === 0 && sessionSeconds > 0) {
        totalSeconds = sessionSeconds; // Use seconds only
    } else {
        // Otherwise, calculate total time in seconds
        totalSeconds = (sessionMinutes * 60) + sessionSeconds;
    }

    if (!isRunning) {
        // Start or resume the timer
        isRunning = true;
        startBtn.textContent = "Stop"; // Change button text to "Stop"
        minuteDiv.textContent = sessionMinutes < 10 ? '0' + sessionMinutes : sessionMinutes;
        secondDiv.textContent = sessionSeconds < 10 ? '0' + sessionSeconds : sessionSeconds;

        myInterval = setInterval(updateSeconds, 1000); // Start the interval
    } else {
        // Pause the timer
        isRunning = false;
        startBtn.textContent = "Start"; // Change button text to "Start"
        clearInterval(myInterval); // Stop the interval
    }
};

// Update seconds and minutes
const updateSeconds = () => {
  // Calculate the minutes and seconds based on totalSeconds
  const sessionMinutes = Math.floor(totalSeconds / 60);
  const sessionSeconds = totalSeconds % 60;

  // Timer complete when totalSeconds reaches 0
  if (totalSeconds <= 0) {
      // Ensure the display shows 00:00 when the timer ends
      minuteDiv.textContent = '00';
      secondDiv.textContent = '00';

      bells.play(); // Play the bell sound
      clearInterval(myInterval); // Stop the timer
      startBtn.textContent = "Start"; // Reset button text
      isRunning = false; // Reset running state
      totalSeconds = null; // Reset totalSeconds for a new session
  } else {
      // Update the display normally
      minuteDiv.textContent = sessionMinutes < 10 ? '0' + sessionMinutes : sessionMinutes;
      secondDiv.textContent = sessionSeconds < 10 ? '0' + sessionSeconds : sessionSeconds;

      totalSeconds--; // Decrement total seconds
  }
};




// Add event listener to the button
startBtn.addEventListener('click', appTimer);

// Allow pressing enter in input fields to start the timer
minuteInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        appTimer();
    }
});
secondInput.addEventListener('keydown', (event) => {
    if (event.key === "Enter") {
        appTimer();
    }
});
