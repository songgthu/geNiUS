var currentURL = window.location.href.split("/")[2];
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
var countdownInfo = null;
document.addEventListener('DOMContentLoaded', function() {
  const data = { email: sessionStorage.getItem('email')};
  fetch(`https://${currentURL}/get-quick-countdown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      response.json().then(data => {
        console.log(data.results[0].quickCountdown);
        if (data.results.length > 0 && data.results[0].quickCountdown != null) {
        countdownInfo = data.results[0].quickCountdown;
        const countdownName = countdownInfo.split(",")[0];
        const countdownDate = countdownInfo.split(",")[1];
        sessionStorage.setItem('countdownDate', countdownDate);
        sessionStorage.setItem('countdownName', countdownName);
        console.log(countdownInfo);  
        console.log(sessionStorage.getItem('countdownDate')); 
        console.log(sessionStorage.getItem('countdownName')); 
        //alert('Get countdown successfully');
      } 
      
    })
  }
}).catch(error => {
      console.error('Error during query:', error)});
  
  if (sessionStorage.getItem('countdownDate') != 'undefined') {
    countdownInterval = setInterval(function () {
      updateCountdown();
    }, 1000);
  }
});

const startCD = document.querySelector(".start-countdown");
startCD.addEventListener('click', startCountdown);

const resetCD = document.querySelector(".reset-countdown");
resetCD.addEventListener('click', stopCountdown);

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
  const data = {
    eventCD: eventCD,
    countdownDate: countdownDate,
    email: sessionStorage.getItem('email')
  };
  fetch(`https://${currentURL}/quick-countdown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      //alert('Save countdown successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});

  const now = new Date();
  if (eventCD == null || countdownDate == "") {
    alert('Please enter a valid event name and countdown date.');
    return;
  } else if (new Date(countdownDate).getTime() === now.getTime()) {
    alert('Invalid date selected. Cannot create a countdown for the present time.');
    return;
  } else if (new Date(countdownDate).getTime() < now.getTime()){
    alert('Invalid date selected. Cannot create a countdown of a past event.');
    return;
  } else {
    eventHolder.textContent = eventCD;
    sessionStorage.setItem('countdownDate', countdownDate);
    sessionStorage.setItem('countdownName', eventCD);
    countdownInterval = setInterval(function () {
      updateCountdown();
    }, 1000);
  }
}

function updateCountdown() {
  const countdownDate = sessionStorage.getItem('countdownDate'); 

  if (countdownDate != null) {
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

    eventHolder.textContent = sessionStorage.getItem("countdownName");
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
    clearInterval(countdownInterval);
    eventHolder.textContent = 'No event';
    dayHolder.textContent = '00';
    hourHolder.textContent = '00';
    minuteHolder.textContent = '00';
    secondHolder.textContent = '00';
    console.log('no countdown');
    return;
  }
}

function stopCountdown() {
  clearInterval(countdownInterval);
  eventHolder.textContent = 'No event';
  dayHolder.textContent = '00';
  hourHolder.textContent = '00';
  minuteHolder.textContent = '00';
  secondHolder.textContent = '00';

  sessionStorage.removeItem('countdownDate'); 
  sessionStorage.removeItem('countdownName');
  sessionStorage.removeItem('daysCD');
  sessionStorage.removeItem('hoursCD');
  sessionStorage.removeItem('minutesCD');
  sessionStorage.removeItem('secondsCD');
  
  const data = { email: sessionStorage.getItem('email')};
  fetch(`https://${currentURL}/delete-quick-countdown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      //alert('Delete countdown successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});
}


// FOR SHORTCUTS
document.addEventListener('DOMContentLoaded', retrieveShortcuts);
localStorage.setItem('defaultShortcuts', document.querySelector('.shortcutList').innerHTML);
const defaultShortcuts = localStorage.getItem('defaultShortcuts');

const shortcut = document.querySelector(".add-shortcut-button");
shortcut.addEventListener('click', openShortcutModal);

const shortcutModal = document.querySelector(".shortcut-modal");

const shortcutList = document.querySelector('.shortcutList');

// Add a click event listener to the parent <ul> element
shortcutList.addEventListener('click', deleteShortcut);

function deleteShortcut(event) {
  if (event.target.matches('.deleteShortcut')) {
    // Get the parent <li> element of the clicked delete button
    const liElement = event.target.parentNode;

    // Get the name and URL from the <li> element
    const name = liElement.querySelector('a').textContent;
    const url = liElement.querySelector('a').getAttribute('href');
    const userId = sessionStorage.getItem('userId');
    const data = { userId: userId, name: name, url: url};
    fetch(`https://${currentURL}/delete-shortcut`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if (response.status === 201) {
        //alert('Delete shortcut successfully');
        retrieveShortcuts();
      }
    }).catch(error => {
        console.error('Error during query:', error)});
    
  }
}

const restore = document.querySelector(".restore-button");
restore.addEventListener('click', restoreDefaults);

function restoreDefaults() {
  document.querySelector('.shortcutList').innerHTML = defaultShortcuts;
  const data = { userId: sessionStorage.getItem('userId') };
  fetch(`https://${currentURL}/delete-shortcuts`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if (response.status === 201) {
        //alert('Restore default shortcuts successfully');
        retrieveShortcuts();
      }
    }).catch(error => {
        console.error('Error during query:', error)});
    
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
  const urlRegex = /^(https?:\/\/)?[\w.-]+\.[a-zA-Z]{2,}(\/\S*)?$/;
  if (!urlRegex.test(scURLInput)) {
    alert('Please enter a valid URL.');
    return;
  }
  var shortcutInfo = null;
  const data = {
    userId: sessionStorage.getItem('userId'),
    scInput: scInput,
    scURLInput: scURLInput
  };
  fetch(`https://${currentURL}/add-shortcut`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      retrieveShortcuts();
      //alert('Add shortcut successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});

  closeShortcutModal();
  

}

function retrieveShortcuts() {
  const shortcutsList = document.querySelector(".shortcutList");
  const data = { userId: sessionStorage.getItem('userId')};
  fetch(`https://${currentURL}/get-shortcut`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      response.json().then(data => {
        const shortcuts = data.results;
        console.log(shortcuts);
        shortcutsList.innerHTML = localStorage.getItem('defaultShortcuts'); 

        for(let i = 0; i < shortcuts.length; i++) {
          const scInput = shortcuts[i].name;
          const scURLInput = shortcuts[i].url;
          const listItemHTML = `
            <li>
              <span class="material-symbols-outlined"> arrow_outward </span>
              <a href="${scURLInput}" target="_blank">${scInput}</a>
              <span class="deleteShortcut">&times;</span>
            </li>
          `;

          shortcutsList.innerHTML += listItemHTML;
        }
        console.log(shortcutsList.innerHTML);
      });
    }
  }).catch(error => {
    console.error('Error during query:', error);
  });
}

window.addEventListener('load', function() {
  const storedShortcuts = sessionStorage.getItem('storedShortcuts');
  if (storedShortcuts) {
    const shortcutsList = document.querySelector(".shortcutList");
    shortcutsList.innerHTML = storedShortcuts;
  }
});