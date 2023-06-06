const currentDate = document.querySelector(".current-date");
const daysTag = document.querySelector(".days");
const prevNextIcon = document.querySelectorAll(".icons span");

let date = new Date();
currYear = date.getFullYear();
currMonth = date.getMonth();

const months =["January", "February", "March", "April", "May", "June", 
                "July", "August", "September", "October", "November", "December"];
const renderCalendar = ()=> {
    let firstDayofMonth = new Date(currYear, currMonth, 1).getDay();
    let lastDateofMonth = new Date(currYear, currMonth + 1, 0).getDate();
    let lastDayofMonth = new Date(currYear, currMonth, lastDateofMonth).getDay();
    let lastDateofLastMonth = new Date(currYear, currMonth, 0).getDate();
    let liTag = "";

    for(let i = firstDayofMonth; i > 0; i--) {
        liTag += `<li class ="inactive">${lastDateofLastMonth - i + 1}</li>`;
    }

    for(let i = 1; i <= lastDateofMonth; i++) {
        let today = i === date.getDate() && currMonth === new Date().getMonth()
        && currYear === new Date().getFullYear() ? "active" : "";
        liTag += `<li class="${today}">${i}</li>`;
    }

    for(let i = lastDayofMonth; i < 6; i++) {
        liTag += `<li class ="inactive">${i - lastDayofMonth + 1}</li>`;
    }

    
    // Show date on task list
    const todayDateContainer = document.querySelector(".today-date");
    const eventDay = todayDateContainer.querySelector(".event-day");
    const eventDate = todayDateContainer.querySelector(".event-fulldate");
    eventDay.innerHTML = new Date().toLocaleDateString("en-US", { weekday: "long" });
    eventDate.innerHTML = new Date().toLocaleDateString("en-US", {
        day: "2-digit",
        month: "long",
        year: "numeric"
    });
    retrieveTaskList(eventDate);

    // Activate date when clicked on
    currentDate.innerText = `${months[currMonth]} ${currYear}`;
    daysTag.innerHTML = liTag;
    const dateElements = document.querySelectorAll(".days li");
    dateElements.forEach(dateElement => {
        dateElement.addEventListener("click", () => {
            dateElements.forEach(element => {
                element.classList.remove("active");
            });
            dateElement.classList.add("active");
        });
    });

    // Show date on task list
    const allDates = document.querySelectorAll(".days li");
    allDates.forEach(dateElement => {
        dateElement.addEventListener("click", () => {
            dateElements.forEach(element => {
                element.classList.remove("active");
            });
            dateElement.classList.add("active");
            
            const selectedDate = new Date(currYear, currMonth, parseInt(dateElement.innerText));
            const selectedDay = selectedDate.toLocaleDateString("en-US", { weekday: "long" });
            const selectedFormattedDate = selectedDate.toLocaleDateString("en-US", {
                day: "2-digit",
                month: "long",
                year: "numeric"
            });
            
            eventDay.innerHTML = selectedDay;
            eventDate.innerHTML = selectedFormattedDate;
            retrieveTaskList(selectedFormattedDate);
        });
                  
});
}
renderCalendar();

// Navigate to previous, next month
prevNextIcon.forEach(icon => {
    icon.addEventListener("click", () => {
        currMonth = icon.id === "prev" ? currMonth - 1 : currMonth + 1;
        
        if(currMonth < 0 || currMonth > 11) {
            date = new Date(currYear, currMonth);
            currYear = date.getFullYear();
            currMonth = date.getMonth();
        } else {
            date = new Date();
        }
        renderCalendar();
    })
});

// Navigate to today or a specific month of year
const todayButton = document.querySelector(".today-button");
const searchButton = document.querySelector(".search-button");
const dateInput = document.querySelector(".date-input");

todayButton.addEventListener('click', goToToday);
searchButton.addEventListener('click', goToDate);
dateInput.addEventListener('input', formatDate);

function goToToday() {
 today = new Date();
 currMonth = today.getMonth();
 currYear = today.getFullYear();
 renderCalendar();
}

function formatDate(event) {
 dateInput.value = dateInput.value.replace(/[^0-9/]/g, "");
 if(dateInput.value.length == 2) {
    dateInput.value += "/";
 }
 if(dateInput.value.length > 7) {
    dateInput.value = dateInput.value.slice(0,7);
 }
 if(event.inputType == "deleteContentBackward") {
    if(dateInput.value.length == 3) {
        dateInput.value = dateInput.value.slice(0,2);
    }
 }
}

function goToDate() {
    const date = dateInput.value.split("/");
    if(date.length == 2) {
        if(date[0] > 0 && date[0] < 13 && date[1].length == 4) {
            currMonth = date[0] - 1;
            currYear = date[1];
            renderCalendar();
            return;
        }
    }
    alert("Invalid month or year");
}

function retrieveTaskList(selectedFormattedDate) {
    // Make fetch call to retrieve task list
    const data = {
        dataDate: selectedFormattedDate
    };
fetch(`http://localhost:5501/task-list`, {
    method: 'POST',
    headers: {
    'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
})
.then(response => {
    if (response.status === 500) {
        alert('Internal server error');
        } else if (response.status === 201) {
        response.json().then(data => {
            // Display the tasks on the task list
            const results = data.results; // Access the "results" property
            sessionStorage.setItem('taskListData', JSON.stringify(results));
            console.log(sessionStorage.getItem('taskListData'));
            displayDateTask();
            alert('Task retrieve successfully');
            
        })
    } 
})
.catch(error => {
console.error(error);
});
}


// Display task
function displayDateTask() {
    const taskListData = JSON.parse(sessionStorage.getItem('taskListData'));
    const table = document.querySelector(".taskListTable")
    const taskBody = document.querySelector(".taskListBody");
    taskBody.innerHTML = "";
    
    for(let i = 0; i < taskListData.length; i++) {
      
      const newRow = document.createElement("tr");
      const taskCell = document.createElement("td");
      taskCell.classList.add("task-name");
      const deadlineCell = document.createElement("td");
      deadlineCell.classList.add("deadline");
      const completedCell = document.createElement("td");
      
      deadlineCell.textContent = taskListData[i].deadline;
      taskCell.textContent = taskListData[i].task;
      
      const checkboxContainer = document.createElement("div");
      const checkbox = document.createElement("input");
      const checkboxLabel = document.createElement("label");
      checkbox.checked = taskListData[i].completed == 1 ? true : false;
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
      
    } 
    }

