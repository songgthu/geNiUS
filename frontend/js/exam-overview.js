
const modal = document.querySelector(".modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".openModal");
const closeModalBtn = document.querySelector(".closeModal");

const openModal = function () {
  modal.classList.remove("hidden");
  overlay.classList.remove("hidden"); //remove hidden class, so it will show the display
};

const closeModal = function () {
  modal.classList.add("hidden");
  overlay.classList.add("hidden");
}

document.addEventListener("keydown", function(e) {
  if (e.key ==="Enter" && !modal.classList.contains("hidden")) {
    closeModal();
  }
})

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal)
overlay.addEventListener("click", closeModal)

/*

const addcontentBtn = document.getElementById("addContent");

let textboxCount = 1;

addcontentBtn.addEventListener("click", function(){
  const textBoxContainer = document.getElementById("textBoxContainer");
  const newtextboxContainer = document.createElement("div");
  newtextboxContainer.classList.add("textBox-container");

  const textbox = document.createElement("input");
  textbox.setAttribute("type",  "text");
  textbox.setAttribute("id", "textbox", (textboxCount + 1));
  textbox.classList.add("textbox");
  textbox.placeholder = "More exam content...";
  
  
  newtextboxContainer.appendChild(textbox);
  textBoxContainer.appendChild(newtextboxContainer);
  textboxCount++;
});

*/
//the popup modal box
//things 

//adding the check list feature


window.onload = () => {
const form1 = document.querySelector("#addForm");
const nestedForm = document.querySelector("#nestedForm");
let items = document.getElementById("items");
let submit = document.getElementById("submit");

let editItem = null;
form1.addEventListener("submit", addItem); //to add tasks
nestedForm.addEventListener("click", removeItem); //to remove tasks
};

function addItem(e) {
e.preventDefault();

if(submit.value != "Submit") {
console.log("Hello");
if(editItem) {
  let taskDescription = editItem.parentNode.previousElementSibling; //access the task description that is before the buttons
  taskDescription.textContent = document.getElementById("item").value;
  editItem = null;
}


submit.value = "Submit";
document.getElementById("label-success").innerHTML = "Text edited successfully";
document.getElementById("label-success").style.display = "block" //make it visible

setTimeout(function() {
  document.getElementById("label-success").style.display = "none";
}, 1500); //hiding the text edited successfully after 1.5 seconds
return false;
}

let newItem = document.getElementById("item").value;
if (newItem.trim() == "" || newItem.trim() == null) {
return false; //prevent any default handling if the input is empty
} else {
document.getElementById("item").value = "";
}

let li = document.createElement("li");
li.className = "list-group-item" //defining a class for the lists

let buttonsContainer = document.createElement("div");
buttonsContainer.className = "buttons";

let taskDescription = document.createElement("span");
taskDescription.className = "task-description";
taskDescription.appendChild(document.createTextNode(newItem));


let deleteBtn = document.createElement("button"); //creating delete btn
deleteBtn.className = "delete"; //EDIT THIS LATER
deleteBtn.appendChild(document.createTextNode("Delete")); //the text inside btn is called delete

let editBtn = document.createElement("button");
editBtn.className = "edit"//EDIT THIS LATER
editBtn.appendChild(document.createTextNode("Edit"));

buttonsContainer.appendChild(deleteBtn);
buttonsContainer.appendChild(editBtn);

li.appendChild(taskDescription); //create a list with the new input
li.appendChild(buttonsContainer);
// li.appendChild(editBtn);

items.appendChild(li); 
}

function removeItem(e) {
e.preventDefault();
if(e.target.classList.contains("delete")) {
if (confirm("Are you sure?")) {
  let li = e.target.parentNode.parentNode;
  li.parentNode.removeChild(li);
  document.getElementById("label-success").innerHTML = "Task deleted successfully";
  document.getElementById("label-success").style.display = "block";
  
  setTimeout(function(){
    document.getElementById("label-success").style.display = "none";
  }, 1500);
}
}

if(e.target.classList.contains("edit")) {
let li = e.target.parentNode.parentNode;
let taskDescription = li.querySelector(".task-description");
document.getElementById("items").value = taskDescription.textContent;
submit.value = "edit";
editItem = e.target;
}
}

function toggleButton(ref, btnID) {
document.getElementById(btnID).disabled = false;
}

//countdown function
var countdownInfo = null;
document.addEventListener('DOMContentLoaded', function() {
  const data = { email: sessionStorage.getItem('email')};
  fetch(`http://localhost:5501/get-quick-countdown`, {
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
        alert('Get countdown successfully');
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

const startCD = document.querySelector(".start");
startCD.addEventListener('click', startCountdown);

const resetCD = document.querySelector(".reset");
resetCD.addEventListener('click', stopCountdown);

function formatTime(time) {
  return time.toString().padStart(2, '0');
}

let countdownInterval;
// select elements to input values
const eventHolder = document.querySelector("#countdown-event"); //to update the event, cd
const dayHolder = document.querySelector("#countdown-days");
const hourHolder = document.querySelector("#countdown-hours");
const minuteHolder = document.querySelector("#countdown-minutes");
const secondHolder = document.querySelector("#countdown-seconds");

let daysCD = 0;
let hoursCD = 0;
let minutesCD = 0;
let secondsCD = 0;

function startCountdown() {
  const eventCD = document.querySelector("#examName").value; //exam name
  const countdownDate = document.querySelector("#examDate").value; //date
  const data = {
    eventCD: eventCD,
    countdownDate: countdownDate,
    email: sessionStorage.getItem('email')
  };
  fetch(`http://localhost:5501/quick-countdown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      alert('Save countdown successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});


  if (eventCD == null || countdownDate == "") {
    alert('Please enter a valid event name and countdown date.');
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
  fetch(`http://localhost:5501/delete-quick-countdown`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      alert('Delete countdown successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});
}

const addDisplay = document.querySelector(".addDisplay");

addDisplay.addEventListener("click", function() {
  const examName = document.querySelector("#examName").value;
  const content = examName;
  const container = document.getElementById("transfer");

  const newContainer = document.createElement("div");
  newContainer.className = "displayContainer"; //class for the containers
  newContainer.textContent = content;

  container.appendChild(newContainer);
});
