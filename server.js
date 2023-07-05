const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();
const mysql = require('mysql2');
const path = require('path');

// for hash password
const bcrypt = require('bcrypt');
const saltRounds = 10;

// for session storage
const cookieParser = require("cookie-parser");
const sessions = require('express-session');

// Create connection to the remote database
const connection = mysql.createConnection({
  host: 'aws.connect.psdb.cloud',
  user: 'j4ofi384s2ejay5pw4td',
  password: 'pscale_pw_Bv3FTbBWvxxG4zvWxwheFCWRlTxWSCAUWP9rWe3PFAV',
  database: 'genius',
  ssl: { rejectUnauthorized: true },
  multipleStatements: true,
});

// Connect to the database
connection.connect((err) => {
  if (err) {
    console.error('Error connecting to the database:', err);
    return;
  }
  console.log('Connected to the database');
});

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(express.json());
app.use(cors());
app.use(express.static(path.join(__dirname, 'frontend')));

// session middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());
app.use(sessions({
    secret: "jabfoyshnoscertkesy",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

// email verification
const nodemailer = require('nodemailer');
const { google } = require('googleapis');


const CLIENT_ID = '77488411127-j4nqf1itao4eufiob0pbjshi15k2p3dd.apps.googleusercontent.com';
const CLIENT_SECRET = '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';
const REDIRECT_URI = 'https://developers.google.com/oauthplayground';
const REFRESH_TOKEN = '1//04_ox1G-MMC3kCgYIARAAGAQSNwF-L9IrMtdstMSH_ZacN2E7PNx350cKgB05aJIR-qj9bN5nA4zqsCgvPguV5aXwO1RAG1SdlTQ';

const oAuth2Client = new google.auth.OAuth2(
  CLIENT_ID,
  CLIENT_SECRET,
  REDIRECT_URI
);
oAuth2Client.setCredentials({ refresh_token: REFRESH_TOKEN });

async function sendMail(email, name, password) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'genius.nus.123@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: 'GENIUS <genius.nus.123@gmail.com>',
      to: email,
      subject: '[Welcome to geNiUS] Verification Email',
      text: 'Greetings! ',
      html: `<h2>Hello ${name},Thank you for supporting geNiUS</h2><br>
      <p>Please click the following link to verify your account:</p><br>
      <a href="https://genius-awj5.onrender.com/verify/${verificationToken}/${name}/${encodeURIComponent(email)}/${encodeURIComponent(password)}">Click Here To Verify Account</a><br>
      <p>Please note that the link can be cicked only once.</p><br>
      <p>You should be able to redirected to our login page after verification is successful</p><br>
      <p>Have a nice day,</p><br>
      <p>geNiUS Team</p><br>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

async function sendResetPassWordMail(email, name) {
  try {
    const accessToken = await oAuth2Client.getAccessToken();

    const transport = nodemailer.createTransport({
      service: 'gmail',
      auth: {
        type: 'OAuth2',
        user: 'genius.nus.123@gmail.com',
        clientId: CLIENT_ID,
        clientSecret: CLIENT_SECRET,
        refreshToken: REFRESH_TOKEN,
        accessToken: accessToken,
      },
    });
    const verificationToken = Math.floor(100000 + Math.random() * 900000);

    const mailOptions = {
      from: 'GENIUS <genius.nus.123@gmail.com>',
      to: email,
      subject: '[Hello from geNiUS] Reset your password',
      text: 'Greetings! ',
      html: `<h2>Hello ${name}, Thank you for supporting geNiUS</h2><br>
      <p>Please click the following link to reset your password:</p>
      <a href="https://genius-awj5.onrender.com/reset/${verificationToken}/${encodeURIComponent(email)}">Click Here To Reset Password</a>
      <p>Please note that the link can be cicked only once.</p>
      <p>You should be redirected to our login page after reset password is successful</p>
      <p>Have a nice day,</p>
      <p>geNiUS Team</p>`,
    };

    const result = await transport.sendMail(mailOptions);
    return result;
  } catch (error) {
    return error;
  }
}

app.get('/', (req, res) => {
  session = req.session;
  res.sendFile(path.join(__dirname, 'frontend', 'html', 'index.html'));
})


app.get('/login.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'html', 'login.html'));
});

app.get('/register.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'html', 'register.html'));
});

app.get('/dashboard.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'html', 'dashboard.html'));
});

app.get('/timetable.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'html', 'timetable.html'));
});

app.get('/exam.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'html', 'exam.html'));
});

app.get('/profile.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'html', 'profile.html'));
});

app.get('/verify.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'html', 'verify.html'));
});

app.get('/reset-password.html', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'html', 'reset-password.html'));
});

app.get('/verify/:verificationToken/:name/:email/:password', (req, res) => {
  const verificationToken = req.params.verificationToken;
  const name = req.params.name;
  const email = decodeURIComponent(req.params.email);;
  const password = decodeURIComponent(req.params.password);;
  // Your verification logic here
  const createNewUser = `INSERT INTO users (name, email, password) VALUES (?, ?, ?)`; 
         
  // Insert the new user into the database
  connection.execute(
    createNewUser,
    [name, email, password],
    (err) => {
      if (err) {
        console.error('Error inserting into the database:', err);
        return;
      } else {
        res.redirect('/verify.html');
        console.log('Create new user successfully');
      }
    }
  );
  
  
});

app.get('/reset/:verificationToken/:email', (req, res) => {
  const email = decodeURIComponent(req.params.email);;
  res.redirect(`/reset-password.html?email=${encodeURIComponent(email)}`); 
  
});

app.post('/send-reset-password', (req, res) => {

  const { email} = req.body;
  // Query the database to retrieve the user
  const selectUserByEmailQuery = `
  SELECT *
  FROM users
  WHERE email = ?
`;

connection.execute(selectUserByEmailQuery,
  [email],
  (err, results) => {
    if (err) {
      console.error('Error Executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Check if account exists
    if(results.length > 0 && email == results[0].email) {
      res.status(201).json({ message: 'Valid email' });
      sendResetPassWordMail(email, results[0].name);
    } else {
      res.status(409).json({ error: 'Invalid email, account does not exist' });
    }
  
  }
);
  
});

app.post('/reset-password', (req, res) => {

  const { email, password } = req.body;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
  // Query the database to retrieve the user
  const updatePassword = `UPDATE users SET password = ? WHERE email = ?`;

connection.execute(updatePassword,
  [hashedPassword, email],
  (err, results) => {
    if (err) {
      console.error('Error Executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
    res.status(201).json({message: 'Update password successfully'});
  }
  
  }
);
  });
  
});
  
const apiUrl = 'https://api.nusmods.com/v2/2022-2023/';
app.post('/modules', (req, res) => {
  const {moduleCode} = req.body;
  fetch(apiUrl + 'modules/' + moduleCode + '.json')
    .then(response => response.json())
    .then(data => {
      // Send the retrieved data as the response
      res.json(data);
    })
    .catch(error => {
      // Handle any errors
      console.error('Error:', error);
      res.status(500).json({ error: 'An error occurred' });
    });
});

// Login endpoint
app.post('/login-user', (req, res) => {

  const { email, password } = req.body;
  // Query the database to retrieve the user
  const selectUserByEmailQuery = `
  SELECT *
  FROM users
  WHERE email = ?
`;

connection.execute(selectUserByEmailQuery,
  [email],
  (err, results) => {
    if (err) {
      console.error('Error Executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    }
    // Check email and password
    if(results.length > 0 && email == results[0].email) {
          // check password
          const storedHashPw = results[0].password;
          bcrypt.compare(password, storedHashPw, (err, isMatch) => {
            if (isMatch) {
              session = req.session;
              req.session.user = results[0].name;
              //console.log('Username:', req.session.user);
              req.session.userId = results[0].id;
              //console.log(req.session.userId);
              res.status(201).json({ 
                username: req.session.user,
                userId: req.session.userId,
                message: 'Login successful' });
              
             
            } else {
              res.status(409).json({ error: 'Invalid password' });
            }
          });
        
    } else {
      res.status(409).json({ error: 'Invalid email' });
    }
  
  }
);
  
});

// Register endpoint
app.post('/register-user', (req, res) => {
  try {
    const { name, email, password } = req.body;
    bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
      if (err) {
        console.error('Error hashing password:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
    console.log(name);
    // Check if the user already exists
    const selectUserQuery = `
    SELECT *
    FROM users
    WHERE email = ?
  `;
    connection.execute(selectUserQuery,
      [email],
      (err, results) => {
        if (err) {
          console.error('Error querying the database:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        }
  
        if (results.length > 0 && email == results[0].email) {
          res.status(409).json({ error: 'User already exists' });
          console.log('This email had been used before!');
        } else {
          
          res.status(201).json({ message: 'Registration successful' });
          sendMail(email, name, hashedPassword);
          
      }
    }
    );
  });
  } catch (error) {
    console.error('Error registering user:', error);
    res.status(500).json({ error: 'Internal server error' });
  }
  
});

// Update Timetable endpoint
app.post('/update-timetable', (req, res) => {

  const { url, email } = req.body;

  // Query the database to retrieve the user
  const updateURLQuery = `UPDATE users SET url = ? WHERE email = ?`;

connection.execute(updateURLQuery,
  [url, email],
  (err, results) => {
    if (err) {
      console.error('Error Executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
      res.status(201).json({message: 'Update timetable successfully'});
    }
  }
);
  
});

app.post('/get-timetable', (req, res) => {

  const { userEmail } = req.body;

  // Query the database to retrieve the user
  const getURLQuery = `SELECT url FROM users WHERE email = ?`;

connection.execute(getURLQuery,
  [userEmail],
  (err, results) => {
    if (err) {
      console.error('Error Executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
      res.status(201).json({
        results: results,
        message: 'Update timetable successfully'});
    }
  }
);
  
});

app.post('/add-task', (req, res) => {
  const { taskInput, deadline, userId } = req.body;
  const selectTaskQuery = `
  SELECT *
  FROM tasks
  WHERE task = ?
`;
connection.execute(selectTaskQuery, [taskInput], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  } else if(results.length > 0 && results[0].task == taskInput) {
    res.status(409).json({ error: 'Task name already exist' });
    return;
  } else {
  const addTaskQuery = `INSERT INTO tasks (task, deadline, created_by) VALUES (?, ?, ?)`;
  
  connection.execute(addTaskQuery, [taskInput, deadline, userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
      res.status(201).json({ message: 'Add task successfully' });
    }
  });
  }
});
  
});

app.post('/tasks', (req,res) => {
  const { userId } = req.body;

  const retrieveQuery = `SELECT * FROM tasks WHERE created_by = ?`;
  connection.execute(retrieveQuery, [userId], (err, results) =>{
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
      res.status(201).json({ 
        results: results,
        message: 'Retrieve task successfully' });
    }
  });
});

app.post('/update-checkbox', (req, res) => {
  // Retrieve the checkbox status from the request
  const { taskStatus, taskName } = req.body;
  var completed = 0;
  if (taskStatus === "true") { // Compare with the string "true"
    completed = 1;
  }
  const updateCheckboxQuery = `UPDATE tasks SET completed = ? WHERE task = ?`;
  connection.execute(updateCheckboxQuery, [completed, taskName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
      res.status(201).json({ message: 'Update task successfully' });
    }
  });
});

app.post('/delete-task', (req, res) => {
  // Retrieve the task from the request
  const { taskName } = req.body;

  const deleteTaskQuery = `DELETE FROM tasks WHERE task = ?`;
  connection.execute(deleteTaskQuery, [taskName], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
      res.status(201).json({ message: 'Delete task successfully' });
    }
  });
});

app.post('/update-task', (req, res) => {
  // Retrieve the task from the request
  const { newTask, newDeadline, oldTask} = req.body;
  const selectTaskQuery = `
  SELECT *
  FROM tasks
  WHERE task = ?
`;
connection.execute(selectTaskQuery, [oldTask], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  } else if(results.length > 0 && results[0].task == oldTask) {
    res.status(409).json({ error: 'Task name already exist' });
    return;
  } else {
      const updateTaskQuery = `UPDATE tasks SET task = ?, deadline = ?
      WHERE task = ?`;
      connection.execute(updateTaskQuery, [newTask, newDeadline, oldTask], (err, results) => {
        if (err) {
          console.error('Error executing query:', err);
          res.status(500).json({ error: 'Internal server error' });
          return;
        } else {
          res.status(201).json({ message: 'Update task successfully' });
        }
      });
  }
});
}
  
);

// RETRIEVE TASK LIST ON CALENDAR
app.post('/task-list', (req, res) => {
  const {dataDate, userId} = req.body;

  // Query the database to retrieve tasks for the selected date
  const retrieveTask = `
  SELECT *
  FROM tasks
  WHERE SUBSTRING_INDEX(deadline, ',', 2) = ? AND created_by = ?`;

  connection.execute(retrieveTask, [dataDate, userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ 
        results: results,
        message: 'Retrieve task successfully' });
    }
  });
});

// FOR QUICK COUNTDOWN FEATURE
app.post('/quick-countdown', (req, res) => {
  const {eventCD, countdownDate, email} = req.body;
  const cd = eventCD + "," + countdownDate; 

  // Query the database to retrieve tasks for the selected date
  const addCountdown = `UPDATE users SET quickCountdown = ? WHERE email = ?`;

  connection.execute(addCountdown, [cd, email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ 
        message: 'Add countdown successfully' });
    }
  });
});

app.post('/get-quick-countdown', (req, res) => {
  const {email} = req.body;

  const getCountdown = `SELECT quickCountdown FROM users WHERE email= ?`;

  connection.execute(getCountdown, [email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else if (results.length === 0) {
      res.status(200).json({ message: 'No data found' });
    } else {
      res.status(201).json({ 
        results: results,
        message: 'Get countdown successfully' });
    }
  });
});

app.post('/delete-quick-countdown', (req, res) => {
  const {email} = req.body;

  // Query the database to retrieve tasks for the selected date
  const deleteCountdown = `UPDATE users SET quickCountdown = '' WHERE email = ?`;

  connection.execute(deleteCountdown, [email], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ 
        message: 'Delete countdown successfully' });
    }
  });
});

// FOR SHORTCUTS FEATURE
app.post('/add-shortcut', (req, res) => {
  const {userId, scInput, scURLInput} = req.body;
  
  const addShortcut = `INSERT INTO shortcuts (name, url, created_by) VALUES (?, ?, ?)`;

  connection.execute(addShortcut, [scInput, scURLInput, userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ 
        results: results,
        message: 'Add shortcut successfully' });
    }
  });
});

app.post('/get-shortcut', (req, res) => {
  const {userId} = req.body;

  const getCountdown = `SELECT * FROM shortcuts WHERE created_by = ?`;

  connection.execute(getCountdown, [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ 
        results: results,
        message: 'Get countdown successfully' });
    }
  });
});

app.post('/delete-shortcut', (req, res) => {
  const { userId, name, url} = req.body;

  const deleteShortcut = `DELETE FROM shortcuts WHERE created_by = ? AND name = ? AND url =?`;

  connection.execute(deleteShortcut, [userId, name, url], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ 
        message: 'Delete shortcut successfully' });
    }
  });
});

app.post('/delete-shortcuts', (req, res) => {
  const { userId } = req.body;

  const deleteShortcuts = `DELETE FROM shortcuts WHERE created_by = ?`;

  connection.execute(deleteShortcuts, [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      res.status(201).json({ 
        message: 'Restore default shortcuts successfully' });
    }
  });
});

// FOR PLANNER FEATURE
app.post('/save-planner', (req, res) => {
  const { tasks, schedule, userId } = req.body;

  const selectPlanner = `SELECT * FROM planners WHERE created_by = ?`;
  const updatePlanner = `UPDATE planners SET tasks = ?, schedule = ? WHERE created_by = ?`;
  const insertPlanner = `INSERT INTO planners (tasks, schedule, created_by) VALUES (?, ?, ?)`;

  connection.execute(selectPlanner, [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else {
      if (results.length > 0) {
        // Planner exists, update it
        connection.execute(updatePlanner, [tasks, schedule, userId], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
          } else {
            res.status(200).json({ message: 'Update planner successfully' });
          }
        });
      } else {
        // Planner does not exist, insert it
        connection.execute(insertPlanner, [tasks, schedule, userId], (error, results) => {
          if (error) {
            console.error(error);
            res.status(500).json({ error: 'An error occurred' });
          } else {
            res.status(201).json({ message: 'Save planner successfully' });
          }
        });
      }
    }
  });
});


app.post('/get-planner', (req, res) => {
  const { userId} = req.body;

  const getPlanner = `SELECT * FROM planners WHERE created_by = ?`;

  connection.execute(getPlanner, [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else if(results.length > 0) {
      res.status(201).json({
        tasks: results[0].tasks,
        schedule: results[0].schedule,
        message: 'Get planner successfully' });
    } else {
      res.status(409).json({ error: 'An error occurred' });
    }
  });
});

// FOR CLASS MANAGEMENT FEATURE
app.post('/save-module-schedule', (req, res) => {
  const { moduleList, moduleSchedule, userId } = req.body;

  const selectModuleSchedule = `SELECT * FROM moduleSchedules WHERE created_by = ?`;
  const updateModuleSchedule = `UPDATE moduleSchedules SET moduleList = ?, moduleSchedule = ? WHERE created_by = ?`;
  const insertModuleSchedule = `INSERT INTO moduleSchedules (moduleList, moduleSchedule, created_by) VALUES (?, ?, ?)`;

  connection.execute(selectModuleSchedule, [userId], (error, outerResults) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else if (outerResults.length > 0) {
      // module schedule exists, update it
      connection.execute(updateModuleSchedule, [moduleList, moduleSchedule, userId], (error, innerResults) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' });
        } else if(innerResults.length > 0){
          res.status(200).json({ message: 'Update module schedule successfully' });
        }
      });
    } else {
      // module schedule does not exist, insert it
      connection.execute(insertModuleSchedule, [moduleList, moduleSchedule, userId], (error, innerResults) => {
        if (error) {
          console.error(error);
          res.status(500).json({ error: 'An error occurred' });
        } else {
          res.status(201).json({ message: 'Save module schedule successfully' });
        }
      });
    }
    })
  });


app.post('/get-module-schedule', (req, res) => {
  const { userId } = req.body;

  const getModuleSchedule = `SELECT * FROM moduleSchedules WHERE created_by = ?`;

  connection.execute(getModuleSchedule, [userId], (error, results) => {
    if (error) {
      console.error(error);
      res.status(500).json({ error: 'An error occurred' });
    } else if(results.length > 0) {
      res.status(201).json({
        moduleList: results[0].moduleList,
        moduleSchedule: results[0].moduleSchedule,
        message: 'Get module schedule successfully' });
    } else {
      res.status(409).json({ error: 'An error occurred' });
    }
  });
});

// FOR EXAM OVERVIEW FEATURE
app.post('/add-exam', (req, res) => {
  const { name, date, venue, todolist, userId } = req.body;
  const selectExam = `
  SELECT *
  FROM exams
  WHERE name = ? AND created_by = ?
`;
connection.execute(selectExam, [name, userId], (err, results) => {
  if (err) {
    console.error('Error executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  } else if(results.length > 0 && results[0].name == name) {
    res.status(409).json({ error: 'Exam name already exist' });
    return;
  } else {
  const addExam = `INSERT INTO exams (name, date, venue, todolist, created_by) VALUES (?, ?, ?, ?, ?)`;
  
  connection.execute(addExam, [name, date, venue, todolist, userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
      res.status(201).json({ message: 'Add task successfully' });
    }
  });
  }
});
  
});

app.post('/delete-exam', (req, res) => {
  const { name, userId } = req.body;

  const deleteExam = `DELETE FROM exams WHERE name = ? AND created_by = ?`;
  connection.execute(deleteExam, [name, userId], (err, results) => {
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
      res.status(201).json({ message: 'Delete exam successfully' });
    }
  });
});

app.post('/update-exam', (req, res) => {
  const { oldName, name, date, venue, todolist, userId } = req.body;
  const updateExam = `
  UPDATE exams SET name = ?, date = ?, venue = ?, todolist = ?  WHERE name = ? AND created_by = ?
`;
connection.execute(updateExam, [name, date, venue, todolist, oldName, userId], (err, results) => {
  if (err) {
    console.error('Error Executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  } else {
    res.status(201).json({message: 'Update exam successfully'});
  }
});
  
});

app.post('/get-exam', (req, res) => {
  const { userId } = req.body;
  const getExam = `
  SELECT * FROM exams WHERE created_by = ?
`;
connection.execute(getExam, [userId], (err, results) => {
  if (err) {
    console.error('Error Executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  } else {
    res.status(201).json({
      results: results,
      message: 'Get exam successfully'});
  }
});
  
});

app.post('/update-exam-checkbox', (req, res) => {
  const { userId, name, todolist } = req.body;
  const updateExamCheckbox = `
  UPDATE exams SET todolist = ? WHERE created_by = ? AND name = ?
`;
connection.execute(updateExamCheckbox, [todolist, userId, name], (err, results) => {
  if (err) {
    console.error('Error Executing query:', err);
    res.status(500).json({ error: 'Internal server error' });
    return;
  } else {
    res.status(201).json({
      message: 'Update checkbox successfully'});
  }
});
  
});
// FOR PROFILE FEATURE
app.post('/update-profile', (req,res) => {
  const { name, email, password, userId } = req.body;
  const updateQuery = `UPDATE users SET name = ?, email = ?, password = ? WHERE id = ?`;
  bcrypt.hash(password, saltRounds, (err, hashedPassword) => {
    connection.execute(updateQuery, [ name, email, hashedPassword, userId], (err, results) =>{
      if (err) {
        console.error('Error executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      } else {
        res.status(201).json({ 
          message: 'Update profile successfully' });
      }
    });
  });
  
});

app.post('/delete-account', (req,res) => {
  const { email } = req.body;
  const deleteQuery = `DELETE FROM users WHERE email = ?`;
  connection.execute(deleteQuery, [email], (err, results) =>{
    if (err) {
      console.error('Error executing query:', err);
      res.status(500).json({ error: 'Internal server error' });
      return;
    } else {
      res.status(201).json({ 
        message: 'Delete account successfully' });
    }
  });
});
// Start the server
const port = process.env.PORT || 5501;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});