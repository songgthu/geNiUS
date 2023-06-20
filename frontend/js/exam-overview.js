
const modal = document.querySelector(".exam-modal");
const overlay = document.querySelector(".overlay");
const openModalBtn = document.querySelector(".create-exam-button");
const closeModalBtn = document.querySelector(".close-exam-modal");

function openModal() {
  modal.style.display ='block';
}

function closeModal() {
  modal.style.display ='none';
}

document.addEventListener("keydown", function(e) {
  if (e.key ==="Enter" && !modal.classList.contains("hidden")) {
    closeModal();
  }
})

openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);

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

if(submit.value != "Add") {
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

let taskDescription = document.createElement("p");
taskDescription.className = "task-description";
taskDescription.appendChild(document.createTextNode(newItem));


let deleteBtn = document.createElement("button"); //creating delete btn
deleteBtn.className = "delete"; 
deleteBtn.appendChild(document.createTextNode("Delete")); //the text inside btn is called delete

let editBtn = document.createElement("button");
editBtn.className = "edit" 
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





//to input contents into the container
const displayContentBtn = document.querySelector('.displayContent'); 
const examContainer = document.getElementById('examContainer'); //container to display 
const examNameDisplay = document.getElementById('examNameDisplay');
const examDateDisplay = document.getElementById('examDateDisplay');
const examVenueDisplay = document.getElementById('examVenueDisplay');

const examContentElement = document.getElementById('examContent');
const examContainersContainer = document.getElementById("examContainersContainer");

//the edit function in the exam container
const editModal = document.getElementById('editModal');
const editModalContent = document.querySelector('.editModalContent');
const editExamBtn = document.getElementById('editExamBtn');
const closeEditBtn = document.querySelector('.closeEdit');
const saveChangesBtn = document.getElementById('saveChanges');
const cancelEditBtn = document.getElementById('cancelEdit');


const examNamePara = document.createElement('p');
const examDatePara = document.createElement('p');
const examVenuePara = document.createElement('p');


function closeModalFunct () {
  modal.style.display = 'none';
}

let storedExamName = '';
let storedExamDate = '';
let storedExamVenue = ' ';

function toggleVisibility(element, isVisible) {
  element.style.display = isVisible ? 'block' : 'none';
}
toggleVisibility(editModal, false);


saveChangesBtn.addEventListener('click', function() {
  const newExamName = document.getElementById('editExamName').value;
  const newExamDate = new Date(document.getElementById('editExamDate').value).toLocaleString();
  const newExamVenue = document.getElementById('editExamVenue').value;

  if (newExamName.trim() !== ' '){
    examNamePara.textContent = `Exam: ${newExamName}`;
    storedExamName = newExamName;
  }
  
  if (newExamDate.trim() !== ' '){
    examDatePara.textContent = `Date: ${newExamDate}`;
    storedExamDate = newExamDate;
  }

  if (newExamVenue.trim() !== ' '){
    examVenuePara.textContent = `Venue: ${newExamVenue}`;
    storedExamVenue = newExamVenue;
  }

  toggleVisibility(editModal, false)
});

cancelEditBtn.addEventListener("click", function() {
  toggleVisibility(editModal, false);
});



//when button click, display the examcontainer
displayContentBtn.addEventListener("click", function() {
  
  const examNameInput = document.getElementById('examName').value;
  const examDateInput = new Date(document.getElementById('examDate').value).toLocaleString();
  const examVenueInput = document.getElementById('examVenue').value;

  const examContentInputs = document.querySelectorAll('#items li');

  //creating exam container
  const newExamContainer = document.createElement('div');
  newExamContainer.className = "examContainer";
  

  //creating exam information elements
  //const examNamePara = document.createElement('p');
  examNamePara.textContent = `Exam: ${examNameInput}`;

  //const examDatePara = document.createElement('p');
  examDatePara.textContent = `Date: ${examDateInput}`;

  //const examVenuePara = document.createElement('p');
  examVenuePara.textContent = `Venue: ${examVenueInput}`;

  //append exam info to the new container
  newExamContainer.appendChild(examNamePara);
  newExamContainer.appendChild(examDatePara);
  newExamContainer.appendChild(examVenuePara);

  //creating the edit button
  const editBtn = document.createElement("button");
  editBtn.className = "edit-button";
  editBtn.textContent = "Edit";
  newExamContainer.appendChild(editBtn);

  editBtn.addEventListener('click', function() {
    document.body.classList.add('blur');
    toggleVisibility(editModal, true);
    editModal.style.display = 'block';
    document.getElementById('editExamName').value = storedExamName;
    document.getElementById('editExamDate').value = storedExamDate;
    document.getElementById('editExamVenue').value = storedExamVenue;
  });

  const closeEditModal = document.querySelector(".closeEdit");
  closeEditModal.addEventListener("click", function() {
    toggleVisibility(editModal, false);
    document.body.classList.remove('blur');
  });

  

  //creating checklist container
  const checklistContainer = document.createElement('div');
  checklistContainer.className = "checklistContainer";

  const addBtn = document.createElement("button");
  addBtn.textContent = "Add content";
  addBtn.className = "addButton";

  checklistContainer.appendChild(addBtn);
  newExamContainer.appendChild(checklistContainer);

   //creating the add button


  addBtn.addEventListener("click", addNewChecklist);

  const checklistItems = document.getElementById("checklistItems"); //the area to populate

  //when i click on see more, it will display the check list of contents then the add and edit button shld be present also
  const tasks = document.querySelectorAll(".task-description");
  
  //looping through exam content 
  tasks.forEach((tasks) => {
    const li = document.createElement('li');
    li.className = "item-checklist"

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "item-checkbox";

    const label = document.createElement("label");
    label.className = "checklist-label";
    label.appendChild(checkbox);
    label.appendChild(tasks.cloneNode(true));

    li.appendChild(label);
    checklistItems.appendChild(li);
    
    const btnEdit = document.createElement("button");
    btnEdit.className = "btnEdit";
    btnEdit.textContent = "Edit";
    li.appendChild(btnEdit);

    const btnDel = document.createElement("button");
    btnDel.className = "btnDel";
    btnDel.textContent = "Delete";
    li.appendChild(btnDel);

    checkbox.addEventListener("change", function(){
      if(this.checked) {
        li.classList.add("checked");
        checklistItems.appendChild(li);
      } else {
        li.classList.remove("checked");
      }
    });

    btnEdit.addEventListener("click", function() {
      const listItem = this.parentNode;
      const taskDescription = listItem.querySelector(".task-description");
      const currentContent = taskDescription.textContent;
      const newContent = prompt("Enter", currentContent);

      if(newContent !== null && newContent.trim() !== ""){
        taskDescription.textContent = newContent;
      }
    });

    btnDel.addEventListener("click", function() {
      const listItem = this.parentNode;
      listItem.remove();
    })
    
    
    
    examContainersContainer.appendChild(newExamContainer);
    toggleVisibility(examContainer, true);
    
    document.querySelector(".examNameInput").value = '';
    document.querySelector(".examDateInput").value = '';
    document.querySelector(".examVenueInput").value = '';
    //need to clear the checklist in the modal box
    
    const nestedForm = document.getElementById('nestedForm');
    nestedForm.innerHTML = '';
    
  });
  closeModalFunct();
});


//function to add new checklist items
function addNewChecklist(event) {
  event.preventDefault();
  const newItemText = prompt("Enter new exam content");

  if (newItemText !== ' ' && newItemText.trim() !== ""){
    const li = document.createElement("li");
    li.className = "item-checklist";

    const label = document.createElement("label");
    label.className = "checklist-label";

    const checkbox = document.createElement("input");
    checkbox.type = "checkbox";
    checkbox.className = "item-checkbox";
    

    const taskDescription = document.createElement("span");
    taskDescription.className = "task-description";
    taskDescription.textContent = newItemText;


    label.appendChild(checkbox);

    label.appendChild(taskDescription);

    li.appendChild(label);
    checklistItems.appendChild(li);
    

    const btnEdit = document.createElement("button");
    btnEdit.className = "btnEdit";
    btnEdit.textContent = "Edit";
    li.appendChild(btnEdit);

    checkbox.addEventListener("change", function(){
      const listItem = this.parentNode.parentNode;
      const taskDescription = listItem.querySelector(".task-description");

      if(this.checked) {
        listItem.classList.add("checked");
        checklistItems.appendChild(listItem);
      } else {
        listItem.classList.remove("checked");
        checklistItems.insertBefore(listItem, checklistItems.firstChild);
      }
    });

    btnEdit.addEventListener("click", function() {
      const listItem = this.parentNode;
      const taskDescription = listItem.querySelector("label");
      const newContent = prompt("Enter your updated content", newItemText);

      if (newContent !== null && newContent.trim() !== "") {
        taskDescription.textContent = newContent;
      }

    })

    const btnDel = document.createElement("button");
    btnDel.className = "btnDel";
    btnDel.textContent = "Delete";
    li.appendChild(btnDel);

    btnDel.addEventListener("click", function() {
      const listItem = this.parentNode;
      listItem.remove();
    })

    //const examContainer = document.querySelector(".examContainer");
    //examContainer.querySelector(".checklistContainer").appendChild(li);

    newItemText.value = "";

  }
};




//countdown timer inside the exam container
/*
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
  const eventCD = document.querySelector("#examNameDisplay").textContent;
  const countdownDate = document.querySelector("#examDateDisplay").textContent;
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


*/



