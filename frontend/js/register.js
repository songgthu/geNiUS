function handleRegister(event) {
  event.preventDefault(); // Prevents the default form submission behavior

  // Get the form values
  const name = document.querySelector(".name").value;
  const email = document.querySelector(".email").value;
  const password = document.querySelector(".password").value;
  console.log(name);

  // Perform validation and submit the form
  if (email != "" && password != "") {
    // Prepare the data to be sent
    const data = {
      name: name,
      email: email,
      password: password,
    };

      fetch("http://localhost/register-user", {
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
    }
}
  
window.addEventListener('DOMContentLoaded', () => {
  const registerForm = document.getElementById('registerForm');
  registerForm.addEventListener('submit', handleRegister);
});  