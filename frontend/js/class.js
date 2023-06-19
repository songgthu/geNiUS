var todoList = null;
// REMOVE CLASS
function attachRemoveClassListener() {
    const liElements = document.querySelectorAll(".class-name");
    const spanElements = Array.from(liElements).map(li => li.querySelector("span.material-symbols-outlined"));
  
    spanElements.forEach(spanElement => {
      spanElement.addEventListener('click', removeClass);
    });
}
attachRemoveClassListener();

function removeClass(event) {
    const confirmRemove = window.confirm('Are you sure you want to delete this module?');
    if (confirmRemove) {
        var spanElement = event.target; 
        var liElement = spanElement.parentNode; 
        liElement.parentNode.removeChild(liElement);
        
        var moduleInfoAll = document.querySelectorAll(`[class$="info-${liElement.id}"]`);
        moduleInfoAll.forEach(moduleInfo => {
            moduleInfo.remove();
        });
    }
}


// OPEN, CLOSE CLASS MODAL BOX
const addClassButton = document.querySelector('.add-class-button');
addClassButton.addEventListener('click', openClassModalBox);
const classModalBox = document.querySelector('.class-modal');
const closeClassModal = document.querySelector('.class-modal-close');
closeClassModal.addEventListener('click', closeClassModalBox);

function openClassModalBox() {
    classModalBox.style.display = 'flex';
}

function closeClassModalBox() {
    classModalBox.style.display = 'none';
}


// WEEK SCHEDULE DISPLAY
var currentWeek = 1; // Initial week number
// Initial update of the current week display
updateCurrentWeekDisplay();
generateLayout();
// Function to update the current week display
function updateCurrentWeekDisplay() {
    var currentWeekElement = document.querySelector('.current-week');
    currentWeekElement.textContent = 'Week ' + currentWeek;

}

// Event listener for the previous week button
document.getElementById('prevWeek').addEventListener('click', function() {
    if (currentWeek > 1) {
    const classContainer = document.querySelector(`.class-container-week-${currentWeek}`);
    classContainer.style.display ='none';
    currentWeek--;
    updateCurrentWeekDisplay();
    const classContainerPrev = document.querySelector(`.class-container-week-${currentWeek}`);
    classContainerPrev.style.display ='';
    }
});

// Event listener for the next week button
document.getElementById('nextWeek').addEventListener('click', function() {
    if (currentWeek < 13) {
        const classContainer = document.querySelector(`.class-container-week-${currentWeek}`);
        classContainer.style.display ='none';
        currentWeek++;
        updateCurrentWeekDisplay();
        const classContainerNext = document.querySelector(`.class-container-week-${currentWeek}`);
        classContainerNext.style.display ='';
    }
});


// SEARCH CLASS USING NUSMODS API
// Get input data
const searchClass = document.querySelector(".search-class-button");
searchClass.addEventListener('click', searchModule);

function searchModule() {
// get input data
const moduleCode = document.querySelector('.classInput').value.trim() || null;
const tutorial = document.querySelector('.tutorialInput').value.trim() || null;
const lab = document.querySelector('.labInput').value.trim() || null;
const recitation = document.querySelector('.recInput').value.trim() || null;
var searchData = {};

if (moduleCode !== null && (tutorial !== null || lab !== null || recitation !== null)) {
    searchData.moduleCode = moduleCode;

    if (tutorial !== null) {
      searchData.tutorial = tutorial;
    }
    
    if (lab !== null) {
      searchData.lab = lab;
    }
    
    if (recitation !== null) {
      searchData.recitation = recitation;
    }
} else {
    alert('Please fill in module code and at least one field (Tutorial/Lab/Recitation)');
    return;
}

// search
fetch(`https://genius-4gmr.onrender.com/modules`, {
        method: 'POST',
        headers: {
        'Content-Type': 'application/json'
        },
        body: JSON.stringify(searchData)
    }).then(response => response.json())
    .then(data => {
        // Process the retrieved data
        
        const targetLabSession = searchData.lab;
        const targetRecitationSession = searchData.recitation;
        const targetTutorialSession = searchData.tutorial;
        
        // sem 1
        const semesterDropdown = document.getElementById('semester-dropdown');
        var semesterValue = semesterDropdown.value == 1 ? 0 : 1;
        
        const resultOutput = document.querySelector('.result-content');
        resultOutput.innerHTML = moduleCode +`<br>`;
        
        console.log(semesterValue);
        const timetable = data.semesterData[semesterValue].timetable;
        for (let j = 0; j < timetable.length; j++) {
            const lessonType = timetable[j].lessonType;
            const classNo = timetable[j].classNo;
        
            if (lessonType === "Laboratory" && classNo === targetLabSession) {
            const startTime = timetable[j].startTime;
            const formattedStartTime = startTime.slice(0, 2) + ":" + startTime.slice(2);
            const endTime = timetable[j].endTime;
            const formattedEndTime = endTime.slice(0, 2) + ":" + endTime.slice(2);
            const venue = timetable[j].venue;
            const day = timetable[j].day;
            const weeks = timetable[j].weeks;

            const labData = `Lab Session - ${classNo}<br>
            Weeks: ${weeks}<br>
            Time: ${formattedStartTime} - ${formattedEndTime}<br>
            Day: ${day}<br>
            Venue: ${venue}<br>
            <div class="horizontal-line"></div><br>`;
            resultOutput.innerHTML += labData;
            console.log(labData);
            } else if (lessonType === "Recitation" && classNo === targetRecitationSession) {
            const startTime = timetable[j].startTime;
            const formattedStartTime = startTime.slice(0, 2) + ":" + startTime.slice(2);
            const endTime = timetable[j].endTime;
            const formattedEndTime = endTime.slice(0, 2) + ":" + endTime.slice(2);
            const venue = timetable[j].venue;
            const day = timetable[j].day;
            const weeks = timetable[j].weeks;

            const recData = `Recitation Session - ${classNo}<br>
            Weeks: ${weeks}<br>
            Time: ${formattedStartTime} - ${formattedEndTime}<br>
            Day: ${day}<br>
            Venue: ${venue}<br>
            <div class="horizontal-line"></div><br>`;
            resultOutput.innerHTML += recData;
            console.log(recData);
            } else if (lessonType === "Tutorial" && classNo === targetTutorialSession) {
            const startTime = timetable[j].startTime;
            const formattedStartTime = startTime.slice(0, 2) + ":" + startTime.slice(2);
            const endTime = timetable[j].endTime;
            const formattedEndTime = endTime.slice(0, 2) + ":" + endTime.slice(2);
            const venue = timetable[j].venue;
            const day = timetable[j].day;
            const weeks = timetable[j].weeks;

            const tutData = `Tutorial Session - ${classNo}<br>
            Weeks: ${weeks}<br>
            Time: ${formattedStartTime} - ${formattedEndTime}<br>
            Day: ${day}<br>
            Venue: ${venue}<br>
            <div class="horizontal-line"></div><br>`;
            resultOutput.innerHTML += tutData;
    
            }
        }
        console.log(resultOutput.innerHTML);
        }
        
        
    )
    .catch(error => {
        // Handle any errors
        console.error('Error:', error);
    });
}

// SUBMIT BUTTON -> DISPLAY MODULE SCHEDULE
const submitButton = document.querySelector('.submit-class-button');
submitButton.addEventListener('click', displayModule);

function attachRemoveTaskListener() {
  const removeIcons = todoList.querySelectorAll(`[class$="-removeTask"]`);
  removeIcons.forEach(icon => icon.addEventListener('click', removeTask));
}

function displayModule() {
    const moduleInfo = document.querySelector('.result-content').innerHTML;
    closeClassModalBox();
  
    // Split the moduleInfo string into individual lines
    const moduleInfoLines = moduleInfo.split("<br>");
    var array = moduleInfoLines.map(function (element) {
      return element.trim().replace(/\n/g, '');
    });
  
    // Extract the relevant information from the moduleInfo lines
    const reformattedArray = array.filter(item => !item.includes('<div class="horizontal-line"></div>'));
    const moduleName = reformattedArray[0];
    console.log(array);
    console.log(reformattedArray);
    
    for (let i = 1; i < reformattedArray.length; i += 5) {
        
      const session = reformattedArray[i].split(' ')[0];
      const weeks = reformattedArray[i + 1];
      const time = reformattedArray[i + 2];
      const day = reformattedArray[i + 3].split(":")[1].trim();
      
      const venue = reformattedArray[i + 4];
     // Extract the week numbers from the string
    const applicableWeeksArray = weeks.match(/\d+/g).map(Number);
    console.log(session);
    console.log(weeks);
    console.log(time);
    console.log(day);
    console.log(applicableWeeksArray);

    // Get the current week number
    const currentWeek = parseInt(document.querySelector(".current-week").textContent.split(" ")[1]);

    // Check if the current week is in the applicable weeks array
    for (let i = 1; i <= 13; i++) {
        if (applicableWeeksArray.includes(i)) {
            // Get the corresponding day container
            const dayContainer = document.querySelector(`.${day}-container-week-${i}`);
        
            // Set the module name in the day container
            dayContainer.innerHTML += `<div class="${session}info-${moduleName}">${moduleName} <br>
            ${session} <br>
            ${time} <br>
            ${venue} <br>
            <div class="header-${session}-${moduleName}-w${i}"> 
            <h3 class="title-${session}-${moduleName}-w${i}"> To-do list </h3>
            <span class="material-symbols-outlined ${session}-${moduleName}-w${i}-addTask">add_task</span>
            </div>
            <ul class="todolist-${session}-${moduleName}-w${i}"> 
            </ul>
            
            </div>
            `;

            
            const addTaskIcons = document.querySelectorAll(`.material-symbols-outlined.${session}-${moduleName}-w${i}-addTask`);
            console.log(addTaskIcons);
            addTaskIcons.forEach(icon => {
              icon.addEventListener('click', () => addTaskInModule(session, moduleName, i));
              
            });
            
            
          }
    }
    if(reformattedArray.length - (i + 4) == 2) {
        break;
    }
    
    }
    const classList = document.querySelector('.class-list');
    classList.innerHTML += `<li class="class-name" id="${moduleName}">${moduleName}
      <span class="material-symbols-outlined"> delete </span>
      </li>`;
    attachRemoveClassListener();

  }

function addTaskInModule(session, moduleName, i) {
    todoList = document.querySelector(`.todolist-${session}-${moduleName}-w${i}`);
    console.log("Session: " + session);
    console.log("M: " + moduleName);
    console.log("W: " + i);
    const task = prompt('What is your homework for this session?');
    if (task !== null && task.trim() !== '') {
      
      const listItem = document.createElement('li');
      const checkbox = document.createElement('input');
      checkbox.type = 'checkbox';
      checkbox.classList.add('sessionTaskCheckbox');
      
      const label = document.createElement('label');
      label.textContent = task;
      
      listItem.appendChild(label);
      listItem.appendChild(checkbox);
      listItem.innerHTML += `<span class="material-symbols-outlined ${session}-${moduleName}-w${i}-removeTask"> remove </span>`;
      
      todoList.appendChild(listItem);
      attachRemoveTaskListener();
    } else if (task != null && task.trim() == ''){
      alert('Cannot create empty task');
    }              
      
}


function removeTask(event) {
    const confirmRemove = window.confirm('Are you sure you want to delete this task?');
    if (confirmRemove) {
        var spanElement = event.target; 
        console.log(spanElement);
        var liElement = spanElement.parentNode; 
        liElement.parentNode.removeChild(liElement);
    }
}

  function generateLayout() {
    const scheduleTable = document.querySelector(`.class-body`);
    
    scheduleTable.innerHTML = '';
    for (let i = 1; i <= 13; i++) {
        scheduleTable.innerHTML += `<tr class="class-container-week-${i}" style="display:none">
        <th class="Monday-container-week-${i}"></th>
        <th class="Tuesday-container-week-${i}"></th>
        <th class="Wednesday-container-week-${i}"></th>
        <th class="Thursday-container-week-${i}"></th>
        <th class="Friday-container-week-${i}"></th>
      </tr>`
    }
    const week1 = document.querySelector('.class-container-week-1');
    week1.style.display='';
    console.log(scheduleTable.innerHTML);

  }

 
  const saveChangesButton= document.querySelector('.save-changes-button');
  saveChangesButton.addEventListener('click', saveModuleSchedule);

  var moduleListArray = [];
  var moduleScheduleArray = [];


  function saveModuleSchedule() {
    // Store module list in an array
  var moduleList = document.querySelector('.class-list').getElementsByTagName('li');
  for (var i = 0; i < moduleList.length; i++) {
    var module = moduleList[i].id;
    moduleListArray.push(module);
  }
  // Store module schedule in an array
  var scheduleRows = document.querySelector('.class-body').getElementsByTagName('tr');
  for (var i = 0; i < scheduleRows.length; i++) {
  var row = scheduleRows[i];
  var rowData = [];

  var cells = row.getElementsByTagName('th');
  for (var j = 0; j < cells.length; j++) {
    var cell = cells[j];
    rowData.push(cell.textContent);
  }
  moduleScheduleArray.push(rowData);
}

    const moduleData = {
      moduleList: document.querySelector('.class-list').innerHTML,
      moduleSchedule: document.querySelector('.class-body').innerHTML,
      userId: sessionStorage.getItem('userId')
    };
    console.log(moduleData);
    fetch(`https://genius-4gmr.onrender.com/save-module-schedule`, {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json'
          },
          body: JSON.stringify(moduleData)
        }).then(response => {
          if (response.status === 500) {
            alert('Internal server error');
          } else if (response.status === 409) {
              alert('Save module schedule failed');
          } else if (response.status === 201){
            alert('Save module schedule successfully');
          } else {
            alert('?');
          }
        }).catch(error => {
          console.error('Error during query:', error)});
  }

  
  const getModuleScheduleButton = document.querySelector('.get-module-schedule-button');
  getModuleScheduleButton.addEventListener('click', retrieveModuleSchedule);

  document.addEventListener('DOMContentLoaded', retrieveModuleSchedule);
  attachRemoveTaskListener();

  const getModuleScheduleData = { userId: sessionStorage.getItem('userId')};

  function retrieveModuleSchedule() {
    fetch(`https://genius-4gmr.onrender.com/get-module-schedule`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(getModuleScheduleData)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if (response.status === 409) {
          alert('No module schedule found');
      } else if (response.status === 201){
        alert('Get module schedule successfully');
        response.json().then(data => {
          document.querySelector('.class-list').innerHTML = data.moduleList;
          attachRemoveClassListener();
          document.querySelector('.class-body').innerHTML = data.moduleSchedule;
          attachRemoveTaskListener();

          const addTaskElements = document.querySelectorAll('[class$="-addTask"]');
          addTaskElements.forEach((add)=> add.addEventListener('click', () => 
          addTaskInModule(
          add.className.split(' ')[1].split('-')[0],
          add.className.split(' ')[1].split('-')[1], 
          add.className.split(' ')[1].split('-')[2].split('')[1])));

      })
    }
  }).catch(error => {
      console.error('Error during query:', error)});
  }

