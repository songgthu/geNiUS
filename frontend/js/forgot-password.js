var currentURL = window.location.href.split("/")[2];

window.addEventListener('DOMContentLoaded', () => {
  const requestForm = document.getElementById('request-form');
  requestForm.addEventListener('submit', sendResetPwEmail);
}); 

function sendResetPwEmail(event) {
  event.preventDefault();
  const data = {
    email: document.querySelector(".email").value
  };
    fetch(`https://${currentURL}/send-reset-password`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(response => {
        if (response.status === 500) {
            alert('Internal server error');
        } else if (response.status === 409) {
            alert('Invalid email, account does not exist');
        } else if (response.status === 201){
            alert('Please check your mailbox to change your password');
        } else {}
      })
      .catch(error => {
        console.error('Error during reset password:', error)});
}