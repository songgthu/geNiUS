var currentURL = window.location.href.split("/")[2];
var examObjects = {};
const modal = document.querySelector(".exam-modal");
const editModal = document.querySelector(".edit-exam-modal");

const openModalBtn = document.querySelector(".create-exam-button");
const closeModalBtn = document.querySelector(".close-exam-modal");
const closeEditModalBtn = document.querySelector(".close-edit-exam-modal");


openModalBtn.addEventListener("click", openModal);
closeModalBtn.addEventListener("click", closeModal);
closeEditModalBtn.addEventListener("click", closeEditModal);

function openModal() {
  modal.style.display ='block';
}

function closeModal() {
  modal.style.display ='none';
}

function openEditModal() {
  editModal.style.display ='block';
}

function closeEditModal() {
  editModal.style.display ='none';
}

const addContentBtn = document.querySelector('.add-content-button');
addContentBtn.addEventListener('click', addContent);
const addEditContentBtn = document.querySelector('.add-edit-content-button');
addEditContentBtn.addEventListener('click', addEditContent);

function addContent() {
  const content = modal.querySelector('.content-input').value;
  if (content == '') {
    alert('Cannot add empty content');
  } else {
    const contentList = modal.querySelector('.review-content-list');
    contentList.innerHTML += `<li class="content-item">
    
    <span class="content-text">${content}</span>
    <span class="material-symbols-outlined editContent"> edit </span>
    <span class="material-symbols-outlined deleteContent"> delete </span>
    </li>`;
    attachRemoveContentListener();
    attachEditContentListener();
  }
}

function addEditContent() {
  const content = editModal.querySelector('.edit-content-input').value;
  if (content == '') {
    alert('Cannot add empty content');
  } else {
    const contentList = editModal.querySelector('.edit-review-content-list');
    contentList.innerHTML += `<li class="content-item">
    
    <span class="content-text">${content}</span>
    <span class="material-symbols-outlined editContent"> edit </span>
    <span class="material-symbols-outlined deleteContent"> delete </span>
    </li>`;
    attachRemoveContentListener();
    attachEditContentListener();
  }
}

function attachRemoveContentListener() {
  modal.querySelectorAll('.material-symbols-outlined.deleteContent').forEach((icon) => {
    icon.addEventListener('click', removeContent);
  });
  editModal.querySelectorAll('.material-symbols-outlined.deleteContent').forEach((icon) => {
    icon.addEventListener('click', removeContent);
  });
}
attachRemoveContentListener();
function removeContent(event) {
  console.log('remove');
  const listItem = event.target.parentElement;
  listItem.remove();
}
attachRemoveContentListener();

function attachEditContentListener() {
  modal.querySelectorAll('.material-symbols-outlined.editContent').forEach((icon) => {
    icon.addEventListener('click', editContent);
  });
  editModal.querySelectorAll('.material-symbols-outlined.editContent').forEach((icon) => {
    icon.addEventListener('click', editContent);
  });
}
attachEditContentListener();
function editContent(event) {
  console.log('edit');
  const edited = prompt('Change review content:');
  if(edited == '') {
    alert('Cannot add empty content');
    return;
  } else if (edited != null) {
    event.target.previousElementSibling.textContent = edited;
  }
}
attachEditContentListener();


const submitExam = modal.querySelector('.submit-exam-button');
submitExam.addEventListener('click', addExam);
var countdownArray = [];

function addExam() {
  // Select input values from modal
  const name = modal.querySelector('.examNameInput').value || null;
  const date = modal.querySelector('.examDateInput').value || null;
  const venue = modal.querySelector('.examVenueInput').value || null;

  var contentArr = [];
  modal.querySelector('.review-content-list').querySelectorAll('.content-text').
  forEach((content) => contentArr.push([content.textContent, 'unchecked']));
  // Create to-do list
  const newList = document.createElement('ul');
  newList.classList.add(`review-to-do-list-${name}`);

// Create list items and append them to the new <ul> element
for (let i = 0; i <= contentArr.length - 1; i++) {
  const listItem = document.createElement('li');
  listItem.textContent = contentArr[i][0];
  listItem.innerHTML += `<input type="checkbox" class="content-checkbox ${contentArr[i][1]}"></input>`;
  newList.appendChild(listItem);

  
}
const now = new Date();
  if (name == null || date == null || venue == null) {
    alert('Please fill in exam name, date and venue before submit');
    return;
  } else if (date.getTime() === now.getTime()) {
    alert('Invalid date selected. Cannot create a countdown for the present time.');
    return;
  } else if (date.getTime() < now.getTime()){
    alert('Invalid date selected. Cannot create a countdown of a past event.');
    return;
  } else {
    const options = {
      year: 'numeric',
      month: 'long',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    };
    const formattedDate = new Date(date).toLocaleDateString('en-US', options);
  
    const container = document.querySelector('.exam-container');
    container.innerHTML += `<div class="exam-container-${name}">
    <span class="material-symbols-outlined edit-exam-${name}"> edit </span>
    <span class="material-symbols-outlined remove-exam-${name}">remove</span>
    <h3 class="exam-title"> ${name.toUpperCase()} </h3>
    <p class="exam-info"> 
    Date: ${formattedDate} <br>
    Venue: ${venue} <br>
    </p> 
    <div class="exam-countdown-${name}">
    <div class="timing-part">
      <div class="countdown-item">
        <span class="countdown-number" id="countdown-days">00</span>
        <span class="countdown-tag">DAYS</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number" id="countdown-hours">00</span>
        <span class="countdown-tag">HOURS</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number" id="countdown-minutes">00</span>
        <span class="countdown-tag">MINUTES</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number" id="countdown-seconds">00</span>
        <span class="countdown-tag">SECONDS</span>
      </div>
    </div>
    </div>
    <button class="toggle-content-${name}">Show Review Content</button>

    <div class="review-content-${name}" style="display:none"> Review To-do List:
    ${newList.innerHTML}
    </div>

    </div>`;

    examObjects[name] = [date, venue, contentArr];
    
    
    
    // Add event listener to show/hide review content
    attachContentEventListener();

    // Add event listener to check/uncheck checkbox
    attachCheckboxEventListener(name);

    // Add event listener to remove exam
    attachRemoveExamEventListener();
    closeModal();

    // Add event listener to start countdown
    attachCountdownFunction();

    attachEditExamEventListener(name);

    const exam = {
      name: name,
      date: date,
      venue: venue,
      todolist: contentArr,
      userId: sessionStorage.getItem('userId')
    };
    fetch(`https://${currentURL}/add-exam`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exam)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 409) {
      alert('Exam name already exist')
    } else if (response.status === 201) {
      alert('Add exam successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});

  }
}

function attachCheckboxEventListener(name) {
  document.querySelectorAll('.content-checkbox').forEach((checkbox) => checkbox.addEventListener('change', function () {
    if(checkbox.checked) {
      checkbox.classList.remove('unchecked');
      checkbox.classList.add('checked');
      
      for (var content in examObjects[name][2]) {
        if(checkbox.parentElement.textContent === examObjects[name][2][content][0]) {
          examObjects[name][2][content][1] = 'checked';
          console.log(examObjects[name][2]);
        }
      }
      
      console.log('checked');
    } else {
      checkbox.classList.remove('checked');
      checkbox.classList.add('unchecked');

      for (var content in examObjects[name][2]) {
        if(checkbox.parentElement.textContent === examObjects[name][2][content][0]) {
          examObjects[name][2][content][1] = 'unchecked';
          console.log(examObjects[name][2]);
        }
      }

      console.log('unchecked');
    }
    const data = {
      userId: sessionStorage.getItem('userId'),
      name: name,
      todolist: examObjects[name][2]

    }
    fetch(`https://${currentURL}/update-exam-checkbox`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 409) {
      alert('Update checkbox failed')
    } else if (response.status === 201) {
      //alert('Update checkbox successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});
  }));
}

function attachCountdownFunction() {
  function formatTime(time) {
    return time.toString().padStart(2, '0');
  }

  for (var name in examObjects) {
    const countdownDate = new Date(examObjects[name][0]).getTime();
    // select elements to input values
    const countdown = document.querySelector(`.exam-countdown-${name}`);
    const dayHolder = countdown.querySelector("#countdown-days");
    const hourHolder = countdown.querySelector("#countdown-hours");
    const minuteHolder = countdown.querySelector("#countdown-minutes");
    const secondHolder = countdown.querySelector("#countdown-seconds");
  
    let daysCD = 0;
    let hoursCD = 0;
    let minutesCD = 0;
    let secondsCD = 0;
    const countdownInterval = setInterval(updateCountdown, 1000);
    function updateCountdown() {
      const currentTime = new Date().getTime();
      const remainingTime = countdownDate - currentTime;
  
      if (remainingTime <= 0) {
        stopCountdown();
        return;
      }
  
      daysCD = Math.floor(remainingTime / (1000 * 60 * 60 * 24));
      hoursCD = Math.floor((remainingTime % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      minutesCD = Math.floor((remainingTime % (1000 * 60 * 60)) / (1000 * 60));
      secondsCD = Math.floor((remainingTime % (1000 * 60)) / 1000);
  
      secondsCD--;
  
      if (secondsCD < 0) {
        minutesCD--;
        secondsCD = 59;
      }
  
      if (minutesCD < 0) {
        hoursCD--;
        minutesCD = 59;
      }
      if (hoursCD < 0) {
        daysCD--;
        hoursCD = 23;
      }
  
      dayHolder.textContent = formatTime(daysCD);
      hourHolder.textContent = formatTime(hoursCD);
      minuteHolder.textContent = formatTime(minutesCD);
      secondHolder.textContent = formatTime(secondsCD);
  
  
      if (daysCD <= 0 && hoursCD <= 0 && minutesCD <= 0 && secondsCD <= 0) {
        stopCountdown();
        alert(eventHolder.textContent + " countdown ends!");
      }
  }
  
  function stopCountdown() {
    delete examObjects.name;
    clearInterval(countdownInterval);
    dayHolder.textContent = '00';
    hourHolder.textContent = '00';
    minuteHolder.textContent = '00';
    secondHolder.textContent = '00';
  }
  }
  
}

    
function toggleContent(name) {
  var btn = document.querySelector(`.toggle-content-${name}`);
  var content = document.querySelector(`.review-content-${name}`);
  // show
  if (content.style.display === 'none') {
    content.style.display = '';
    btn.textContent = 'Hide Review Content';
  
  // hide
  } else {
    content.style.display = 'none';
    btn.textContent = 'Show Review Content';
  }
}

function attachContentEventListener() {
  const toggleContentBtns = document.querySelectorAll(`[class^="toggle-content-"]`);
  toggleContentBtns.forEach((btn) => btn.addEventListener('click', function() {
    toggleContent(btn.className.split('-')[2]);
  }));
}
attachContentEventListener();

function attachRemoveExamEventListener() {
  const removeExamBtns = document.querySelectorAll(`[class^="material-symbols-outlined remove-exam-"]`);
  removeExamBtns.forEach((btn) => btn.addEventListener('click', function() {
    removeExam(btn.className.split(' ')[1].split('-')[2]);
  }));
  console.log(removeExamBtns);
}
attachRemoveExamEventListener();

function removeExam(name) {
  const exam = document.querySelector(`.exam-container-${name}`);
  const data = { 
    name: name, 
    userId: sessionStorage.getItem('userId')
  };
  fetch(`https://${currentURL}/delete-exam`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 409) {
      alert('Error during delete exam')
    } else if (response.status === 201) {
      //alert('Delete exam successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});
  delete examObjects[name];
  console.log(examObjects);
  console.log(examObjects.name);
  exam.remove();
}

function attachEditExamEventListener(name) {
  const editExamBtns = document.querySelectorAll(`[class^="material-symbols-outlined edit-exam-"]`);
  editExamBtns.forEach((btn) => btn.addEventListener('click', function() {
    editExam(name);
  }));
}


function editExam(oldName) {
  openEditModal();
  editModal.querySelector('.edit-examNameInput').value = oldName;
  editModal.querySelector('.edit-examDateInput').value =  examObjects[oldName][0];
  editModal.querySelector('.edit-examVenueInput').value = examObjects[oldName][1];
  editModal.querySelector('.edit-review-content-list').innerHTML = '';
  for (let i = 0; i < examObjects[oldName][2].length; i++) {
    editModal.querySelector('.edit-review-content-list').innerHTML += `<li class="content-item">
    
    <span class="content-text">${examObjects[oldName][2][i][0]}</span>
    <span class="material-symbols-outlined editContent"> edit </span>
    <span class="material-symbols-outlined deleteContent"> delete </span>
    </li>`;
  }
  

  attachEditContentListener();
  attachRemoveContentListener();

  const updateExamBtn = editModal.querySelector('.update-exam-button');
  updateExamBtn.addEventListener('click', function() {
    updateExam(oldName); }
    );

}


function updateExam(oldName) {
  const newName = editModal.querySelector('.edit-examNameInput').value || null;
  const newDate = editModal.querySelector('.edit-examDateInput').value || null;
  const newVenue = editModal.querySelector('.edit-examVenueInput').value || null;
 
  if (newName == null || newDate == null || newVenue == null) {
    alert('Please fill in exam name, date and venue before submit');
    return;
  }

  var contentArr = [];
  editModal.querySelector('.edit-review-content-list').querySelectorAll('.content-text').
  forEach((content) => contentArr.push([content.textContent, 'unchecked']));
  // Create to-do list
  const newList = document.createElement('ul');
  newList.classList.add(`review-to-do-list-${newName}`);

// Create list items and append them to the new <ul> element
for (let i = 0; i <= contentArr.length - 1; i++) {
  const listItem = document.createElement('li');
  listItem.textContent = contentArr[i][0];
  //listItem.innerHTML += `<input type="checkbox" class="content-checkbox "></input>`;
  const checkbox = document.createElement('input');
  checkbox.type = 'checkbox';
  checkbox.classList.add('content-checkbox', `${contentArr[i][1]}`);
  listItem.appendChild(checkbox);
  newList.appendChild(listItem);
}

  const container = document.querySelector(`.exam-container-${oldName}`);
  container.classList.replace(`exam-container-${oldName}`, `exam-container-${newName}`);
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const newFormattedDate = new Date(newDate).toLocaleDateString('en-US', options);

    document.querySelector(`.exam-container-${newName}`).innerHTML = `
    <span class="material-symbols-outlined edit-exam-${newName}"> edit </span>
    <span class="material-symbols-outlined remove-exam-${newName}">remove</span>
    <h3 class="exam-title"> ${newName.toUpperCase()} </h3>
    <p class="exam-info"> 
    Date: ${newFormattedDate} <br>
    Venue: ${newVenue} <br>
    </p> 
    <div class="exam-countdown-${newName}">
    <div class="timing-part">
      <div class="countdown-item">
        <span class="countdown-number" id="countdown-days">00</span>
        <span class="countdown-tag">DAYS</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number" id="countdown-hours">00</span>
        <span class="countdown-tag">HOURS</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number" id="countdown-minutes">00</span>
        <span class="countdown-tag">MINUTES</span>
      </div>
      <div class="countdown-item">
        <span class="countdown-number" id="countdown-seconds">00</span>
        <span class="countdown-tag">SECONDS</span>
      </div>
    </div>
    </div>
    <button class="toggle-content-${newName}">Show Review Content</button>

    <div class="review-content-${newName}" style="display:none"> Review To-do List:
    ${newList.innerHTML}
    </div>`;

  delete examObjects[oldName];
    
    examObjects[newName] = [newDate, newVenue, contentArr];
    console.log(examObjects);

    attachContentEventListener();
    attachCheckboxEventListener(newName);
    attachRemoveExamEventListener();
    attachEditExamEventListener(newName);
    closeEditModal();
    const exam = {
      oldName: oldName,
      name: newName,
      date: newDate,
      venue: newVenue,
      todolist: contentArr,
      userId: sessionStorage.getItem('userId')
    };
    fetch(`https://${currentURL}/update-exam`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(exam)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 409) {
      alert('Update exam failed')
    } else if (response.status === 201) {
      //alert('Update exam successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});

    attachCountdownFunction();
    
}

document.addEventListener('DOMContentLoaded', retrieveExamData);

function retrieveExamData() {
  const data = {
    userId: sessionStorage.getItem('userId')
  };
  fetch(`https://${currentURL}/get-exam`, {
  method: 'POST',
  headers: {
    'Content-Type': 'application/json'
  },
  body: JSON.stringify(data)
}).then(response => {
  if (response.status === 500) {
    alert('Internal server error');
    return;
  } else if (response.status === 409) {
    alert('Get exam failed');
    return;
  } else if (response.status === 201) {
    response.json().then(data => { 
      displayExamData(data.results);
    })
    //alert('Get exam successfully');
  }
}).catch(error => {
    console.error('Error during query:', error)});

}

function displayExamData(examData) {
  for (let i = 0; i < examData.length; i++) {
    const name = examData[i].name;
    const date = examData[i].date;
    const venue = examData[i].venue;
    const contentArr = JSON.parse(examData[i].todolist);
    console.log(contentArr);
// Create to-do list
const newList = document.createElement('ul');
newList.classList.add(`review-to-do-list-${name}`);

// Create list items and append them to the new <ul> element
for (let i = 0; i <= contentArr.length - 1; i++) {
const listItem = document.createElement('li');
listItem.textContent = contentArr[i][0];
listItem.innerHTML += `<input type="checkbox" class="content-checkbox ${contentArr[i][1]}"></input>`;
newList.appendChild(listItem);


}

if (name == null || date == null || venue == null) {
  alert('Please fill in exam name, date and venue before submit');
  return;
} else {
  const options = {
    year: 'numeric',
    month: 'long',
    day: 'numeric',
    hour: '2-digit',
    minute: '2-digit'
  };
  const formattedDate = new Date(date).toLocaleDateString('en-US', options);

  const container = document.querySelector('.exam-container');
  container.innerHTML += `<div class="exam-container-${name}">
  <span class="material-symbols-outlined edit-exam-${name}"> edit </span>
  <span class="material-symbols-outlined remove-exam-${name}">remove</span>
  <h3 class="exam-title"> ${name.toUpperCase()} </h3>
  <p class="exam-info"> 
  Date: ${formattedDate} <br>
  Venue: ${venue} <br>
  </p> 
  <div class="exam-countdown-${name}">
  <div class="timing-part">
    <div class="countdown-item">
      <span class="countdown-number" id="countdown-days">00</span>
      <span class="countdown-tag">DAYS</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number" id="countdown-hours">00</span>
      <span class="countdown-tag">HOURS</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number" id="countdown-minutes">00</span>
      <span class="countdown-tag">MINUTES</span>
    </div>
    <div class="countdown-item">
      <span class="countdown-number" id="countdown-seconds">00</span>
      <span class="countdown-tag">SECONDS</span>
    </div>
  </div>
  </div>
  <button class="toggle-content-${name}">Show Review Content</button>

  <div class="review-content-${name}" style="display:none"> Review To-do List:
  ${newList.innerHTML}
  </div>

  </div>`;

  examObjects[name] = [date, venue, contentArr];
  
  
  // Add event listener to show/hide review content
  attachContentEventListener();

  // Add event listener to check/uncheck checkbox
  attachCheckboxEventListener(name);

  // Add event listener to remove exam
  attachRemoveExamEventListener();

  // Add event listener to start countdown
  attachCountdownFunction();

  attachEditExamEventListener(name);
}
  }
}

