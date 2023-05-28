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
  
    const baseUrl = window.location.hostname == '127.0.0.1' ? 'http://localhost:5501' : 'https://vercel.com';
    fetch(`${baseUrl}/login-user`, {
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
        alert('Login successful');
        window.location.href = '/frontend/html/homepage.html';
      } else {
       
      }
    })
    .catch(error => {
      console.error('Error during login:', error)});
  }
  
}

window.addEventListener('DOMContentLoaded', () => {
  const loginForm = document.getElementById('loginForm');
  loginForm.addEventListener('submit', handleLogin);
});  
  

    

  
 
  
