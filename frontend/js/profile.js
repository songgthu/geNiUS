var currentURL = window.location.href.split("/")[2];
// Sample user data (replace with your own logic)
var user = {
    name: sessionStorage.getItem('username'),
    email: sessionStorage.getItem('email'),
    password: sessionStorage.getItem('password'),
    userId: sessionStorage.getItem('userId')
  };
console.log(user.password);

  // Function to display current user information
  function displayUserInfo() {
    document.getElementById('name').value = user.name;
    document.getElementById('email').value = user.email;
    document.getElementById('password').value = user.password;
    disableFormInputs();
  }

  // Function to disable form inputs
  function disableFormInputs() {
    var formInputs = document.querySelectorAll('#editProfileForm input');
    for (var i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = true;
    }
    document.getElementById('saveButton').style.display = 'none';
    document.getElementById('cancelButton').style.display = 'none';
    document.getElementById('editButton').style.display = 'block';
  }

  // Function to enable form inputs for editing
  function enableFormInputs() {
    var formInputs = document.querySelectorAll('#editProfileForm input');
    for (var i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = false;
    }
    document.getElementById('saveButton').style.display = 'block';
    document.getElementById('cancelButton').style.display = 'block';
    document.getElementById('editButton').style.display = 'none';
  }

  // Function to handle form submission
  function saveProfile(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var newName = document.getElementById('name').value || null;
    var newEmail = document.getElementById('email').value || null;
    var newPassword = document.getElementById('password').value || null;
    if (newName == null || newEmail == null || newPassword == null) {
      alert('Please fill in all the fields');
      return;
    }
    if (password.length < 8) { 
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
    }

    // Update user data (You can replace this with your own logic)
    user.name = newName;
    user.email = newEmail;
    user.password = newPassword;
    
    fetch(`https://${currentURL}/update-profile`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(user)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
        sessionStorage.setItem('username', newName);
        sessionStorage.setItem('email', newEmail);
        sessionStorage.setItem('password', newPassword);
        disableFormInputs();
        alert('Update profile successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});

  }

  // Attach form submit event listener
  var form = document.getElementById('editProfileForm');
  form.addEventListener('submit', saveProfile);

  // Attach edit button click event listener
  var editButton = document.getElementById('editButton');
  editButton.addEventListener('click', enableFormInputs);

  var cancelButton = document.getElementById('cancelButton');
  cancelButton.addEventListener('click', disableFormInputs);
  

  // Function to handle account deletion
  function deleteAccount() {
    // Add your own logic to delete the account
    const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmation) {
        const data = { userId: sessionStorage.getItem('email')};
        fetch(`https://${currentURL}/delete-account`, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify(data)
  }).then(response => {
    if (response.status === 500) {
      alert('Internal server error');
    } else if (response.status === 201) {
        window.location.href = "/";
        sessionStorage.clear();
        alert('Delete account successfully');
    }
  }).catch(error => {
      console.error('Error during query:', error)});
      } 
  }

  // Attach delete account button click event listener
  var deleteButton = document.getElementById('deleteAccountButton');
  deleteButton.addEventListener('click', deleteAccount);

  // Display current user information on page load
  displayUserInfo();