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

    // Create a new row
    var table = document.querySelector('.task-table');
    var row = table.insertRow();

    // // Create cells for the task, deadline, and status
    var taskCell = row.insertCell(0);
    var deadlineCell = row.insertCell(1);
    var statusCell = row.insertCell(2);

    // // Set the values for the cells
    taskCell.textContent = taskInput;
    deadlineCell.textContent = deadline;

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
    close();
  }

  // Function to close task box
  function close() {
    modal.style.display = "none";
  }
