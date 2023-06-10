// Retrieve the stored URL from sessionStorage
const storedUrl = sessionStorage.getItem('url');
if (storedUrl != '') {
  const iframe = document.getElementById('timetable-iframe');
  iframe.src = storedUrl;
  console.log(iframe.src);
}
  const update = document.querySelector('.submitButton');

  const form = document.querySelector('.flex-input');
  update.addEventListener('click', updateTimetable);
  
  
function updateTimetable(event) {
  event.preventDefault();
  const userEmail = sessionStorage.getItem('email');
  const input = document.querySelector('.url').value;
  const iframe = document.getElementById('timetable-iframe');
  iframe.src = input;
  console.log(input);

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


const apiUrl = 'https://api.nusmods.com/v2/';
fetch(`http://localhost:5501/modules`, {
      method: 'GET',
      headers: {
        'Content-Type': 'application/json'
      }
    }).then(response => response.json())
    .then(data => {
      // Process the retrieved data
      
      const targetLabSession = "16A";
      const targetRecitationSession = "13";
      
      const semesterData = data.semesterData;
      for (let i = 0; i < semesterData.length; i++) {
        const timetable = semesterData[i].timetable;
        for (let j = 0; j < timetable.length; j++) {
          const lessonType = timetable[j].lessonType;
          const classNo = timetable[j].classNo;
      
          if (lessonType === "Laboratory" && classNo === targetLabSession) {
            const startTime = timetable[j].startTime;
            const endTime = timetable[j].endTime;
            const venue = timetable[j].venue;
            const day = timetable[j].day;
      
            console.log(`Lab Session - Class ${classNo}`);
            console.log(`Time: ${startTime} - ${endTime}`);
            console.log(`Venue: ${venue}`);
            console.log(`Day: ${day}`);
            console.log("--------------------");
          } else if (lessonType === "Recitation" && classNo === targetRecitationSession) {
            const startTime = timetable[j].startTime;
            const endTime = timetable[j].endTime;
            const venue = timetable[j].venue;
            const day = timetable[j].day;
      
            console.log(`Recitation Session - Class ${classNo}`);
            console.log(`Time: ${startTime} - ${endTime}`);
            console.log(`Venue: ${venue}`);
            console.log(`Day: ${day}`);
            console.log("--------------------");
          }
        }
      }
      
      
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
    });
