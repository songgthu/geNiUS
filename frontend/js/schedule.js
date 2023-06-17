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
      return; // If the user cancels or leaves the input empty, exit the function
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
  
      if (!cell.classList.contains('time-header')) {
        var existingTaskBlock = cell.querySelector('.task-in-schedule[data-task-id="' + selectedTask.id + '"]');
        if (existingTaskBlock) {
          alert('Task already added to the schedule. Please select another task.');
          return;
        }
        var divElement = `<div class="task-in-schedule" data-task-id="${selectedTask.id}"}>
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

  const deleteRowButton = document.querySelector('.del-row-button');
  deleteRowButton.addEventListener('click', deleteRow);

  var table = document.querySelector('schedule-table');
  var tbody = document.querySelector('.schedule-body');
// Function to add a new row to the table
function addRow() {
    var newRow = document.createElement('tr');
// Prompt the user for the time value
var timeValue = window.prompt('Enter the time in the format HH:MM - HH:MM:');
if (timeValue === null || timeValue === '') {
  return; // If the user cancels or leaves the input empty, exit the function
}

// Validate the time format using regex
var timeRegex = /^\d{2}:\d{2}\s-\s\d{2}:\d{2}$/;
if (!timeRegex.test(timeValue)) {
  window.alert('Invalid time format. Please enter the time in the format HH:MM - HH:MM');
} else {
// Create the cells for the new row
var timeCell = document.createElement('td');
timeCell.classList.add("time-header");
timeCell.textContent = timeValue;

// Add the new cells to the row
newRow.appendChild(timeCell);
for (var i = 0; i < 7; i++) {
  var cell = document.createElement('td');
  
  newRow.appendChild(cell);
}

// Add the new row to the table body
tbody.appendChild(newRow);
var newCells = document.querySelectorAll('.schedule-body td');
  newCells.forEach(function (cell) {
    cell.addEventListener('click', insertTask);
  });
}

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

fetch(`http://localhost:5501/save-planner`, {
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
  fetch(`http://localhost:5501/get-planner`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getPlannerData)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if (response.status === 409) {
          alert('No planner found');
      } else if (response.status === 201){
        alert('Get planner successfully');
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
