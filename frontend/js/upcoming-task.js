var currentURL = window.location.href.split("/")[2];
const userId1 = sessionStorage.getItem("userId");
const create1 = document.querySelector('.addButton1');

create1.addEventListener('click', createTask1);

var modal1 = document.querySelector(".modal1");
var editModal1 = document.querySelector(".task-modal1");

var span1 = document.getElementsByClassName("close1")[0];
span1.addEventListener('click', closeTask1);

// Trigger close for edit-modal
const editModalCloseButton1 = document.querySelector(".closeTask1");
console.log(editModalCloseButton1);
editModalCloseButton1.addEventListener("click", closeEditModal1);

function closeEditModal1() {
  editModal1.style.display = "none";
}


function createTask1(){
  modal1.style.display="block";
  const addQuery = document.querySelector('.saveTaskButton1');
  addQuery.addEventListener('click', addTask1);
}
  // Function to add a new task
  function addTask1() {
    // Get the input value
    const taskInput = document.querySelector('.taskInput1').value;
    const deadline = document.querySelector('.deadlineInput1').value;
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
    var table = document.querySelector('.task-table1');
    
    
    console.log(userId);
    console.log(taskInput);
    console.log(formattedDate);
    const data1 = {
      taskInput: taskInput,
      deadline: formattedDate,
      userId: userId
    };

    fetch(`https://${currentURL}/add-task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data1)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if(response.status === 409) {
        alert('Task name already exist');
      } else if (response.status === 201) {
        //alert('Add task successfully');
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
        taskCell.addEventListener('click', function() {
          openTask1(taskCell.textContent); 
        });
        checkbox.addEventListener('click', function() {
          checkBox1(checkbox, taskCell.textContent);
        });
        closeTask1();
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


function closeTask1() {
  modal1.style.display="none";
}

  // Retrieve task data
  // Fetch task data from the database
  document.addEventListener('DOMContentLoaded', retrieveTask1);
  
  const data1 = { userId: userId };
function retrieveTask1(){
  fetch(`https://${currentURL}/tasks`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data1)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      response.json().then(data1 => {
        const results = data1.results; // Access the "results" property
        sessionStorage.setItem('taskData', JSON.stringify(results));
        console.log(sessionStorage.getItem('taskData'));
        displayUpcomingTask();
        //alert('Task retrieve successfully');
      });
    } else {
     
    }
  })
  .catch(error => {
    console.error('Error during retrieve task:', error)});
}


function displayUpcomingTask() {
  const taskData = JSON.parse(sessionStorage.getItem('taskData'));
  const table = document.querySelector(".task-table1")
  const taskBody = document.querySelector(".taskBody1");
  taskBody.innerHTML = "";
  const today = new Date();
  const tomorrow = new Date();
  tomorrow.setDate(today.getDate() + 1);
  for(let i = 0; i < taskData.length; i++) {
    const taskDate = new Date(taskData[i].deadline);
    if (today.getTime() < taskDate.getTime() && taskDate.getTime() >= tomorrow.getTime()) {
    const newRow = document.createElement("tr");
    const taskCell = document.createElement("td");
    taskCell.classList.add("task-name1");
    const deadlineCell = document.createElement("td");
    deadlineCell.classList.add("deadline1");
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
      openTask1(taskCell.textContent); 
    });
    checkbox.addEventListener('click', function() {
      checkBox1(checkbox, taskCell.textContent);
    });
  } 
  }
  
}
// Update checkbox
function checkBox1(checkbox, taskName) {
  const isChecked = checkbox.checked;
  var value = "true";
  if(!isChecked) {
    value = "false";
  }

  const data1 = {
    taskStatus: value,
    taskName: taskName
  };

  fetch(`hhttps://${currentURL}/update-checkbox`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data1)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      //alert('Update checkbox successfully');
      checkbox.checked = isChecked; 
      console.log(isChecked);
    } else {

    }
  })
  .catch(error => {
    console.error('Error during update checkbox:', error)
  });
}


function openTask1(oldTask) {
  console.log("1");
  editModal1.style.display="block";
  //const oldTask= document.querySelector('.task-name').textContent;
  const update = document.querySelector(".saveChangeButton1");
  console.log(update);
  console.log(oldTask);
  
  
  update.addEventListener('click', function(){
    console.log("2");
    updateTask1(oldTask);
  });
  const del = document.querySelector('.deleteTaskButton1');
  del.addEventListener('click', function() {
    deleteTask1(oldTask);
});
}
// Function to update task change (name, deadline, checkbox)
function updateTask1(oldTask) {
  console.log("here");
  const newTask = document.querySelector('.newTaskInput1').value;
  const newDeadline = document.querySelector('.newDeadlineInput1').value;
  var [datePart, timePart] = newDeadline.split('T');
  var [year, month, day] = datePart.split('-');
  var monthString = new Date(datePart + 'T00:00:00').toLocaleString('en-US', { month: 'long' });
  var formattedDate = monthString + ' ' + day + ', ' + year + ', ' + timePart;
  const data1 = {
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
    body: JSON.stringify(data1)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      //alert('Update task successfully');
      retrieveTask1();
      closeEditModal1();
    } else {
     
    }
  }).catch(error => {
    console.error('Error during delete task:', error);
  });
}

// Function to delete task
function deleteTask1(taskName) {

  const data1 = {
    taskName: taskName
  };
  console.log(taskName);

  fetch(`https://${currentURL}/delete-task`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data1)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      alert('Delete task successfully');
      retrieveTask1();
      closeEditModal1();
    } else {
     
    }
  }).catch(error => {
    console.error('Error during delete task:', error);
  });
}