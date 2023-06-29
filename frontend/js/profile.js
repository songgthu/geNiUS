// Sample user data (replace with your own logic)
// var user = {
//     name: sessionStorage.getItem('username'),
//     email: sessionStorage.getItem('email'),
//     password: sessionStorage.getItem('password')
//   };
  var user = {
    name: "John Doe",
    email: 'john@gmail.com',
    password: 'pass'
  };

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
    document.getElementById('editButton').style.display = 'block';
  }

  // Function to enable form inputs for editing
  function enableFormInputs() {
    var formInputs = document.querySelectorAll('#editProfileForm input');
    for (var i = 0; i < formInputs.length; i++) {
      formInputs[i].disabled = false;
    }
    document.getElementById('saveButton').style.display = 'block';
    document.getElementById('editButton').style.display = 'none';
  }

  // Function to handle form submission
  function saveProfile(event) {
    event.preventDefault(); // Prevent form submission

    // Get form values
    var newName = document.getElementById('name').value;
    var newEmail = document.getElementById('email').value;
    var newPassword = document.getElementById('password').value;

    // Update user data (You can replace this with your own logic)
    user.name = newName;
    user.email = newEmail;
    user.password = newPassword;

    disableFormInputs();
    console.log('Profile updated!');
  }

  // Attach form submit event listener
  var form = document.getElementById('editProfileForm');
  form.addEventListener('submit', saveProfile);

  // Attach edit button click event listener
  var editButton = document.getElementById('editButton');
  editButton.addEventListener('click', enableFormInputs);

  // Function to handle account deletion
  function deleteAccount() {
    // Add your own logic to delete the account
    const confirmation = confirm('Are you sure you want to delete your account? This action cannot be undone.');
    if (confirmation) {
        window.location.href = "/";
        sessionStorage.clear();
        fetch
      } else {
        
      }
  }

  // Attach delete account button click event listener
  var deleteButton = document.getElementById('deleteAccountButton');
  deleteButton.addEventListener('click', deleteAccount);

  // Display current user information on page load
  displayUserInfo();