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
        
        var moduleInfoAll = document.querySelectorAll(`.info-${liElement.id}`);
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
}

// search
fetch(`http://localhost:5501/modules`, {
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
        const resultOutput = document.querySelector('.result-content');
        resultOutput.innerHTML = moduleCode +`<br>`;
        

        const timetable = data.semesterData[0].timetable;
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

// function displayModule() {
//     const moduleInfo = document.querySelector('.result-content').innerHTML;
//     closeClassModalBox();
//     const scheduleTable = document.querySelector('.class-body');
  
//     // Split the moduleInfo string into individual lines
//     const moduleInfoLines = moduleInfo.split("<br>");
//     var reformattedArray = moduleInfoLines.map(function(element) {
//       return element.trim().replace(/\n/g, '');
//     });
  
//     // Extract the relevant information from the moduleInfo lines
//     console.log(reformattedArray);
//     const moduleName = reformattedArray[0];
//     const session = reformattedArray[1];
//     const weeks = reformattedArray[2];
//     const time = reformattedArray[3];
//     const day = reformattedArray[4].split(":")[1].trim();
//     const venue = reformattedArray[5];

  
//     // Extract the week numbers from the string
//     const applicableWeeksArray = weeks.match(/\d+/g).map(Number);
  
//     // Get the current week number
//     const currentWeek = parseInt(document.querySelector(".current-week").textContent.split(" ")[1]);
  
//     // Check if the current week is in the applicable weeks array
//     for (let i = 1; i <= 13; i++) {
//         if (applicableWeeksArray.includes(i)) {
//             // Get the corresponding day container
//             const dayContainer = document.querySelector(`.${day}-container-week-${i}`);
            
//             // Set the module name in the day container
//             dayContainer.innerHTML = `<div class="${session.split(' ')[0]}info-${moduleName}">${moduleName} <br>
//             ${session} <br>
//             ${time} <br>
//             ${venue}
//             </div>`;
//           }
//     }
    

//     const classList = document.querySelector('.class-list');
//     classList.innerHTML += `<li class="class-name" id="${moduleName}">${moduleName}
//     <span class="material-symbols-outlined"> delete </span>
//     </li>`;
//     attachRemoveClassListener();
//   }

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
        
      const session = reformattedArray[i];
      const weeks = reformattedArray[i + 1];
      const time = reformattedArray[i + 2];
      const day = reformattedArray[i + 3].split(":")[1].trim();
      
      const venue = reformattedArray[i + 4];
         //     // Extract the week numbers from the string
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
            dayContainer.innerHTML += `<div class="${session.split(' ')[0]}info-${moduleName}">${moduleName} <br>
            ${session} <br>
            ${time} <br>
            ${venue}
            </div>`;
          }
    }
    if(reformattedArray.length - (i + 4) == 2) {
        return;
    }
    }
  

  
    const classList = document.querySelector('.class-list');
    classList.innerHTML += `<li class="class-name" id="${moduleName}">${moduleName}
      <span class="material-symbols-outlined"> delete </span>
      </li>`;
    attachRemoveClassListener();
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

  function retrieveModuleSchedule() {

  }

