const express = require('express');
const mysql = require('mysql2');

// create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  database: 'webowe'
});

// connect to the database
connection.connect((error) => {
  if (error) {
    console.error('Error connecting to database: ', error);
    return;
  }

  console.log('Connected to database successfully');
});

const app = express();

// set up routes
app.get('/', (req, res) => {
  connection.query('SELECT * FROM dane', (error, results) => {
    if (error) {
      console.error('Error fetching data from database: ', error);
      res.status(500).send('Error fetching data from database');
      return;
    }

    res.send(results);
    console.log(results)
  });
});

// start the server
app.listen(3000, () => {
  console.log('Server started on port 3000');
});




