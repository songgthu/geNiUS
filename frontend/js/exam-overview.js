
const modal = document.querySelector(".exam-modal");
const editModal = document.querySelector(".edit-exam-modal");
const overlay = document.querySelector(".overlay");
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
  const name = modal.querySelector('.examNameInput').value || null;
  const date = modal.querySelector('.examDateInput').value || null;
  const venue = modal.querySelector('.examVenueInput').value || null;

  var contentArr = [];
  modal.querySelector('.review-content-list').querySelectorAll('.content-text').
  forEach((content) => contentArr.push(content.textContent));
  const newList = document.createElement('ul');
  newList.classList.add(`review-to-do-list-${name}`);

// Create list items and append them to the new <ul> element
for (let i = 0; i <= contentArr.length - 1; i++) {
  const listItem = document.createElement('li');
  listItem.textContent = contentArr[i];
  listItem.innerHTML += `<input type="checkbox" class="content-checkbox"></input>`;
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
    
    const examArray = [name, date, venue, modal.querySelector('.review-content-list').innerHTML];
    
    attachContentEventListener();
    attachRemoveExamEventListener();
    attachEditExamEventListener(examArray);
    countdownArray.push([date, name]);
    attachCountdownFunction(countdownArray);
    closeModal();
  }
}

function attachCountdownFunction(arr) {
  function formatTime(time) {
    return time.toString().padStart(2, '0');
  }
  console.log(arr);
  for (let i = 0; i < arr.length; i++) {
    const countdownDate = new Date(arr[i][0]).getTime();
    // select elements to input values
    const countdown = document.querySelector(`.exam-countdown-${arr[i][1]}`);
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
  console.log(exam);
  exam.remove();
}

function attachEditExamEventListener(arr) {
  const editExamBtns = document.querySelectorAll(`[class^="material-symbols-outlined edit-exam-"]`);
  editExamBtns.forEach((btn) => btn.addEventListener('click', function() {
    editExam(arr[0], arr[1], arr[2], arr[3]);
  }));
}


function editExam(oldName, oldDate, oldVenue, oldContentList) {
  openEditModal();
  editModal.querySelector('.edit-examNameInput').value = oldName;
  editModal.querySelector('.edit-examDateInput').value = oldDate;
  editModal.querySelector('.edit-examVenueInput').value = oldVenue;
  editModal.querySelector('.edit-review-content-list').innerHTML = oldContentList;
  attachEditContentListener();
  attachRemoveContentListener();

  const updateExamBtn = editModal.querySelector('.update-exam-button');

}

