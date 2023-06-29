var currentURL = window.location.href.split("/")[2];
function handleRegister(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  // Get the form values
  const name = document.querySelector(".name").value;
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  console.log(name);

  // Perform validation and submit the form
  if (email != "" && password != "") {
    // Check Password Complexity
    if (password.length < 8) { //check for pwd length
      alert("Password must be at least 8 characters long");
      return;
    } else if (!/[a-z]/.test(password)) {
      alert("Password must contain at least one lowercase character");
      return;
    } else if(!/[A-Z]/.test(password)) {
      alert("Password must contain at least one uppercase character");
      return;
    } else if(!/[0-9]/.test(password)) {
      alert("Password must contain at least one digit");
      return;
    } else if(!/[!@#$%^&*]/.test(password)) {
      alert("Password must contain at least one special character");
      return;
    } else {
    // Prepare the data to be sent
    const data = {
      name: name,
      email: email,
      password: password,
    };
    
      fetch(`https://${currentURL}/register-user`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      }).then(response => {
        if (response.status === 500) {
            alert('Internal server error');
        } else if (response.status === 409) {
            // User already exists
            alert('User already exists');
        } else if (response.status === 201){
            alert('Registration successful');
        } else {}
      })
      .catch(error => {
        console.error('Error during registration:', error)});
    };

      
    }
}

window.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', handleRegister);
});  



