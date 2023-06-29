var currentURL = window.location.href.split("/")[2];
// FUNCTIONS FOR TASKS CUSTOMIZER
// Add event listener to the "Add Task" button
var addTaskButton = document.querySelector('.add-task-button');
addTaskButton.addEventListener('click', addTask);
// Function to handle the "Add Task" button click event
function addTask() {
    var taskContainer = document.querySelector('.task-container');
  
    // Prompt the user to enter the task name
    var taskName = window.prompt('Enter the task name:');
    if (taskName === null || taskName.trim() === '') {
      alert('Cannot create empty task');
      return; 
    }
  
    // Create a new task element
    var newTask = document.createElement('div');
    newTask.classList.add('task-name');
    newTask.textContent = taskName;
    newTask.addEventListener('click', selectTask);
  
    // Append the new task to the task container
    taskContainer.appendChild(newTask);
  }



// Function to handle the task selection
function selectTask(event) {
  console.log('selected');
    var selectedTask = event.target;
    
    var allTasks = document.querySelectorAll('.task-name');
    var isAlreadySelected = selectedTask.classList.contains('selected');
    // Remove the 'selected' class from all tasks
    allTasks.forEach(function (task) {
      task.classList.remove('selected');
    });
    
    if(!isAlreadySelected) {
        selectedTask.classList.add('selected');
    }
  }
  
  var deleteTaskButton = document.querySelector('.delete-task-button');
  deleteTaskButton.addEventListener('click', deleteTask);
  // Function to delete task block
  function deleteTask() {
    var selectedTask = document.querySelector('.task-name.selected');
  
    if (selectedTask) {
      // Ask for confirmation before deleting the task
      var confirmDelete = window.confirm('Are you sure you want to delete the selected task?');
  
      if (confirmDelete) {
        // Remove the selected task
        document.querySelectorAll(`[data-task-id="${selectedTask.textContent}"]`).forEach((task) => task.parentNode.removeChild(task));
 
        selectedTask.parentNode.removeChild(selectedTask);
        
      }
    } else {
      window.alert('Please select a task to delete.');
    }
  }
  
  // Add event listeners to the task names
  var taskNames = document.querySelectorAll('.task-name');
  taskNames.forEach(function (task) {
    task.addEventListener('click', selectTask);
  });
  

var cells = document.querySelectorAll('.schedule-body td');
cells.forEach(function (cell) {
cell.addEventListener('click', function(event) {
    if (event.target.tagName.toLowerCase() === 'td') {
    insertTask(event);
    }
});
});
  
// Function to handle the table cell click event
function insertTask(event) {
    var selectedTask = document.querySelector('.task-name.selected');
  
    if (selectedTask) {
      var cell = event.target;
      console.log(cell);
  
      if (!cell.classList.contains('time-header') && !cell.classList.contains('task-in-schedule')) {
        var existingTaskBlock = cell.querySelector('.task-in-schedule[data-task-id="' + selectedTask.id + '"]');
        if (existingTaskBlock) {
          alert('Task already added to the schedule. Please select another task.');
          return;
        }
        var divElement = `<div class="task-in-schedule" data-task-id="${selectedTask.textContent}"}>
        ${selectedTask.textContent}
        <span class="deleteTaskInSchedule">&times;</span>
        </div>`
        console.log(divElement);
  
        // Insert the div element into the clicked cell
        cell.innerHTML += divElement;
      } else {
        window.alert('Please select a valid cell to insert the task.');
      }
    } else {
      window.alert('Please select a task to insert into the table.');
    }
  }
  
  
  // Add event listeners to the task names
  var taskNames = document.querySelectorAll('.task-name');
  taskNames.forEach(function (task) {
    task.addEventListener('click', selectTask);
  });
  



// FUNCTIONS FOR TABLE EDITING
// Add event listener to the "Add Row" button
  const addRowButton = document.querySelector('.add-row-button');
  addRowButton.addEventListener('click', addRow);
  
  const addRowInput = document.querySelector('.time-input');
  addRowInput.addEventListener('input', formatTimeInput);

  const deleteRowButton = document.querySelector('.del-row-button');
  deleteRowButton.addEventListener('click', deleteRow);

  var table = document.querySelector('schedule-table');
  var tbody = document.querySelector('.schedule-body');


function formatTimeInput(event) {
  const addRowInput = document.querySelector('.time-input'); 
  addRowInput.value = addRowInput.value.replace(/[^0-9/]/g, "");
    // Add ":" after the first two digits if it doesn't exist
  if (addRowInput.value.length >= 2 && !addRowInput.value.includes(":")) {
    addRowInput.value = addRowInput.value.slice(0, 2) + ":" + addRowInput.value.slice(2);
  }

  // Add " - " after the first five digits if it doesn't exist
  if (addRowInput.value.length >= 5 && !addRowInput.value.includes(" - ")) {
    addRowInput.value = addRowInput.value.slice(0, 5) + " - " + addRowInput.value.slice(5);
  }

  if (addRowInput.value.length >= 10) {
    addRowInput.value = addRowInput.value.slice(0, 10) + ":" + addRowInput.value.slice(10);
  }

  // Limit the input to a maximum of 13 characters
  if (addRowInput.value.length > 13) {
    addRowInput.value = addRowInput.value.slice(0, 13);
  }

  // Handle the case when a character is deleted using the backspace or delete key
  if (event.inputType === "deleteContentBackward") {
    
    const cursorPosition = addRowInput.selectionStart;
    const inputValue = addRowInput.value;

    // Delete the character before the cursor position
    const newValue =
      inputValue.slice(0, cursorPosition - 1) + inputValue.slice(cursorPosition);

    // Update the input value
    addRowInput.value = newValue;

    // Set the cursor position after the deleted character
    addRowInput.selectionStart = cursorPosition - 1;
    addRowInput.selectionEnd = cursorPosition - 1;
  }
}


function addRow() {
  var newRow = document.createElement('tr');
  // Prompt the user for the time value
  var timeValue = document.querySelector('.time-input').value || null;
  if (timeValue == null) {
    alert('Please fill in the blank');
    return; 
  }

  // Validate the time format using regex
  var timeRegex = /^\d{2}:\d{2}\s-\s\d{2}:\d{2}$/;
  if (!timeRegex.test(timeValue)) {
    window.alert('Invalid time format. Please enter the time in the format HH:MM - HH:MM');
    return; // Exit the function if the time format is invalid
  }

  // Check if the start time is greater than the end time
  var [startTime, endTime] = timeValue.split(' - ');
  if (!isValidTimeInterval(startTime, endTime)) {
    window.alert('Invalid time interval. Please enter a valid time interval.');
    return; // Exit the function if the time interval is invalid
  }

  var timeCells = document.querySelectorAll('.time-header');
  for (var i = 0; i < timeCells.length; i++) {
    var existingTimeValue = timeCells[i].textContent;
    if (isTimeOverlap(timeValue, existingTimeValue)) {
      window.alert('Overlapping time interval. Please enter a non-overlapping time interval.');
      return; // Exit the function if there is an overlap
    }
  }

  // Create the cells for the new row
  var timeCell = document.createElement('td');
  timeCell.classList.add("time-header");
  timeCell.textContent = timeValue;

  // Add the new cells to the row
  newRow.appendChild(timeCell);
  for (var j = 0; j < 7; j++) {
    var cell = document.createElement('td');
    newRow.appendChild(cell);
  }

  // Add the new row to the table body
  tbody.appendChild(newRow);
  var timeRows = Array.from(document.querySelectorAll('.time-header'));
  timeRows.sort(function (a, b) {
    var timeA = a.textContent;
    var timeB = b.textContent;
    return compareTimes(timeA, timeB);
  });

  timeRows.forEach(function (row) {
    tbody.appendChild(row.parentNode); // Append the parent row to the table body
  });

  var newCells = document.querySelectorAll('.schedule-body td');
  newCells.forEach(function (cell) {
    cell.addEventListener('click', insertTask);
  });
}

function compareTimes(timeA, timeB) {
  var [startA] = timeA.split(' - ');
  var [startB] = timeB.split(' - ');
  return startA.localeCompare(startB, undefined, { numeric: true });
}

function isValidTimeInterval(startTime, endTime) {
  const startTimeInMinutes = parseTime(startTime);
  const endTimeInMinutes = parseTime(endTime);
  
  const validTime = startTime.split(':')[0] < 24 && startTime.split(':')[1] < 60 && endTime.split(':')[0] < 24 && endTime.split(':')[1] < 60;
  
  const validInterval = startTimeInMinutes < endTimeInMinutes;
  console.log(validTime && validInterval);
  return validTime && validInterval; 
}

function isTimeOverlap(timeInterval1, timeInterval2) {
  var [start1, end1] = timeInterval1.split(' - ');
  var [start2, end2] = timeInterval2.split(' - ');
  var startTime1 = parseTime(start1);
  var endTime1 = parseTime(end1);
  var startTime2 = parseTime(start2);
  var endTime2 = parseTime(end2);
  return (startTime1 < endTime2 && startTime2 < endTime1);
}

// Function to parse time in HH:MM format into minutes
function parseTime(time) {
  var [hours, minutes] = time.split(':');
  return parseInt(hours) * 60 + parseInt(minutes);
}


  
function deleteRow() {
var rows = tbody.getElementsByTagName('tr');
if (rows.length > 0) {
    tbody.removeChild(rows[rows.length - 1]);
}
}


const reset = document.querySelector(".reset-schedule-button");
reset.addEventListener('click', resetPlanner);

function resetPlanner() {
    var confirmDelete = window.confirm('Are you sure you want to delete all rows?');
    if (confirmDelete) {
        var tbody = document.querySelector('.schedule-body');
        tbody.innerHTML = '';
  }
}

const schedule = document.querySelector('.schedule-body');

// Add a click event listener to the parent <ul> element
schedule.addEventListener('click', deleteTaskInSchedule);

function deleteTaskInSchedule(event) {
  // Check if the clicked element matches the delete button selector
  if (event.target.matches('.deleteTaskInSchedule')) {
    // Get the parent <li> element of the clicked delete button
    var liElement = event.target.parentNode;
    
    // Remove the <li> element from the DOM
    liElement.parentNode.removeChild(liElement);
  }
}

// Send planner data to the database
const userId = sessionStorage.getItem('userId');
const saveSchedule = document.querySelector(".save-schedule-button");
saveSchedule.addEventListener('click', savePlanner);

function savePlanner() {
var taskContainerData = []; // array to store task data

var taskBlocks = document.querySelectorAll(".task-container .task-name");
taskBlocks.forEach(function(taskName) {
  taskContainerData.push(taskName.textContent);
});
console.log(taskBlocks);

// Retrieve schedule data from the schedule-table
var scheduleData = [];
var tableRows = document.querySelectorAll(".schedule-table tbody tr");
tableRows.forEach(function(row) {
    var rowData = [];
    var tableCells = row.querySelectorAll("td");
    tableCells.forEach(function(cell) {
      rowData.push(cell.innerHTML);
    });
    scheduleData.push(rowData);
});
console.log(scheduleData);

const plannerData = {
  tasks: taskContainerData,
  schedule: scheduleData,
  userId: userId
};

fetch(`https://${currentURL}/save-planner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(plannerData)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if (response.status === 409) {
          alert('Save planner failed');
      } else if (response.status === 201){
        alert('Save planner successfully');
      }
    }).catch(error => {
      console.error('Error during login:', error)});

}

const get = document.querySelector('.get-schedule-button');
get.addEventListener('click', getPlanner);

document.addEventListener('DOMContentLoaded', getPlanner);
const getPlannerData = { userId: userId };
function getPlanner() {
  fetch(`https://${currentURL}/get-planner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getPlannerData)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if (response.status === 409) {
          //alert('No planner found');
      } else if (response.status === 201){
        //alert('Get planner successfully');
        response.json().then(data => {
          const tasks = data.tasks;
          const schedule = data.schedule;
          sessionStorage.setItem('taskBlocks', tasks);
          sessionStorage.setItem('scheduleTable', schedule);
          displayPlanner();
      })
    }
  }).catch(error => {
      console.error('Error during query:', error)});
}

function displayPlanner() {
  const taskArray = JSON.parse(sessionStorage.getItem('taskBlocks'));
  const scheduleArray = JSON.parse(sessionStorage.getItem('scheduleTable'));
  console.log(scheduleArray);

  // Display task blocks
  const taskContainer = document.querySelector(".task-container");
  taskContainer.innerHTML = '';
  for(let i = 0; i < taskArray.length; i++) {
    const taskName = taskArray[i];
    taskContainer.innerHTML += `<div class="task-name" id="${taskName}">${taskName}</div><span></span>`;
  }
  const allTasks = document.querySelectorAll(".task-name");
  allTasks.forEach(function(task) {
    task.addEventListener('click', selectTask);
  });
  // Display planner
  const plannerContainer = document.querySelector(".schedule-body");
  plannerContainer.innerHTML = '';
  for(let i = 0; i < scheduleArray.length; i++) {
    const row = scheduleArray[i];
    plannerContainer.innerHTML += 
    `<tr>
    <td class="time-header">${row[0]}</td>
    <td>${row[1]}</td>
    <td>${row[2]}</td>
    <td>${row[3]}</td>
    <td>${row[4]}</td>
    <td>${row[5]}</td>
    <td>${row[6]}</td>
    <td>${row[7]}</td>
  </tr>`
  }
  var newCells = document.querySelectorAll('.schedule-body td');
  newCells.forEach(function (cell) {
    cell.addEventListener('click', insertTask);
  });
}
