const { assert } = require('chai');


describe('Login form', function () {
  it('should display an error when logging in without credentials', function () {
    // Simulate logging in without credentials
    const email = '';
    const password = '';

    // Perform the login and assert the expected behavior
    return handleLogin(email, password)
      .then(response => {
        // This code block should not execute
        assert.fail('Expected an error to be thrown');
      })
      .catch(error => {
        assert.exists(error);
        assert.strictEqual(error.status, 400);
        assert.strictEqual(error.message, 'Please fill out this field');
      });
  });
});

// Mocked handleLogin function for testing purposes
function handleLogin(email, password) {
  return new Promise((resolve, reject) => {
    if (email === '' || password === '') {
      const error = new Error('Please fill out this field');
      error.status = 400;
      reject(error);
    } else {
      resolve({ status: 200 });
    }
  });
}

describe('Study Timer', function () {
    it('should display an error when input invalid time: negative number', function () {
      // Simulate logging in without credentials
      var hours = -1;
      var minutes = 2;
      var seconds = 15;
  
      // Perform the login and assert the expected behavior
      return setTime(hours, minutes, seconds)
        .then(response => {
          // This code block should not execute
          assert.fail('Expected an error to be thrown');
        })
        .catch(error => {
          assert.exists(error);
          assert.strictEqual(error.status, 400);
          assert.strictEqual(error.message, 'Invalid time input, please try again.');
        });
    });
  });

function setTime(hours, minutes, seconds) {
    return new Promise((resolve, reject) => {
    // Get the user input for hours, minutes, and seconds
    if(hours == 0 && minutes == 0 && hours == 0) {
        const error = new Error('Invalid time input, please try again.');
        error.status = 400;
        reject(error);
    }
    if (hours > 24 || minutes > 60 || seconds > 60 || isNaN(hours) || isNaN(minutes) || isNaN(seconds)
    || hours < 0 || minutes < 0 || hours < 0) {
        const error = new Error('Invalid time input, please try again.');
        error.status = 400;
        reject(error);
    } else {
    resolve({ status: 200 });
    }
});
}

var task = {
    name: 'Learn Java',
    deadline: '2023-08-15'
};
// For update task (empty task)
describe('Tasks', function () {
    it('Task information should be updated correctly', function () {
      
      var newTask = 'Do manual testing';
      var newDeadline = '2023-10-27';
  
      // Perform the login and assert the expected behavior
      return updateTask(newTask, newDeadline)
      .then(response => {
        assert.strictEqual(response.status, 200);
        assert.strictEqual(task.name, newTask);
        assert.strictEqual(task.deadline, newDeadline);
      })
      .catch(error => {
        // This code block should not execute
        assert.fail('Expected no error to be thrown');
      });
    });
  });

function updateTask(newTask, newDeadline) {
    return new Promise((resolve, reject) => {
    if (newTask == '' || newDeadline == '') {
        const error = new Error('Please fill in all the fields');
        error.status = 400;
        reject(error);
    } else {
        task.name = newTask;
        task.deadline = newDeadline;
        resolve({ status: 200 });
    }   
});
}

// For create exam (invalid date input)
describe('Exam Overview', function () {
    it('should display an error when input invalid date: date is in the past', function () {
     
      var name = 'sample exam';
      var date = '2023-01-15';
      var venue = 'sample venue';
  
      // Perform the login and assert the expected behavior
      return addExam(name, date, venue)
        .then(response => {
          // This code block should not execute
          assert.fail('Expected an error to be thrown');
        })
        .catch(error => {
          assert.exists(error);
          assert.strictEqual(error.status, 400);
          assert.strictEqual(error.message, 'Invalid date selected. Cannot create a countdown of a past event.');
        });
    });
  });

function addExam(name, date, venue) {
    return new Promise((resolve, reject) => {  
  const now = new Date();
    if (name == null || date == null || venue == null) {
        const error = new Error('Please fill in exam name, date and venue before submit');
        error.status = 400;
        reject(error);
    } else if (new Date(date).getTime() === now.getTime()) {
        const error = new Error('Invalid date selected. Cannot create a countdown for the present time.');
        error.status = 400;
        reject(error);
    } else if (new Date(date).getTime() < now.getTime()){
        const error = new Error('Invalid date selected. Cannot create a countdown of a past event.');
        error.status = 400;
        reject(error);
    } else {
        resolve({ status: 200 });
    }
});
  }

// For profile (update profile display)
var user = {
    name: 'User',
    email: 'thst0711@gmail.com',
    password: 'Strongpassword@123'
  }; 
describe('Profile', function () {
    it('should display an error when user update a weak password and does not update user info', function () {
      const newName = 'Sarah';
      const newEmail = 'thst0711@gmail.com';
      const newPassword = 'Weakpassword!';

      // Perform the login and assert the expected behavior
      return saveProfile(newName, newEmail, newPassword)
        .then(response => {
          // This code block should not execute
          assert.fail('Expected an error to be thrown');
        })
        .catch(error => {
          assert.exists(error);
          assert.strictEqual(error.status, 400);
          assert.strictEqual(error.message, 'Password must contain at least one digit');
          assert.strictEqual(user.name, 'User');
          assert.strictEqual(user.email, 'thst0711@gmail.com');
          assert.strictEqual(user.password, 'Strongpassword@123');
        });
    });
  });

function saveProfile(newName, newEmail, newPassword) {
    return new Promise((resolve, reject) => {  
    if (newName == '' || newEmail == '' || newPassword == '') {
        const error = new Error('Please fill in all the fields');
        error.status = 400;
        reject(error);
    } 
    if (newPassword.length < 8) { 
        const error = new Error('Password must be at least 8 characters long');
        error.status = 400;
        reject(error);
    } else if (!/[a-z]/.test(newPassword)) {
        const error = new Error('Password must contain at least one lowercase character');
        error.status = 400;
        reject(error);
    } else if(!/[A-Z]/.test(newPassword)) {
        const error = new Error('Password must contain at least one uppercase character');
        error.status = 400;
        reject(error);
      return;
    } else if(!/[0-9]/.test(newPassword)) {
        const error = new Error('Password must contain at least one digit');
        error.status = 400;
        reject(error);
    } else if(!/[!@#$%^&*]/.test(newPassword)) {
        const error = new Error('Password must contain at least one special character');
        error.status = 400;
        reject(error);
    } else {
        user.name = newName;
        user.email = newEmail;
        user.password = newPassword;
        resolve({ status: 200 });
    }

    
});
    

}