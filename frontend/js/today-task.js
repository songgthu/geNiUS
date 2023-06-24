var currentURL = window.location.href.split("/")[2];

const create = document.querySelector('.addButton');
create.addEventListener('click', createTask);

var modal = document.querySelector(".modal");
var editModal = document.querySelector(".task-modal");

var span = document.getElementsByClassName("close")[0];
span.addEventListener('click', closeTask);

// Trigger close for edit-modal
const editModalCloseButton = document.querySelector(".closeTask");
editModalCloseButton.addEventListener("click", closeEditModal);

function closeEditModal() {
  editModal.style.display = "none";
}


function createTask(){
  console.log("create");
  modal.style.display="block";
  const addQuery = document.querySelector('.saveTaskButton');
  addQuery.addEventListener('click', addTask);
}
  // Function to add a new task
  function addTask() {
    // Get the input value
    const taskInput = document.querySelector('.taskInput').value;
    const deadline = document.querySelector('.deadlineInput').value;
    console.log(deadline);
    if (taskInput != "" && deadline != "") {
    var [datePart, timePart] = deadline.split('T');

// Split the date component into year, month, and day
var [year, month, day] = datePart.split('-');


// Convert the month value to a string representation
var monthString = new Date(datePart + 'T00:00:00').toLocaleString('en-US', { month: 'long' });

// Construct the formatted date string
var formattedDate = monthString + ' ' + day + ', ' + year + ', ' + timePart;
    // Create a new row
    var table = document.querySelector('.task-table');
    var row = table.insertRow();

    // // Create cells for the task, deadline, and status
    var taskCell = row.insertCell(0);
   
    var deadlineCell = row.insertCell(1);
    var statusCell = row.insertCell(2);

    // // Set the values for the cells
    taskCell.textContent = taskInput;
    deadlineCell.textContent = formattedDate;

    // // Create a checkbox and label for the status cell
    var checkboxContainer = document.createElement('div');
    checkboxContainer.className = 'checkbox-container';

    var checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.id = 'statusCheckbox' + table.rows.length;
    checkboxContainer.appendChild(checkbox);

    var label = document.createElement('label');
    label.htmlFor = 'statusCheckbox' + table.rows.length;
    checkboxContainer.appendChild(label);

    statusCell.appendChild(checkboxContainer);
    const userId = sessionStorage.getItem("userId");
    console.log(userId);
    console.log(taskInput);
    console.log(formattedDate);
    const data = {
      taskInput: taskInput,
      deadline: formattedDate,
      userId: userId
    };

    fetch(`https://${currentURL}/add-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if(response.status === 409) {
        alert('Task name already exist');
      } else if (response.status === 201) {
        //alert('Add task successfully');
        //retrieveTask();
        closeTask();
      } else {
       
      }
    })
    .catch(error => {
      console.error('Error during add task:', error)});
    
    } else {
      alert("Please fill in all the fields");
    }
  }
// Open task
function closeTask() {
  modal.style.display="none";
}

  // Retrieve task data
  // Fetch task data from the database
  document.addEventListener('DOMContentLoaded', retrieveTask);
  const userId = sessionStorage.getItem("userId");
  const data = { userId: userId };
function retrieveTask(){
  fetch(`https://${currentURL}/tasks`, {
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
        const results = data.results; // Access the "results" property
        sessionStorage.setItem('taskData', JSON.stringify(results));
        console.log(sessionStorage.getItem('taskData'));
        displayTodayTask();
        //alert('Today's Task retrieve successfully');
        
      });
    } else {
     
    }
  })
  .catch(error => {
    console.error('Error during retrieve task:', error)});
}

function displayTodayTask() {
  const taskData = JSON.parse(sessionStorage.getItem('taskData'));
  const table = document.querySelector(".task-table")
  const taskBody = document.querySelector(".taskBody");
  taskBody.innerHTML = "";
  const today = new Date();
  
  for(let i = 0; i < taskData.length; i++) {
    const taskDate = new Date(taskData[i].deadline);
    if (today.getDate() === taskDate.getDate() &&
    today.getMonth() === taskDate.getMonth()) {
    const newRow = document.createElement("tr");
    const taskCell = document.createElement("td");
    taskCell.classList.add("task-name");
    const deadlineCell = document.createElement("td");
    deadlineCell.classList.add("deadline");
    const completedCell = document.createElement("td");
    
    deadlineCell.textContent = taskData[i].deadline;
    taskCell.textContent = taskData[i].task;
    
    const checkboxContainer = document.createElement("div");
    const checkbox = document.createElement("input");
    const checkboxLabel = document.createElement("label");
    checkbox.checked = taskData[i].completed == 1 ? true : false;
    console.log(checkbox.checked);

    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);
    completedCell.appendChild(checkboxContainer);

    checkboxContainer.classList.add("checkbox-container");
    checkbox.type = "checkbox";
    checkbox.id = `statusCheckbox${i}`;

    newRow.appendChild(taskCell);
    newRow.appendChild(deadlineCell);
    newRow.appendChild(completedCell);
    
    taskBody.appendChild(newRow);
    
    taskCell.addEventListener('click', function() {
      openTask(taskCell.textContent); // Pass the clicked task name as a parameter
    });
    checkbox.addEventListener('click', function() {
      checkBox(checkbox, taskCell.textContent);
    });
    
  } else {}
  }
  
}

// Update checkbox
function checkBox(checkbox, taskName) {
  const isChecked = checkbox.checked;
  var value = "true";
  if(!isChecked) {
    value = "false";
  }

  const data = {
    taskStatus: value,
    taskName: taskName
  };

  fetch(`https://${currentURL}/update-checkbox`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      alert('Update checkbox successfully');
      checkbox.checked = isChecked; 
      console.log(isChecked);
    } else {

    }
  })
  .catch(error => {
    console.error('Error during update checkbox:', error)
  });
}


function openTask(oldTask) {
  console.log("1");
  editModal.style.display="block";
  const update = document.querySelector(".saveChangeButton");
  console.log(update);
  console.log(oldTask);
  
  
  update.addEventListener('click', function(){
    console.log("2");
    updateTask(oldTask);
  });
  const del = document.querySelector('.deleteTaskButton');
  del.addEventListener('click', function() {
    deleteTask(oldTask);
});
}
// Function to update task change (name, deadline, checkbox)
function updateTask(oldTask) {
  console.log("here");
  const newTask = document.querySelector('.newTaskInput').value;
  const newDeadline = document.querySelector('.newDeadlineInput').value;
  var [datePart, timePart] = newDeadline.split('T');
  var [year, month, day] = datePart.split('-');
  var monthString = new Date(datePart + 'T00:00:00').toLocaleString('en-US', { month: 'long' });
  var formattedDate = monthString + ' ' + day + ', ' + year + ', ' + timePart;
  const data = {
    newTask: newTask,
    newDeadline: formattedDate,
    oldTask: oldTask
  };
  
  // console.log(oldTask);

  fetch(`https://${currentURL}/update-task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      //alert('Update task successfully');
      retrieveTask();
    } else {
     
    }
  }).catch(error => {
    console.error('Error during delete task:', error);
  });
}

// Function to delete task
function deleteTask(taskName) {

  const data = {
    taskName: taskName
  };
  console.log(taskName);

  fetch(`https://${currentURL}/delete-task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      //alert('Delete task successfully');
      retrieveTask();
    } 
  }).catch(error => {
    console.error('Error during delete task:', error);
  });
}