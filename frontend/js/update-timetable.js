var currentURL = window.location.href.split("/")[2];
// Retrieve the stored URL from sessionStorage
const iframe = document.getElementById('timetable-iframe');
const userEmail = sessionStorage.getItem('email');
const update = document.querySelector('.submitButton');

const form = document.querySelector('.flex-input');
update.addEventListener('click', updateTimetable);
  
  
function updateTimetable(event) {
  event.preventDefault();
  
  const input = document.querySelector('.url').value;
  iframe.src = input;
  console.log(input);

  const data = {
    url: input,
    email: userEmail
  };
  fetch(`https://${currentURL}/update-timetable`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
      // Store the updated URL in sessionStorage
      sessionStorage.setItem('url', input);
      //alert('Update successful');
    } else {
      // Handle other responses if needed
    }
  });
}

document.addEventListener('DOMContentLoaded', retrieveTimetable);
function retrieveTimetable() {
  const data = { userEmail: userEmail };
  fetch(`https://${currentURL}/get-timetable`, {
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
        document.getElementById('timetable-iframe').src = data.results[0].url; 
        //alert('Get timetable successful');
      })
      
      
    } 
  });
  
}



