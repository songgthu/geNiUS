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
  
        var divElement = document.createElement('div');
        divElement.classList.add('task-in-schedule');
        divElement.setAttribute('data-task-id', selectedTask.id);
        divElement.textContent = selectedTask.textContent;
        console.log(divElement);
  
        // Insert the div element into the clicked cell
        cell.appendChild(divElement);
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
