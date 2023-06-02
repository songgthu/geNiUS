window.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('updateForm');
  form.addEventListener('submit', updateTimetable);
  
  // Retrieve the stored URL from sessionStorage
  const storedUrl = sessionStorage.getItem('url');
  if (storedUrl) {
    const iframe = document.getElementById('timetable-iframe');
    iframe.src = storedUrl;
  }
});

function updateTimetable(event) {
  event.preventDefault();
  const userEmail = sessionStorage.getItem('email');
  const input = document.querySelector('.url').value;
  const iframe = document.getElementById('timetable-iframe');
  iframe.src = input;

  const data = {
    url: input,
    email: userEmail
  };
  fetch(`http://localhost:5501/update-timetable`, {
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
      alert('Update successful');
    } else {
      // Handle other responses if needed
    }
  });
}