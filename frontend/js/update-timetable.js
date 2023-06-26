var currentURL = window.location.href.split("/")[2];

const userEmail = sessionStorage.getItem('email');
const update = document.querySelector('.submitButton');
update.addEventListener('click', updateTimetable);
  
  
function updateTimetable() {

  const input = document.querySelector('.url').value || null;

  if (input == null) {
    alert('Please fill in the url');
    return;
  }

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
      retrieveTimetable();
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
        document.getElementById('timetable-iframe').textContent = '';
        document.getElementById('timetable-iframe').src = data.results[0].url; 
        console.log(document.getElementById('timetable-iframe').src);
        //alert('Get timetable successful');
      })
      
    } 
  });
  
}



