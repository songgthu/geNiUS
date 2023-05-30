const express = require('express');
const cors = require("cors");
const bodyParser = require('body-parser');
require('dotenv').config();
const mysql = require('mysql2');
const path = require('path');

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


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, '../frontend/html/login.html'));
})
app.get('/login-user', (req, res) => {
    res.sendFile(path.join(__dirname,"login.html"));
  })
app.get('/register-user', (req, res) => {
    res.sendFile(path.join(__dirname,"register.html"));
  })

// Login endpoint
app.post('/login-user', (req, res) => {

  const { email, password } = req.body;
  // Query the database to retrieve the user
  const selectUserQuery = `
  SELECT *
  FROM users
  WHERE email = ? AND password = ?
`;
  connection.execute(selectUserQuery,
    [email, password],
    (err, results) => {
      if (err) {
        console.error('Error Executing query:', err);
        res.status(500).json({ error: 'Internal server error' });
        return;
      }
      // Check email and password
      if(results.length > 0 && email == results[0].email 
        && password == results[0].password) {
          res.status(201).json({ message: 'Login successful' });
      } else {
        res.status(409).json({ error: 'Invalid email or password' });
      }
    
    }
  );
});

// Register endpoint
app.post('/register-user', (req, res) => {
  const { name, email, password } = req.body;
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
          [name, email, password],
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

// Start the server
const port = process.env.PORT || 5501;
app.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});
