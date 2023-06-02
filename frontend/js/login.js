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
  
    // const baseUrl = window.location.hostname == '127.0.0.1' ? 'http://localhost:5501' : 'https://genius-gamma.vercel.app/';
    fetch(`http://localhost:5501/login-user`, {
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
        
        sessionStorage.setItem("email", email);
        
        alert('Login successful');
        const url = `/frontend/html/dashboard.html`;
        sessionStorage.setItem("sessionToken", "usersessiontoken");
        sessionStorage.setItem("username", username);
        
        window.location.href = url;
        })
      } else {
       
      }
    })
    .catch(error => {
      console.error('Error during login:', error)});
  }
  
}




  

    

  
 
  
