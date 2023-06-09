// FOR QUICK TIMER
const hoursElement = document.querySelector('.time-hours');
const minutesElement = document.querySelector('.time-minutes');
const secondsElement = document.querySelector('.time-seconds');
const setTimer = document.querySelector(".set-timer");
setTimer.addEventListener('click', setTime);
const startTimer = document.querySelector(".start-timer");
startTimer.addEventListener('click', startTime);
const stopTimer = document.querySelector(".stop-timer");
stopTimer.addEventListener('click', stopTime);

let hours = 0;
let minutes = 0;
let seconds = 0;
let timerInterval;

function setTime() {
    // Get the user input for hours, minutes, and seconds
    hours = parseInt(prompt('Enter hours:'));
    minutes = parseInt(prompt('Enter minutes:'));
    seconds = parseInt(prompt('Enter seconds:'));
    if (hours > 24 || minutes > 60 || seconds > 60 || isNaN(hours) || isNaN(minutes) || isNaN(seconds)) {
        alert("Invalid time input, please try again.");
    } else {
    // Update the timer display
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);
    }
}

function formatTime(time) {
    return time.toString().padStart(2, '0');
}

function startTime() {
  if(hours == 0 && minutes == 0 && seconds == 0) {
    alert('Input time before start timer');
    return;
  }
  setTimer.disabled = true;
  timerInterval = setInterval(updateTimer, 1000);
  
  stopTimer.style.display="block";
  startTimer.style.display="none";
  startTimer.classList.add("clicked");
  stopTimer.classList.add("active");
}

function updateTimer() {
  
    seconds--;
  
    if (seconds < 0) {
      minutes--;
      seconds = 59;
    }
  
    if (minutes < 0) {
      hours--;
      minutes = 59;
    }
  
    hoursElement.textContent = formatTime(hours);
    minutesElement.textContent = formatTime(minutes);
    secondsElement.textContent = formatTime(seconds);

    if (hours <= 0 && minutes <= 0 && seconds <= 0) {
        stopTime();
        alert("Time is up!");
        stopTimer.style.display="none";
        startTimer.style.display="block";
    
      }
  }
  
  // Function to end the timer
  function stopTime() {
    clearInterval(timerInterval);
    setTimer.disabled = false;
    stopTimer.style.display="none";
    startTimer.style.display="block";
  }

// FOR QUICK COUNTDOWN
document.addEventListener('DOMContentLoaded', function() {
  const countdownDate = sessionStorage.getItem('countdownDate');
  if (countdownDate) {
    countdownInterval = setInterval(function () {
      updateCountdown();
    }, 1000);
  }
});

const startCD = document.querySelector(".start-countdown");
startCD.addEventListener('click', startCountdown);

const resetCD = document.querySelector(".reset-countdown");
resetCD.addEventListener('click', clearCountdown);

let countdownInterval;
// select elements to input values
const eventHolder = document.querySelector("#countdown-event");
const dayHolder = document.querySelector("#countdown-days");
const hourHolder = document.querySelector("#countdown-hours");
const minuteHolder = document.querySelector("#countdown-minutes");
const secondHolder = document.querySelector("#countdown-seconds");

let daysCD = 0;
let hoursCD = 0;
let minutesCD = 0;
let secondsCD = 0;

function startCountdown() {
  const eventCD = document.querySelector(".countdown-event").value;
  const countdownDate = document.querySelector(".countdown-date").value;
  const time = new Date(countdownDate).getTime();

  console.log(eventCD);
  console.log(countdownDate);
  console.log(time);

  if (eventCD == null || countdownDate == "") {
    alert('Please enter a valid event name and countdown date.');
    return;
  } else {
    eventHolder.textContent = eventCD;
    sessionStorage.setItem('eventName', eventCD); 
    sessionStorage.setItem('countdownDate', countdownDate); // Store countdown date in sessionStorage
    countdownInterval = setInterval(function () {
      updateCountdown();
    }, 1000);
  }
}

function updateCountdown() {
  const countdownDate = sessionStorage.getItem('countdownDate'); // Retrieve countdown date from sessionStorage

  if (countdownDate) {
    const time = new Date(countdownDate).getTime();
    const currentTime = new Date().getTime();
    const remainingTime = time - currentTime;

    if (remainingTime <= 0) {
      stopCountdown();
      return;
    }

    daysCD = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
    hoursCD = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    minutesCD = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
    secondsCD = Math.floor((remainingTime % (1000 * 60)) / 1000);

    secondsCD--;

    if (secondsCD < 0) {
      minutesCD--;
      secondsCD = 59;
    }

    if (minutesCD < 0) {
      hoursCD--;
      minutesCD = 59;
    }
    if (hoursCD < 0) {
      daysCD--;
      hoursCD = 23;
    }

    dayHolder.textContent = formatTime(daysCD);
    hourHolder.textContent = formatTime(hoursCD);
    minuteHolder.textContent = formatTime(minutesCD);
    secondHolder.textContent = formatTime(secondsCD);

    eventHolder.textContent = sessionStorage.getItem("eventName");
    sessionStorage.setItem('daysCD', formatTime(daysCD));
    sessionStorage.setItem('hoursCD', formatTime(hoursCD));
    sessionStorage.setItem('minutesCD', formatTime(minutesCD));
    sessionStorage.setItem('secondsCD', formatTime(secondsCD));

    if (daysCD <= 0 && hoursCD <= 0 && minutesCD <= 0 && secondsCD <= 0) {
      stopCountdown();
      alert(eventHolder.textContent + " countdown ends!");
    }
  } else {
    // No countdown date found in sessionStorage, stop the countdown
    stopCountdown();
    return;
  }
}

function clearCountdown() {
  clearInterval(countdownInterval);
  eventHolder.textContent = '';
  dayHolder.textContent = '00';
  hourHolder.textContent = '00';
  minuteHolder.textContent = '00';
  secondHolder.textContent = '00';

  sessionStorage.removeItem('countdownDate'); // Remove countdown date from sessionStorage
  sessionStorage.removeItem('daysCD');
  sessionStorage.removeItem('hoursCD');
  sessionStorage.removeItem('minutesCD');
  sessionStorage.removeItem('secondsCD');
}

function stopCountdown() {
  clearInterval(countdownInterval);
  dayHolder.textContent = '00';
  hourHolder.textContent = '00';
  minuteHolder.textContent = '00';
  secondHolder.textContent = '00';

  sessionStorage.removeItem('countdownDate'); // Remove countdown date from sessionStorage
  sessionStorage.removeItem('daysCD');
  sessionStorage.removeItem('hoursCD');
  sessionStorage.removeItem('minutesCD');
  sessionStorage.removeItem('secondsCD');
}


// FOR SHORTCUTS
localStorage.setItem('defaultShortcuts', document.querySelector('.shortcutList').innerHTML);
const defaultShortcuts = localStorage.getItem('defaultShortcuts');

const shortcut = document.querySelector(".add-shortcut-button");
shortcut.addEventListener('click', openShortcutModal);

const shortcutModal = document.querySelector(".shortcut-modal");

const shortcutList = document.querySelector('.shortcutList');

// Add a click event listener to the parent <ul> element
shortcutList.addEventListener('click', deleteShortcut);

function deleteShortcut(event) {
  // Check if the clicked element matches the delete button selector
  if (event.target.matches('.deleteShortcut')) {
    // Get the parent <li> element of the clicked delete button
    var liElement = event.target.parentNode;
    
    // Remove the <li> element from the DOM
    liElement.parentNode.removeChild(liElement);
    sessionStorage.setItem('storedShortcuts', shortcutList.innerHTML);
  }
}

const restore = document.querySelector(".restore-button");
restore.addEventListener('click', restoreDefaults);

function restoreDefaults() {
  document.querySelector('.shortcutList').innerHTML = defaultShortcuts;
  sessionStorage.setItem('storedShortcuts',defaultShortcuts);
}

function openShortcutModal() {
 shortcutModal.style.display = "block";
 const submit = document.querySelector(".submit-shortcut-button");
 submit.addEventListener('click', addShortcut);
 const close = document.querySelector(".cancel-shortcut-button");
 close.addEventListener('click', closeShortcutModal);
}

function closeShortcutModal() {
  shortcutModal.style.display = "none";
 }


function addShortcut() {
  const scInput = document.querySelector(".shortcutInput").value;
  const scURLInput = document.querySelector(".shortcutURLInput").value;

  if (scInput.trim() === '' || scURLInput.trim() === '') {
    alert('Please enter both shortcut name and URL.');
    return;
  }

  const shortcutsList = document.querySelector(".shortcutList");

  const listItemHTML = `
    <li>
      <span class="material-symbols-outlined"> arrow_outward </span>
      <a href="${scURLInput}" target="_blank">${scInput}</a>
      <span class="deleteShortcut">&times;</span>
    </li>
  `;

  shortcutsList.innerHTML += listItemHTML;

  sessionStorage.setItem('storedShortcuts', shortcutsList.innerHTML);
  closeShortcutModal();

}

window.addEventListener('load', function() {
  const storedShortcuts = sessionStorage.getItem('storedShortcuts');
  if (storedShortcuts) {
    const shortcutsList = document.querySelector(".shortcutList");
    shortcutsList.innerHTML = storedShortcuts;
  }
});