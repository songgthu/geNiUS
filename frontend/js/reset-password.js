var currentURL = window.location.href.split("/")[2];
const urlParams = new URLSearchParams(window.location.search);
const email = decodeURIComponent(urlParams.get('email'));

window.addEventListener('DOMContentLoaded', () => {
  const resetPwForm = document.getElementById('reset-password-form');
  resetPwForm.addEventListener('submit', resetPassword);
}); 

function resetPassword(event) {
  event.preventDefault(); 
  const password = document.querySelector(".password").value;
  const confirmPassword = document.querySelector(".confirm-password").value;
  if (password === confirmPassword) {
    const data = {
      email: email,
      password: password
    };
    fetch(`https://${currentURL}/reset-password`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    })
    .then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if (response.status === 409) {
        alert('Reset password failed');
      } else if (response.status === 201) {
        alert('Reset password successfully');
        window.location.href = '/login.html';
      } 
    })
    .catch(error => {
      console.error('Error during reset password:', error);
    });
  } else {
    alert('Passwords do not match, please try again');
  }
}
