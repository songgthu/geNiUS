var currentURL = window.location.href.split("/")[2];
console.log(currentURL);
window.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', handleLogin);
});  

function handleLogin(event) {
    event.preventDefault(); // Prevents the default form submission behavior
  
    // Get the form values
    const email = document.querySelector('.email').value;
    const password = document.querySelector('.password').value;
    

    console.log(email);
  
    // Perform validation and submit the form
    if (email != "" && password != "") {
      
      // Prepare the data to be sent
      const data = {
        email: email,
        password: password
      };
  
    fetch(`https://${currentURL}/login-user`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(data)
    }).then(response => {
      if (response.status === 500) {
        alert('Internal server error');
      } else if (response.status === 409) {
          // Log in failed
          alert('Invalid email or password');
      } else if (response.status === 201){
        response.json().then(data => {
        const username = data.username;
        const userId = data.userId;
        console.log(userId);
        sessionStorage.setItem("email", email);
        sessionStorage.setItem("password", data.password);
        
        //alert('Login successful');
        const url = `/dashboard.html`;
        sessionStorage.setItem("sessionToken", email);
        sessionStorage.setItem("username", username);
        sessionStorage.setItem("userId", userId);
        window.location.href = url;
        })
      } else {
       
      }
    })
    .catch(error => {
      console.error('Error during login:', error)});
  }
  
}




  

    

  
 
  
