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
app.use(express.static(path.join(__dirname, '')));

// session middleware
const oneDay = 1000 * 60 * 60 * 24;
app.use(cookieParser());
app.use(sessions({
    secret: "jabfoyshnoscertkesy",
    saveUninitialized:true,
    cookie: { maxAge: oneDay },
    resave: false 
}));

var session;

app.get('/', (req, res) => {
  session = req.session;
  res.sendFile(path.join(__dirname, '../frontend/html/index.html'));
})


app.get('/login-user', (req, res) => {
    res.sendFile(path.join(__dirname,"login.html"));
  })
app.get('/register-user', (req, res) => {
    res.sendFile(path.join(__dirname,"register.html"));
  })

  

// app.get('/update-timetable', (req, res) => {
//   res.sendFile(path.join(__dirname,"timetable.html"));
// })

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
        const createNewUser = `INSERT INTO users (name, email, password) 
        VALUES (?, ?, ?);`; 
       
        // Insert the new user into the database
        connection.execute(
          createNewUser,
          [name, email, hashedPassword],
          (err) => {
            if (err) {
              console.error('Error inserting into the database:', err);
              return;
            } else {
              
              console.log('Create new user successfully');
            }
          }
        );
    }
  }
  );
});
});

// Update Timetable endpoint
app.post('/update-timetable', (req, res) => {

  const { url, email } = req.body;
  // console.log(url + '' + email);
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

app.post('/add-task', (req, res) => {
  const { taskInput, deadline, userId } = req.body;
  // console.log(taskInput);
  // console.log(deadline);
  // console.log(userId);
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
});

app.post('/tasks', (req,res) => {
  const{ userId } = req.body;
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

// Start the server
const port = process.env.PORT || 5501;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});




