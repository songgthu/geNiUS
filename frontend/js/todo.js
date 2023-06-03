

const create = document.querySelector('.addButton');
var modal = document.getElementById("modal");
create.addEventListener('click', createTask);

var span = document.getElementsByClassName("close")[0];
span.addEventListener('click', close);

function createTask(){
  modal.style.display="block";
  const addQuery = document.querySelector('.saveTaskButton');
  addQuery.addEventListener('click', modifyTask);
}
  // Function to add a new task
  function modifyTask() {
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

    fetch(`http://localhost:5501/add-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if (response.status === 201) {
          alert('Add task successfully');
      } else {
       
      }
    })
    .catch(error => {
      console.error('Error during add task:', error)});
    close();
    } else {
      alert("Please fill in all the fields");
    }
  }

  // Function to close task box
  function close() {
    modal.style.display = "none";
  }

  // Discard change
  const cancel = document.querySelector(".cancelTaskButton");
  cancel.addEventListener('click', close);

  // Retrieve task data
  // Fetch task data from the database
  document.addEventListener('DOMContentLoaded', retrieveTask);
  const userId = sessionStorage.getItem("userId");
  const data = { userId: userId };
function retrieveTask(){
  fetch(`http://localhost:5501/tasks`, {
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
        displayTask();
        alert('Task retrieve successfully');
      });
    } else {
     
    }
  })
  .catch(error => {
    console.error('Error during retrieve task:', error)});
}

function displayTask() {
  //const taskData = sessionStorage.getItem('taskData');
  const taskData = JSON.parse(sessionStorage.getItem('taskData'));
  const table = document.querySelector(".task-table")
  const taskBody = document.querySelector(".taskBody");

  for(let i = 0; i < taskData.length; i++) {
    const newRow = document.createElement("tr");
    const taskCell = document.createElement("td");
    const deadlineCell = document.createElement("td");
    const completedCell = document.createElement("td");
    
    
    deadlineCell.textContent = taskData[i].deadline;
    taskCell.textContent = taskData[i].task;
    
    
    const checkboxContainer = document.createElement("div");
    const checkbox = document.createElement("input");
    const checkboxLabel = document.createElement("label");

    checkboxContainer.classList.add("checkbox-container");
    checkbox.type = "checkbox";
    checkbox.id = `statusCheckbox${completedCell.textContent}`;
    checkboxContainer.appendChild(checkbox);
    checkboxContainer.appendChild(checkboxLabel);
    completedCell.appendChild(checkboxContainer);

    newRow.appendChild(taskCell);
    newRow.appendChild(deadlineCell);
    newRow.appendChild(completedCell);
    console.log(newRow);
    taskBody.appendChild(newRow);

  }

}
