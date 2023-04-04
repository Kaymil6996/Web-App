const express = require('express');
const mysql = require('mysql2');
var bodyParser = require('body-parser')
var cors = require('cors');

 

// create the connection to the database
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password:'root',
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
app.use(bodyParser.urlencoded({ extended: false }))

app.use(cors())

// parse application/json
app.use(bodyParser.json())

app.get('/', (req, res) => {
  connection.query('SELECT * FROM Dane', (error, results) => {
    if (error) {
      console.error('Error fetching data from database: ', error);
      res.status(500).send('Error fetching data from database');
      return;
    }

   res.send(results);
    console.log(results)
  });
});



app.post('/add', (req, res) => {
  const { email, haslo } = req.body;
  
  connection.query('INSERT INTO Dane (email, haslo) VALUES (?, ?)', [email, haslo], (error, results) => {
    if (error) {
      console.log(error);
      res.status(500).send('Error');
    } else {
      res.send(results);
    }
  });
});


app.put('/update/:id', (req, res) => {
  const id = req.params.id;
  const { email, haslo } = req.body;
  connection.query('UPDATE Dane SET email = ?, haslo = ? WHERE id = ?', [email, haslo, id], (error, results) => {
    console.log(req.params.id)
    if (error) {
      console.log(error);
      res.status(500).send('Error');
    } else {
      console.log('data updated successfully');
      res.send(results);
    }
  });
});



app.delete('/delete/:id',(req,res)=>{
  const id = req.params.id;
  connection.query('DELETE FROM `Dane` WHERE id = ?', [id], (error, results) => {
    console.log(req.params.id)
    if (error) {
      console.log(error);
      res.status(500).send('Error');
    } else {
      console.log('data deleted successfully');
      res.send(results);
    }}

  )});


 


app.listen(2137, () => {
  console.log('Server started on port 3000');
});




